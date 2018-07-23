import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  // принимаем текст от search input
  // и передаем его родительскому компоненту
  onSearch(searchText: string) {
    this.search.emit(searchText);
  }
}
