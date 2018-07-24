import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TimeControlComponent } from './components/time-control/time-control.component';
import { DateControlComponent } from './components/date-control/date-control.component';
import { RoleControlComponent } from './components/role-control/role-control.component';
import {AddPageComponent} from './add-page.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    AddPageComponent,
    TimeControlComponent,
    DateControlComponent,
    RoleControlComponent
  ],
  exports: [AddPageComponent]
})
export class AddPageModule {}
