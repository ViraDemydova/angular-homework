import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LandingModule } from './landing/landing.module';
import { CoreModule } from './core/core.module';
import { AddPageComponent } from './add-page/add-page.component';;
import {AddPageModule} from './add-page/add-page.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddPageComponent
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
    AddPageModule,
    AppRoutingModule
  ],
  exports: [ SharedModule, RouterModule, LandingModule, AddPageModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
