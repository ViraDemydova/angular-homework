import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { UserLogInComponent } from './layout/components/user-log-in/user-log-in.component';
import { BreadcrumbsComponent } from './layout/components/breadcrumbs/breadcrumbs.component';
import { CoursesListComponent } from './courses/components/courses-list/courses-list.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { LogoComponent } from './layout/components/logo/logo.component';
import { UserLogOffComponent } from './layout/components/user-log-off/user-log-off.component';
import { SearchComponent } from './layout/components/search/search.component';
import { CoursesListItemComponent } from './courses/components/courses-list/courses-list-item/courses-list-item.component';
import { UserEntityComponent } from './users/components/user-entity/user-entity.component';
import { UserComponent } from './users/components/user.component';
import { ToolboxComponent } from './layout/components/toolbox/toolbox.component';
import { CoursesPageComponentComponent } from './courses/components/courses-page-component/courses-page-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserLogInComponent,
    BreadcrumbsComponent,
    CoursesListComponent,
    FooterComponent,
    LogoComponent,
    UserLogOffComponent,
    SearchComponent,
    CoursesListItemComponent,
    UserEntityComponent,
    UserComponent,
    ToolboxComponent,
    CoursesPageComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
