import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyTimePipe} from './pipes/myTime.pipe';
import {OrderByPipe} from './pipes/orderBy.pipe';
import {FilterPipe} from './pipes/filter.pipe';
import {IfDirective} from './directives/if.directive';
import {HideDirective} from './directives/hide.directive';
import {BorderHighlightDirective} from './directives/borderHighlight.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MyTimePipe,
    OrderByPipe,
    FilterPipe,
    IfDirective,
    HideDirective,
    BorderHighlightDirective
  ],
  exports: [
    MyTimePipe,
    OrderByPipe,
    FilterPipe,
    IfDirective,
    HideDirective,
    BorderHighlightDirective
  ]
})
export class SharedModule { }
