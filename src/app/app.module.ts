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
import { RouterModule } from '@angular/router';
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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorPageComponent
  ],
  imports: [
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
  exports: [
    CoreModule,
    SharedModule,
    RouterModule,
    LandingModule,
    CoursesModule
  ],
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
