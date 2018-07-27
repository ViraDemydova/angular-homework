import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AddPageComponent } from './add-page/add-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { CanActivateGuard } from './guards/canActivateGuard';

// Application wide providers
const APP_PROVIDERS = [
  CanActivateGuard
];


const routes: Routes = [
  { path: 'landing-page', component: LandingComponent, canActivate: [CanActivateGuard] },
  { path: 'add-page', component: AddPageComponent, canActivate: [CanActivateGuard] },
  { path: 'edit-page/:id', component: EditPageComponent, data: { 'security_key': 'key_here' }, canActivate: [CanActivateGuard] },
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
  providers: [APP_PROVIDERS],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
