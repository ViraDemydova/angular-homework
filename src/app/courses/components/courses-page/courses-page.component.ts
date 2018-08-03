import {Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CoursesListItem } from '../../models/courses-list-item.model';
import { Subscription } from '../../../../../node_modules/rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {AddEditPageComponent} from "../add-edit-page/add-edit-page.component";
import {CommunicatorService} from "../../../core/services/communicator.service";
import {Observable} from "rxjs/Rx";

const DEFAULT_START_COUNT = '1';
const DEFAULT_LOAD_COUNT = '26';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit, OnChanges, OnDestroy {
  public ListItems: CoursesListItem[] = [];
  public countToStart: string = DEFAULT_START_COUNT;
  public countToLoad: string = DEFAULT_LOAD_COUNT;
  private listItemsParamsSubscription: Subscription;
  private usersDeleteSubscription: Subscription;
  private usersCreateSubscription: Subscription;
  private usersWithParamsSubscription: Subscription;
  @Input() public listItem: CoursesListItem;
  // это свойство содержит текст поиска курса по названию
  @Input() id;
  @Input() searchText: string;
  input: string;
  newItem: object;
  item: string;

  constructor(private coursesListService: CoursesListItemService,
              private comService: CommunicatorService) {}

  public ngOnInit(): void {
    this.init();
    this.newItem = this.comService.getData();
    if (this.newItem) {
      this.createUser(this.newItem);
    }
  }

  ngOnChanges(e) {
    if (e.searchText.currentValue === null) {
      return;
    }

    this.onSearch(e.searchText.currentValue);
  }


  init(): void {
    this.coursesListService.getCourseListItems(this.countToStart).subscribe((res: CoursesListItem[]) => {
      this.ListItems = res;
    });
  }

  onLoad(): void {
    this.listItemsParamsSubscription = this.coursesListService.getCourseListItemsWithParams(this.countToStart, this.countToLoad).subscribe((res: CoursesListItem[]) => {
      this.ListItems = res;
      console.log(this.ListItems);
    },
    (error: HttpErrorResponse) => console.log(error));
  }

  onDeleteCourse(listItem: CoursesListItem): void {
    this.usersDeleteSubscription = this.coursesListService.deleteItem(String(listItem)).subscribe(() => {
      this.init();
    });
  }


  onEditCourse(item: CoursesListItem) {
    this.coursesListService.editItem(item);
    console.log('Cours with id: ', item.id, ' was edited');
  }

  public onSearch(queryString: string): void {
    this.usersWithParamsSubscription = this.coursesListService.searchTextWithParams(queryString).subscribe((res: CoursesListItem[]) => {
        this.ListItems = res;
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  onGetCourseById(item: CoursesListItem) {
    //this.coursesListService.getCourseById(item.id);
    //console.log('Getting object by ID, result as: ', this.coursesListService.getCourseById(item.id));
  }

  public createUser(data: object): void {
    this.usersCreateSubscription = this.coursesListService.addItem(data).subscribe(() => {
      this.init();
    });
  }

  public ngOnDestroy(): void {
    //this.listItemsParamsSubscription.unsubscribe();
    //this.usersWithParamsSubscription.unsubscribe();
    //this.usersCreateSubscription.unsubscribe();
    //this.usersDeleteSubscription.unsubscribe();
  }
}
