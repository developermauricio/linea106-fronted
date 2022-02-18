import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NbSidebarService } from "@nebular/theme";
import { UserModel } from '../Models/user.model';
import { LoginService } from '../Services/login.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private sidebarService: NbSidebarService,
    private loginService: LoginService,
    private _router: Router
  ) { }

  user: UserModel;
  userName: string;
  home: string;
  rol: string;
  items = [];

  ngOnInit() {
    this.loginService.user.subscribe(user => {
      this.home = '/login';
      this.user = user;
      if (user) {
        this.userName = `${user.name} ${user.last_name}`;
        this.rol = user.rol;
        if (this.rol == "Administrador") {
          this.settingsAdmin();
        } else {
          this.settingsPsicologo();
        }
      }

      if (window.location.pathname === '/' || this.home == '/login') {
        setTimeout(() => {
          this._router.navigate([this.home]);
        }, 200);
      }

    });
  }

  private settingsPsicologo() {

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
        link: ["/caso/crear"],
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
      // {
      //   title: "Seguimientos",
      //   icon: "folder-outline",
      //   link: ["/seguimientos"],
      // },
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

  private settingsAdmin() {
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
        title: "Reportes",
        icon: "activity-outline",
        link: ["/reportes"],
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
  }

  getEmail() {
    return this.user?.email;
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
