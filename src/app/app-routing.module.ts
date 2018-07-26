import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AddPageComponent } from './add-page/add-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingComponent },
  { path: 'add-page', component: AddPageComponent },
  { path: 'edit-page/:id', component: EditPageComponent, data: { 'security_key': 'key_here' } },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
 },
  // 404
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
