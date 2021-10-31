import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal.component';
import { Reporte1Component } from '../reporte1/reporte1.component';
import { Reporte2Component } from '../reporte2/reporte2.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
    children: [
      { path: '', component: Reporte1Component },
      { path: 'reporte1', component: Reporte1Component },
      { path: 'reporte2', component: Reporte2Component },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
