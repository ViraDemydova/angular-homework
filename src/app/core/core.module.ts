import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../layout/components/breadcrumbs/breadcrumbs.component';

// В этом модуле регистрируем сервисы
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BreadcrumbsComponent],
  exports: [BreadcrumbsComponent]
})
export class CoreModule { }
