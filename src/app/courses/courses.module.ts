import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list/courses-list-item/courses-list-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { HighlightDirective } from './components/courses-list/courses-list-item/highlight.directive';
import {HideDirective} from './components/courses-list/courses-list-item/hide.directive';
import {MyTimePipe} from './components/courses-list/courses-list-item/myTime.pipe';
import {OrderByPipe} from './components/courses-list/courses-list-item/orderBy.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent,
    HighlightDirective,
    HideDirective,
    MyTimePipe,
    OrderByPipe
  ],
  exports: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent
  ]
})
export class CoursesModule { }
