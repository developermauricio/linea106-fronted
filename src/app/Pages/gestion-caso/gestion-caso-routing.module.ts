import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarCasoComponent } from './pages/actualizar-caso/actualizar-caso.component';
import { CrearCasoComponent } from './pages/crear-caso/crear-caso.component';


const routes: Routes = [
  {
    path: 'crear',
    component: CrearCasoComponent
  },
  {
    path: ':id',
    component: ActualizarCasoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCasoRoutingModule { }
