import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import {SharedModule} from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import { LandingModule } from './landing/landing.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    UsersModule,
    CoursesModule,
    FormsModule,
    SharedModule,
    LandingModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [ SharedModule, RouterModule, LandingModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
