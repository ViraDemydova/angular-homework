import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddEditPageComponent } from './courses/components/add-edit-page/add-edit-page.component';
import { CoreModule } from './core/core.module';
import { CanActivateGuard } from './core/guards/canActivateGuard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core/store/states';
import { AuthEffects } from './core/store/effects/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {reducersLoad} from "./courses/store/states";

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
    CoreModule,
    StoreModule.forRoot(reducers, {}),
    //StoreModule.forRoot(reducersLoad, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot(routes, { useHash: true }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    APP_PROVIDERS
  ],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
