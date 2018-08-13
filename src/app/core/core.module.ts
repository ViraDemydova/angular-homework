import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../layout/components/breadcrumbs/breadcrumbs.component';
import { LoaderService } from '../loader/services/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';
import { CanActivateGuard } from './guards/canActivateGuard';
import { SharedService } from './services/shared.service';
import { CommunicatorService } from './services/communicator.service';
import { AuthService } from './services/auth.service';

// В этом модуле регистрируем сервисы
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    RouterModule
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
