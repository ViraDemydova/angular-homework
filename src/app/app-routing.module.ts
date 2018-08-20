import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// @ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './core/store/effects/auth.effects';
import { reducers } from './core/store/states';
import { reducersLoad } from './courses/store/states';

// Modules
import { CoreModule } from './core/core.module';

// Services and Guards
import { CanActivateGuard } from './core/guards/canActivateGuard';

// Components
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddEditPageComponent } from './courses/components/add-edit-page/add-edit-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

// Application wide providers
const APP_PROVIDERS = [CanActivateGuard];

const routes: Routes = [
  {
    path: 'landing-page',
    component: LandingComponent,
    canActivate: [CanActivateGuard]
  },
  //{ path: 'add-page', component: AddPageComponent, canActivate: [CanActivateGuard] },
  //{ path: 'edit-page/:id/:IsEditPageEnabled', component: EditPageComponent, data: { 'security_key': 'key_here' }, canActivate: [CanActivateGuard] },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'add-page',
    component: AddEditPageComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: 'edit-page/:id/:state',
    component: AddEditPageComponent,
    canActivate: [CanActivateGuard]
  },
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
    // Этот модуль должен подключаться только один раз. Он подключен и в AppModule и тут.
    CoreModule,
    // Почему стор подключается тут, а не в AppModule?
    StoreModule.forRoot(reducers, {}),
    //StoreModule.forRoot(reducersLoad, {}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument(),

    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [APP_PROVIDERS],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
