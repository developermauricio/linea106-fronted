import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuardian } from './Auth/Guardians/adminGuardian.service';
/*Guardians*/
import { LoginGuardian } from './Auth/Guardians/loginGuardian.service';
import { PsicologoGuardian } from './Auth/Guardians/psicologoGuardian.service';
/*Login Component*/
import { LoginComponent } from "./Auth/Login/login.component";
import { DashboardComponent } from "./Dashboard/dashboard.component";
import { AdminCasosComponent } from "./Pages/Admin - Casos/admin.casos.component";
/*Admin Components*/
import { AdminInicioComponent } from "./Pages/Admin - Inicio/admin.inicio.component";
import { AdminMiPerfilComponent } from './Pages/Admin - Perfil/admin.mi.perfil.component';
import { AdminReportesComponent } from './Pages/Admin - Reportes/admin.reportes.component';
import { AdminUsuariosComponent } from "./Pages/Admin - Usuarios/admin.usuarios.component";
import { PasswordResetComponent } from './Pages/Auth/password-reset/password-reset.component';
/*Estadísitcas Component*/
import { EstadisticasComponent } from "./Pages/Estadisticas/estadisticas.component";
import { PsicologoCasosComponent } from './Pages/Psicologo - Casos/psicologo.casos.component';
import { PsicologoCrearCasoComponent } from './Pages/Psicologo - Crear Caso/psicologo.crear.caso.component';
/*Psicologo Components*/
import { PsicologoInicioComponent } from './Pages/Psicologo - Inicio/psicologo.inicio.component';
import { PsicologoMisCasosComponent } from './Pages/Psicologo - Mis Casos/psicologo.mis.casos.component';
import { PsicologoPerfilComponent } from './Pages/Psicologo - Perfil/psicologo.perfil.component';
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
      },
      {
        path: "caso",
        loadChildren: () => import('./Pages/gestion-caso/gestion-caso.module').then(m => m.GestionCasoModule),
        canActivate: [PsicologoGuardian],
      },
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "password/reset/:token",
    component: PasswordResetComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
