import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list/courses-list-item/courses-list-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent
  ],
  exports: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent
  ]
})
export class CoursesModule { }
