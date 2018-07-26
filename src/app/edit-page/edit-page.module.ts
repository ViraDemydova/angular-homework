import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditPageComponent } from './edit-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    EditPageComponent
  ],
  exports: [EditPageComponent]
})
export class EditPageModule { }
