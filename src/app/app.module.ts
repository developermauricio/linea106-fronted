import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

//Firebase imports
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import {
  AngularFireFunctionsModule,
  FUNCTIONS_ORIGIN,
} from "@angular/fire/functions";

//Nebular imports
import {
  NbSidebarModule,
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbMenuModule,
  NbActionsModule,
  NbUserModule,
  NbCardModule,
  NbInputModule,
  NbContextMenuModule,
  NbAlertModule,
  NbToastrModule,
  NbDialogModule,
} from "@nebular/theme";

import { NbEvaIconsModule } from "@nebular/eva-icons";

//Excel imports
import { ExcelReportService } from "./excel.report.service";

//Evironments Imports
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";

//Components Imports
import { AppComponent } from "./app.component";

//LoginComponent Import
import { LoginComponent } from "./Auth/Login/login.component";

//DashboardComponent Import
import { DashboardComponent } from "./Dashboard/dashboard.component";

//AdminComponents Imports
import { AdminInicioComponent } from "./Pages/Admin - Inicio/admin.inicio.component";
import { AdminCasosComponent } from "./Pages/Admin - Casos/admin.casos.component";
import { AdminUsuariosComponent } from "./Pages/Admin - Usuarios/admin.usuarios.component";
import { AdminReportesComponent } from "./Pages/Admin - Reportes/admin.reportes.component";
import { AdminMiPerfilComponent } from "./Pages/Admin - Perfil/admin.mi.perfil.component";

//PsicologoComponents Imports
import { PsicologoInicioComponent } from "./Pages/Psicologo - Inicio/psicologo.inicio.component";
import { PsicologoMisCasosComponent } from "./Pages/Psicologo - Mis Casos/psicologo.mis.casos.component";
import { PsicologoCrearCasoComponent } from "./Pages/Psicologo - Crear Caso/psicologo.crear.caso.component";
import { PsicologoCasosComponent } from "./Pages/Psicologo - Casos/psicologo.casos.component";
import { PsicologoPerfilComponent } from "./Pages/Psicologo - Perfil/psicologo.perfil.component";
import { PsicologoSeguimientoComponent } from "./Pages/Psicologo - Seguimiento/psicologo.seguimiento.component";

//Services Imports
import { PatientDataService } from "./patient.data.service";
import { CaseDataService } from "./case.data.service";
import { AnuncioDataService } from "./anuncio.data.service";
import { UserDataService } from "./user.data.service";
import { SeguimientoDataService } from "./seguimiento.data.service";

//Login Import
import { LoginService } from "./Auth/Login/login.service";

//Estadisticas Import
import { EstadisticasComponent } from "./Pages/Estadisticas/estadisticas.component";

//Guardians Imports
import { AdminGuardian } from "./Auth/Guardians/adminGuardian.service";
import { PsicologoGuardian } from "./Auth/Guardians/psicologoGuardian.service";
import { LoginGuardian } from "./Auth/Guardians/loginGuardian.service";

//Pipes imports
import { seguimientoFilterPipe } from "./pipes/seguimientoFilter.pipe";
import { Ng2SmartTableModule } from "ng2-smart-table";

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule,
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
    Ng2SmartTableModule,
  ],
  providers: [
    LoginService,
    UserDataService,
    PatientDataService,
    CaseDataService,
    AnuncioDataService,
    SeguimientoDataService,
    LoginGuardian,
    AdminGuardian,
    PsicologoGuardian,
    ExcelReportService,
    { provide: FUNCTIONS_ORIGIN, useValue: "http://localhost:5001" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
