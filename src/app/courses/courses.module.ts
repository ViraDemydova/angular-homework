import {forwardRef, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list/courses-list-item/courses-list-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { TimeControlComponent } from './components/time-control/time-control.component';
import { RoleControlComponent } from './components/role-control/role-control.component';
import { AddEditPageComponent } from './components/add-edit-page/add-edit-page.component';
import { FormsModule, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DateControlComponent } from './components/date-control/date-control.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CoursesPageComponent,
    AddEditPageComponent,
    TimeControlComponent,
    DateControlComponent,
    RoleControlComponent
  ],
  exports: [CoursesPageComponent]
})
export class CoursesModule {}
