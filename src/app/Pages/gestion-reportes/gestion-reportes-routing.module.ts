import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionReportesComponent } from './pages/gestion-reportes/gestion-reportes.component';

const routes: Routes = [
  {
    path: '',
    component: GestionReportesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionReportesRoutingModule { }
