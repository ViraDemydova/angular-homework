import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list/courses-list-item/courses-list-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { UserComponent } from '../users/components/user.component';
import { UserEntityComponent } from '../users/components/user-entity/user-entity.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent,
    UserComponent,
    UserEntityComponent
  ],
  exports: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent,
    UserComponent,
    UserEntityComponent
  ]
})
export class CoursesModule { }
