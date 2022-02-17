import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbIconModule, NbInputModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomToggleComponent } from './custom-toggle/custom-toggle.component';
import { EstadisticaItemComponent } from './estadistica-item/estadistica-item.component';
import { PaginationServerComponent } from './pagination-server/pagination-server.component';
import { SelectFilterComponent } from './select-filter/select-filter.component';
import { VerCasoComponent } from './ver-caso/ver-caso.component';

@NgModule({
  exports: [
    CustomToggleComponent,
    PaginationServerComponent,
    SelectFilterComponent,
    VerCasoComponent,
    EstadisticaItemComponent
  ],
  declarations: [
    CustomToggleComponent,
    PaginationServerComponent,
    SelectFilterComponent,
    VerCasoComponent,
    EstadisticaItemComponent
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    FormsModule,
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
    Ng2SmartTableModule
  ]
})
export class ComponentsModule { }
