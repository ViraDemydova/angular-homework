import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../layout/components/breadcrumbs/breadcrumbs.component';
import { LoaderService } from '../loader/services/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducersLoad } from '../courses/store/states';
import { reducersAdd } from '../courses/components/add-edit-page/store/add-course/states';

// В этом модуле регистрируем сервисы
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    RouterModule,
    StoreModule.forFeature('course', reducersLoad),
    StoreModule.forFeature('addCourse', reducersAdd),
    //StoreModule.forFeature('editCourse', reducersEdit)
  ],
  declarations: [
    BreadcrumbsComponent,
    LoaderComponent

  ],
  exports: [
    BreadcrumbsComponent,
    LoaderComponent
  ],
  providers: [
    LoaderService
  ],
})
export class CoreModule { }
