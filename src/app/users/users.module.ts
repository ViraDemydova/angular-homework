import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './components/user.component';
import {UserEntityComponent} from './components/user-entity/user-entity.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserComponent,
    UserEntityComponent
  ],
  exports: [
    UserComponent,
    UserEntityComponent
  ]
})
export class UsersModule { }
