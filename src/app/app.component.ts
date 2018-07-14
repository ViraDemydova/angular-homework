import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  searchText: string;

  onLogText() {
    console.log('Add new course');
  }

  // получаем текст поиска
  onSearch(searchText: string) {
     this.searchText = searchText;
     console.log('show search text from app', this.searchText);
  }
}
