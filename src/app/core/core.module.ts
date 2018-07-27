import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../layout/components/breadcrumbs/breadcrumbs.component';

// В этом модуле регистрируем сервисы
@NgModule({
  imports: [CommonModule],
  declarations: [BreadcrumbsComponent],
  exports: [BreadcrumbsComponent]
})
export class CoreModule { }
