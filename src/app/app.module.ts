import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LandingModule } from './landing/landing.module';
import { CoreModule } from './core/core.module';
import { CoursesListItemService } from './courses/services/courses-list-item.service';
import { JwtInterceptor } from './helpers/auth-interceptor';
import { CommunicatorService } from './core/services/communicator.service';
import { AuthService } from './core/services/auth.service';
import { CanActivateGuard } from './core/guards/canActivateGuard';
import { SharedService } from './core/services/shared.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core/store/states';
import { AuthEffects } from './core/store/effects/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorPageComponent,
    SignUpComponent
  ],
  imports: [
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument(),

    BrowserModule,
    HttpClientModule,
    FormsModule,

    CoreModule,
    SharedModule,
    LayoutModule,

    UsersModule,
    CoursesModule,
    LandingModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [
    CoursesListItemService,
    CommunicatorService,
    AuthService,
    CanActivateGuard,
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
