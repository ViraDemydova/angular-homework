import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list/courses-list-item/courses-list-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import {SharedModule} from '../shared/shared.module';
import { CoursesContainerComponent } from './components/courses-container/courses-container.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent,
    CoursesContainerComponent
  ],
  exports: [
    CoursesContainerComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent
  ]
})
export class CoursesModule { }
