import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { Reporte1Component } from '../reporte1/reporte1.component';
import { Reporte2Component } from '../reporte2/reporte2.component';


import { CookieService } from 'ngx-cookie-service';

// Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from  '@angular/common/http'
// Componentes
@NgModule({
  declarations: [
    PrincipalComponent,
    Reporte1Component,
    Reporte2Component
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class PrincipalModule { }
