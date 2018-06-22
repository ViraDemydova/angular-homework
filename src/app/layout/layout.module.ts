import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { UserLogInComponent } from './components/user-log-in/user-log-in.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserLogOffComponent } from './components/user-log-off/user-log-off.component';
import { SearchComponent } from './components/search/search.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    UserLogInComponent,
    BreadcrumbsComponent,
    FooterComponent,
    LogoComponent,
    UserLogOffComponent,
    SearchComponent,
    ToolboxComponent
  ],
  exports: [
    HeaderComponent,
    UserLogInComponent,
    BreadcrumbsComponent,
    FooterComponent,
    LogoComponent,
    UserLogOffComponent,
    SearchComponent,
    ToolboxComponent
  ]
})
export class LayoutModule {}
