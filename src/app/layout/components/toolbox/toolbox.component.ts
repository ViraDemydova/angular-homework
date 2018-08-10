import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CoursesListItem } from '../../../courses/models/courses-list-item.model';
import { CommunicatorService } from '../../../core/services/communicator.service';

@Component({
  selector: 'app-toolbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Output() searchText: EventEmitter<string> = new EventEmitter<string>();
  @Output() addCourse: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();

  constructor(private comService: CommunicatorService) {}

  ngOnInit() {}

  public onSearchTextChanged(e: string): void {
    this.searchText.emit(e);
  }

}
