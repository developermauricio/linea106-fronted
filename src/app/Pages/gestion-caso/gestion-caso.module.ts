import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbIconModule, NbInputModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ComponentsModule } from 'src/app/Components/components.module';
import { FrmCasoComponent } from './components/frm-caso/frm-caso.component';
import { FrmPacienteComponent } from './components/frm-paciente/frm-paciente.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { GestionCasoRoutingModule } from './gestion-caso-routing.module';
import { CrearCasoComponent } from './pages/crear-caso/crear-caso.component';
import { ActualizarCasoComponent } from './pages/actualizar-caso/actualizar-caso.component';
import { SeguimientosComponent } from './components/seguimientos/seguimientos.component';
import { MostrarCasoComponent } from './components/mostrar-caso/mostrar-caso.component';
import { MostrarItemComponent } from './components/mostrar-item/mostrar-item.component';



@NgModule({
  declarations: [
    CrearCasoComponent,
    FrmCasoComponent,
    FrmPacienteComponent,
    ListUsersComponent,
    ActualizarCasoComponent,
    SeguimientosComponent,
    MostrarCasoComponent,
    MostrarItemComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    GestionCasoRoutingModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbActionsModule,
    NbUserModule,
    NbCardModule,
    NbInputModule,
    NbContextMenuModule,
    NbAlertModule,
    NbEvaIconsModule,
    Ng2SmartTableModule
  ]
})
export class GestionCasoModule { }
