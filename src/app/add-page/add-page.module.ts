import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TimeControlComponent} from './components/time-control/time-control.component';
import {DateControlComponent} from './components/date-control/date-control.component';
import { RoleControlComponent } from './components/role-control/role-control.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TimeControlComponent,
    DateControlComponent,
    RoleControlComponent
  ],
  exports: [
    TimeControlComponent,
    DateControlComponent,
    RoleControlComponent
  ]
})
export class AddPageModule { }
