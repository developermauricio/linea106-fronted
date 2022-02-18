import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import esCo from '@angular/common/locales/es-CO';
import { LOCALE_ID, NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NbEvaIconsModule } from "@nebular/eva-icons";
//Nebular imports
import {
  NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule,
  NbThemeModule, NbToastrModule, NbUserModule
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
//Evironments Imports
import { AppRoutingModule } from "./app-routing.module";
//Components Imports
import { AppComponent } from "./app.component";
//Guardians Imports
import { AdminGuardian } from "./Auth/Guardians/adminGuardian.service";
import { LoginGuardian } from "./Auth/Guardians/loginGuardian.service";
import { PsicologoGuardian } from "./Auth/Guardians/psicologoGuardian.service";
//LoginComponent Import
import { LoginComponent } from "./Auth/Login/login.component";
//Login Import
import { ComponentsModule } from './Components/components.module';
//DashboardComponent Import
import { DashboardComponent } from "./Dashboard/dashboard.component";
//Excel imports
import { ExcelReportService } from "./Services/excel.report.service";
import { AdminCasosComponent } from "./Pages/Admin - Casos/admin.casos.component";
//AdminComponents Imports
import { AdminInicioComponent } from "./Pages/Admin - Inicio/admin.inicio.component";
import { AdminMiPerfilComponent } from "./Pages/Admin - Perfil/admin.mi.perfil.component";
import { AdminReportesComponent } from "./Pages/Admin - Reportes/admin.reportes.component";
import { AdminUsuariosComponent } from "./Pages/Admin - Usuarios/admin.usuarios.component";
import { PasswordResetComponent } from './Pages/Auth/password-reset/password-reset.component';
//Estadisticas Import
import { EstadisticasComponent } from "./Pages/Estadisticas/estadisticas.component";
import { PsicologoCasosComponent } from "./Pages/Psicologo - Casos/psicologo.casos.component";
import { PsicologoCrearCasoComponent } from "./Pages/Psicologo - Crear Caso/psicologo.crear.caso.component";
//PsicologoComponents Imports
import { PsicologoInicioComponent } from "./Pages/Psicologo - Inicio/psicologo.inicio.component";
import { PsicologoMisCasosComponent } from "./Pages/Psicologo - Mis Casos/psicologo.mis.casos.component";
import { PsicologoPerfilComponent } from "./Pages/Psicologo - Perfil/psicologo.perfil.component";
import { PsicologoSeguimientoComponent } from "./Pages/Psicologo - Seguimiento/psicologo.seguimiento.component";
//Services Imports
//Pipes imports
import { seguimientoFilterPipe } from "./pipes/seguimientoFilter.pipe";

registerLocaleData(esCo);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminInicioComponent,
    AdminCasosComponent,
    AdminUsuariosComponent,
    AdminReportesComponent,
    AdminMiPerfilComponent,
    PsicologoInicioComponent,
    PsicologoMisCasosComponent,
    PsicologoPerfilComponent,
    PsicologoCasosComponent,
    PsicologoCrearCasoComponent,
    PsicologoSeguimientoComponent,
    EstadisticasComponent,
    seguimientoFilterPipe,
    PasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbActionsModule,
    NbUserModule,
    NbCardModule,
    NbInputModule,
    NbContextMenuModule,
    NbAlertModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SmartTableModule
  ],
  providers: [
    LoginGuardian,
    AdminGuardian,
    PsicologoGuardian,
    ExcelReportService,
    { provide: LOCALE_ID, useValue: "es-CO" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
