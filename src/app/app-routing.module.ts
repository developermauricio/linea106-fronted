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
    canActivate: [LoginGuardian],
    children: [
      {
        path: "inicio",
        component: AdminInicioComponent,
        canActivate: [LoginGuardian, AdminGuardian],
      },
      {
        path: "casos",
        component: AdminCasosComponent,
        canActivate: [LoginGuardian, AdminGuardian],
      },
      {
        path: "usuarios",
        component: AdminUsuariosComponent,
        canActivate: [LoginGuardian, AdminGuardian],
      },
      {
        path: "reportes",
        component: AdminReportesComponent,
        canActivate: [LoginGuardian, AdminGuardian],
      },
      {
        path: "perfil",
        component: AdminMiPerfilComponent,
        canActivate: [LoginGuardian, AdminGuardian],
      },
      {
        path: "anuncios",
        component: PsicologoInicioComponent,
        canActivate: [LoginGuardian, PsicologoGuardian],
      },
      {
        path: "crearCaso",
        component: PsicologoCrearCasoComponent,
        canActivate: [LoginGuardian, PsicologoGuardian],
      },
      {
        path: "historialCasos",
        component: PsicologoCasosComponent,
        canActivate: [LoginGuardian, PsicologoGuardian],
      },
      {
        path: "misCasos",
        component: PsicologoMisCasosComponent,
        canActivate: [LoginGuardian, PsicologoGuardian],
      },
      {
        path: "miPerfil",
        component: PsicologoPerfilComponent,
        canActivate: [LoginGuardian, PsicologoGuardian],
      },
      {
        path: "seguimientos",
        component: PsicologoSeguimientoComponent,
        canActivate: [LoginGuardian, PsicologoGuardian]
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
