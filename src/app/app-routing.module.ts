import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import {AddPageComponent} from './add-page/add-page.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingComponent },
  { path: 'add-page', component: AddPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
