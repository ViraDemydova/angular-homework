import {Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CoursesListItem } from '../../models/courses-list-item.model';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';

const DEFAULT_START_COUNT = '10';
const DEFAULT_LOAD_COUNT = '100';

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
  item: string;
  createDate = 'createDate';

  constructor(private coursesListService: CoursesListItemService) {}

  public ngOnInit(): void {
    this.init();
  }

  ngOnChanges(e) {
    if (e.searchText.currentValue === null) {
      return;
    }

    this.onSearch(e.searchText.currentValue);
  }

  init(): void {
    this.coursesListService.getCourseListItems(this.countToStart, this.createDate).subscribe((res: CoursesListItem[]) => {
      this.ListItems = res;
    });
  }

  onDeleteCourse(listItem: CoursesListItem): void {
    this.usersDeleteSubscription = this.coursesListService.deleteItem(String(listItem)).subscribe(() => {
      this.init();
    });
  }

  public onSearch(queryString: string): void {
    this.usersWithParamsSubscription = this.coursesListService.searchTextWithParams(queryString).subscribe((res: CoursesListItem[]) => {
        this.ListItems = res;
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  public createUser(data: object): void {
    this.usersCreateSubscription = this.coursesListService.addItem(data).subscribe((res: CoursesListItem) => {
      this.init();
    });
  }

  onLoadMore(): void {
    this.listItemsParamsSubscription = this.coursesListService.getCourseListItemsWithParams(this.countToLoad, this.createDate).subscribe((res: CoursesListItem[]) => {
        this.ListItems = res;
        console.log(this.ListItems);
      },
      (error: HttpErrorResponse) => console.log(error));
  }

  onLoadLess(): void {
    this.coursesListService.getCourseListItems(this.countToStart, this.createDate).subscribe((res: CoursesListItem[]) => {
        this.ListItems = res;
        console.log(this.ListItems);
      },
      (error: HttpErrorResponse) => console.log(error));
  }


  public ngOnDestroy(): void {
    if (this.listItemsParamsSubscription) {
      this.listItemsParamsSubscription.unsubscribe();
    }
    if (this.usersDeleteSubscription) {
      this.usersDeleteSubscription.unsubscribe();
    }
    if (this.usersCreateSubscription) {
      this.usersCreateSubscription.unsubscribe();
    }
    if (this.usersWithParamsSubscription) {
      this.usersWithParamsSubscription.unsubscribe();
    }
  }
}
