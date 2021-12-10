import { Component, OnInit } from "@angular/core";
import { NbSidebarService } from "@nebular/theme";
import { LoginService } from "../Auth/Login/login.service";
import { UserDataService } from "../user.data.service";
import { CaseDataService } from "../case.data.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private sidebarService: NbSidebarService,
    private userDataService: UserDataService,
    private caseDataService: CaseDataService,
    private loginService: LoginService
  ) {}

  userName: string;
  home: string;
  rol: string;
  items = [];

  ngOnInit() {
    if (this.loginService.isLogged()) {
      this.userDataService
        .getUserDataByEmail(this.loginService.getAuth().email)
        .subscribe((item) => {
          this.userName = item[0]["nombre"];
          this.rol = item[0]["rol"];
          if (this.rol == "Administrador") {
            this.home = "/inicio";
            this.items = [
              {
                title: "Anuncios",
                icon: "home-outline",
                link: ["/inicio"],
              },
              {
                title: "Estadísticas",
                icon: "activity-outline",
                link: ["/estadisticas"],
              },
              {
                title: "Administrar",
                icon: "options-2-outline",
                expanded: false,
                children: [
                  {
                    title: "Casos",
                    icon: "archive-outline",
                    link: ["/casos"],
                  },
                  {
                    title: "Usuarios",
                    icon: "people-outline",
                    link: ["/usuarios"],
                  },
                ],
              },
              /* {
                title: "Reportes",
                icon: "file-text-outline",
                link: ["/reportes"],
              }, */
              {
                title: "Mi perfil",
                icon: "person-outline",
                link: ["/perfil"],
              },
            ];
          } else {
            this.home = "/anuncios";
            this.items = [
              {
                title: "Inicio",
                icon: "home-outline",
                link: ["/anuncios"],
              },
              {
                title: "Crear Caso",
                icon: "file-add-outline",
                link: ["/crearCaso"],
              },
              {
                title: "Todos los casos",
                icon: "archive-outline",
                link: ["/historialCasos"],
              },
              {
                title: "Mis Casos",
                icon: "folder-outline",
                link: ["/misCasos"],
              },
              {
                title: "Seguimientos",
                icon: "folder-outline",
                link: ["/seguimientos"],
              },
              {
                title: "Estadísticas",
                icon: "activity-outline",
                link: ["/estadisticas"],
              },
              {
                title: "Mi perfil",
                icon: "person-outline",
                link: ["/miPerfil"],
              },
            ];
          }
        });
    }
  }

  getEmail() {
    return this.loginService.getAuth().email;
  }

  getUserData() {
    return this.userDataService.getUserDataByEmail(this.getEmail());
  }

  toogleSideBar() {
    this.sidebarService.toggle(true);
  }

  itemsContext = [
    {
      title: "Cerrar sesión",
      icon: "corner-down-right-outline",
      link: ["/login"],
    },
  ];
}
