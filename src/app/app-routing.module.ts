import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./Dashboard/dashboard.component";

/*Login Component*/
import { LoginComponent } from "./Auth/Login/login.component";

/*Admin Components*/
import { AdminInicioComponent } from "./Pages/Admin - Inicio/admin.inicio.component";
import { AdminCasosComponent } from "./Pages/Admin - Casos/admin.casos.component";
import { AdminUsuariosComponent } from "./Pages/Admin - Usuarios/admin.usuarios.component";
import { AdminReportesComponent } from './Pages/Admin - Reportes/admin.reportes.component';
import { AdminMiPerfilComponent } from './Pages/Admin - Perfil/admin.mi.perfil.component';

/*Psicologo Components*/
import { PsicologoInicioComponent } from './Pages/Psicologo - Inicio/psicologo.inicio.component';
import { PsicologoMisCasosComponent } from './Pages/Psicologo - Mis Casos/psicologo.mis.casos.component';
import { PsicologoPerfilComponent } from './Pages/Psicologo - Perfil/psicologo.perfil.component';

/*Estadísitcas Component*/
import { EstadisticasComponent } from "./Pages/Estadisticas/estadisticas.component";

/*Guardians*/
import { LoginGuardian } from './Auth/Guardians/loginGuardian.service';
import { AdminGuardian } from './Auth/Guardians/adminGuardian.service';
import { PsicologoGuardian } from './Auth/Guardians/psicologoGuardian.service';
import { PsicologoCrearCasoComponent } from './Pages/Psicologo - Crear Caso/psicologo.crear.caso.component';
import { PsicologoCasosComponent } from './Pages/Psicologo - Casos/psicologo.casos.component';
import { PsicologoSeguimientoComponent } from './Pages/Psicologo - Seguimiento/psicologo.seguimiento.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "inicio",
        component: AdminInicioComponent,
        canActivate: [AdminGuardian],
      },
      {
        path: "casos",
        component: AdminCasosComponent,
        canActivate: [AdminGuardian],
      },
      {
        path: "usuarios",
        component: AdminUsuariosComponent,
        canActivate: [AdminGuardian],
      },
      {
        path: "reportes",
        component: AdminReportesComponent,
        canActivate: [AdminGuardian],
      },
      {
        path: "perfil",
        component: AdminMiPerfilComponent,
        canActivate: [AdminGuardian],
      },
      {
        path: "anuncios",
        component: PsicologoInicioComponent,
        canActivate: [PsicologoGuardian],
      },
      {
        path: "crearCaso",
        component: PsicologoCrearCasoComponent,
        canActivate: [PsicologoGuardian],
      },
      {
        path: "historialCasos",
        component: PsicologoCasosComponent,
        canActivate: [PsicologoGuardian],
      },
      {
        path: "misCasos",
        component: PsicologoMisCasosComponent,
        canActivate: [PsicologoGuardian],
      },
      {
        path: "miPerfil",
        component: PsicologoPerfilComponent,
        canActivate: [PsicologoGuardian],
      },
      {
        path: "seguimientos",
        component: PsicologoSeguimientoComponent,
        canActivate: [PsicologoGuardian]
      },
      {
        path: "estadisticas",
        component: EstadisticasComponent,
        canActivate: [LoginGuardian]
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
