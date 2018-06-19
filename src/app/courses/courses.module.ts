import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list/courses-list-item/courses-list-item.component';
import { CoursesPageComponentComponent } from './components/courses-page-component/courses-page-component.component';
import { UserComponent } from '../users/components/user.component';
import { UserEntityComponent } from '../users/components/user-entity/user-entity.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponentComponent,
    UserComponent,
    UserEntityComponent
  ],
  exports: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponentComponent,
    UserComponent,
    UserEntityComponent
  ]
})
export class CoursesModule { }
