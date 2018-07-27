import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { UsersModule } from '../users/users.module';
import { CoursesModule } from '../courses/courses.module';
import { LandingComponent } from './landing.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    UsersModule,
    CoursesModule,
    CoreModule
  ],
  declarations: [ LandingComponent ],
  exports: [ LandingComponent ]
})
export class LandingModule { }
