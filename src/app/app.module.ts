import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import esCo from '@angular/common/locales/es-CO';
import { LOCALE_ID, NgModule } from "@angular/core";
//Firebase imports
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import {
  AngularFireFunctionsModule,
  FUNCTIONS_ORIGIN
} from "@angular/fire/functions";
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
import { environment } from "../environments/environment";
import { AnuncioDataService } from "./anuncio.data.service";
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
import { LoginService } from "./Auth/Login/login.service";
import { CaseDataService } from "./case.data.service";
import { CustomToggleComponent } from './Components/custom-toggle/custom-toggle.component';
import { PaginationServerComponent } from './Components/pagination-server/pagination-server.component';
import { SelectFilterComponent } from './Components/select-filter/select-filter.component';
import { VerCasoComponent } from './Components/ver-caso/ver-caso.component';
//DashboardComponent Import
import { DashboardComponent } from "./Dashboard/dashboard.component";
//Excel imports
import { ExcelReportService } from "./excel.report.service";
import { AdminCasosComponent } from "./Pages/Admin - Casos/admin.casos.component";
//AdminComponents Imports
import { AdminInicioComponent } from "./Pages/Admin - Inicio/admin.inicio.component";
import { AdminMiPerfilComponent } from "./Pages/Admin - Perfil/admin.mi.perfil.component";
import { AdminReportesComponent } from "./Pages/Admin - Reportes/admin.reportes.component";
import { AdminUsuariosComponent } from "./Pages/Admin - Usuarios/admin.usuarios.component";
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
import { PatientDataService } from "./patient.data.service";
//Pipes imports
import { seguimientoFilterPipe } from "./pipes/seguimientoFilter.pipe";
import { SeguimientoDataService } from "./seguimiento.data.service";
import { UserDataService } from "./user.data.service";




















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
    PaginationServerComponent,
    SelectFilterComponent,
    VerCasoComponent,
    CustomToggleComponent
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
    ReactiveFormsModule,
    Ng2SmartTableModule,
    HttpClientModule
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
    { provide: LOCALE_ID, useValue: "es-CO" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
