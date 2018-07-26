import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from '../login/login.component';
const routes:Routes = [
{path:'', redirectTo:'login',pathMatch:'full'},
{path:'login',component:LoginComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }