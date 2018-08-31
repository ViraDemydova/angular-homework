import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddEditPageComponent } from './courses/components/add-edit-page/add-edit-page.component';
import { CanActivateGuard } from './core/guards/canActivateGuard';
import { SignUpComponent } from './sign-up/sign-up.component';

// Application wide providers
const APP_PROVIDERS = [
  CanActivateGuard
];

const routes: Routes = [
  { path: 'landing-page', component: LandingComponent, canActivate: [CanActivateGuard] },
  //{ path: 'add-page', component: AddPageComponent, canActivate: [CanActivateGuard] },
  //{ path: 'edit-page/:id/:IsEditPageEnabled', component: EditPageComponent, data: { 'security_key': 'key_here' }, canActivate: [CanActivateGuard] },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-page', component: AddEditPageComponent, canActivate: [CanActivateGuard] },
  { path: 'edit-page/:id/:state', component: AddEditPageComponent,  canActivate: [CanActivateGuard] },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
 },
  // 404
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    APP_PROVIDERS
  ],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
