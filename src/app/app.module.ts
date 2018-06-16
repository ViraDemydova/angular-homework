import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserLogInComponent } from './header/user-log-in/user-log-in.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './header/logo/logo.component';
import { UserLogOffComponent } from './header/user-log-off/user-log-off.component';
import { SearchComponent } from './search/search.component';
import { CoursesListItemComponent } from './courses-list/courses-list-item/courses-list-item.component';
import { UserEntityComponent } from './user/user-entity/user-entity.component';
import { UserComponent } from './user/user.component';

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
    UserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
