import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import {SharedModule} from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    UsersModule,
    CoursesModule,
    FormsModule,
    SharedModule
  ],
  exports: [ SharedModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
