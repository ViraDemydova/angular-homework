import {Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CoursesListItem } from '../../models/courses-list-item.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {LoaderService} from "../../../loader/services/loader.service";

// TODO: Эти константы лучше вынести в отдельный файл и, возможно,
// организовать с помощью enum
const DEFAULT_START_COUNT = '5';
const DEFAULT_LOAD_COUNT = '10';
const DEFAULT_LIMIT_COUNT = '1000';
const DEFAULT_PAGE = '1';
const NEXT_PAGE = '2';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit, OnChanges, OnDestroy {
  public listItems: CoursesListItem[] = [];
  // TODO: Возможно, лучше эти данные оформить в виде объекта.
  // Тогда количество параметров в методе получения данных уменьшиться
  // Не нужно будет помнить в каком порядке их задавать, с объектом проще работать.
  public countToStart: string = DEFAULT_START_COUNT;
  public countToLoad: string = DEFAULT_LOAD_COUNT;
  public nextPage: any = NEXT_PAGE;
  public startPage: string = DEFAULT_PAGE;
  // TODO: У подписки есть метод add. Например, listItemsParamsSubscription.add()
  // Это позволяет создать одну подписку как свойство, например при инициализации
  // компонента. Для остальных подписок использовать локалькую константу sub
  // и добавлять ее методом add() к основной.
  // метод unsibscribe для основной подписки позволит отписаться и от всех добавленых
  // подписок методом add()
  private listItemsParamsSubscription: Subscription;
  private usersDeleteSubscription: Subscription;
  private usersCreateSubscription: Subscription;
  private usersWithParamsSubscription: Subscription;
  @Input() public listItem: CoursesListItem;
  // это свойство содержит текст поиска курса по названию
  @Input() searchText: any;
  @Input () isSearchAvailable: boolean;
  input: string;
  item: string;
  createDate = 'createDate';

  constructor(
    private coursesListService: CoursesListItemService,
    private loaderService: LoaderService
  ) {}

  public ngOnInit(): void {
    this.init();
  }

  ngOnChanges(e) {
    if (e.searchText.currentValue === null) {
      return;
    }

    this.onSearch(e.searchText.currentValue, this.startPage, this.countToStart, this.countToLoad, this.createDate);
  }

  init(): void {
    this.usersCreateSubscription = this.coursesListService.getCourseListItems(this.startPage, this.countToStart, this.countToLoad, this.createDate).subscribe((res: CoursesListItem[]) => {
      this.listItems = res;
    });
  }

  onDeleteCourse(id: string): void {
    this.usersDeleteSubscription = this.coursesListService.deleteItem(id).subscribe(() => {
      this.init();
    });
  }

  public onSearch(queryString: string, start: string, end: string, count: string, date: string): void {
    this.usersWithParamsSubscription = this.coursesListService.searchTextWithParams(queryString, this.startPage, this.countToStart, this.countToLoad, this.createDate).subscribe((res: CoursesListItem[]) => {
        this.listItems = res;
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  onLoadMore(): void {
  this.listItemsParamsSubscription = this.coursesListService.getCourseListItems(this.nextPage, this.countToStart, this.countToLoad, this.createDate).subscribe((res: CoursesListItem[]) => {
      String(this.nextPage++);
      this.listItems = res;
    },
    (error: HttpErrorResponse) => console.log(error));
}

  onPrev(): void {
    this.listItemsParamsSubscription =  this.coursesListService.getCourseListItems(this.startPage, this.countToStart, this.countToLoad, this.createDate).subscribe((res: CoursesListItem[]) => {
      this.listItems = res;
      this.nextPage = NEXT_PAGE;
      },
      (error: HttpErrorResponse) => console.log(error));
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
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
