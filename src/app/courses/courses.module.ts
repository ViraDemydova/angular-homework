import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list/courses-list-item/courses-list-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import {IfDirective} from './components/courses-list/courses-list-item/if.directive';
import {MyTimePipe} from './components/courses-list/courses-list-item/myTime.pipe';
import {OrderByPipe} from './components/courses-list/courses-list-item/orderBy.pipe';
import {FilterPipe} from './components/courses-list/courses-list-item/filter.pipe';
import {BorderHighlightDirective} from './components/courses-list/courses-list-item/borderHighlight.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent,
    IfDirective,
    MyTimePipe,
    OrderByPipe,
    FilterPipe,
    BorderHighlightDirective
  ],
  exports: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent
  ]
})
export class CoursesModule { }
