import {Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CoursesListItem } from '../../models/courses-list-item.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../loader/services/loader.service';
import { stateEnum } from './enum';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit, OnChanges, OnDestroy {
  public listItems: CoursesListItem[] = [];
  pageData = {
   countToStart: stateEnum.DEFAULT_START_COUNT,
   countToLoad: stateEnum.DEFAULT_LOAD_COUNT,
   nextPage: stateEnum.NEXT_PAGE,
   startPage: stateEnum.DEFAULT_PAGE
  };

  // TODO: У подписки есть метод add. Например, listItemsParamsSubscription.add()
  // Это позволяет создать одну подписку как свойство, например при инициализации
  // компонента. Для остальных подписок использовать локалькую константу sub
  // и добавлять ее методом add() к основной.
  // метод unsibscribe для основной подписки позволит отписаться и от всех добавленых
  // подписок методом add()
  private usersCreateSubscription = new Subscription();
  private sub: Subscription;
  // это свойство содержит текст поиска курса по названию
  @Input() searchText: any;
  @Input () isSearchAvailable: boolean;
  input: string;
  item: string;
  createDate = 'createDate';
  text: string;

  constructor(
    private coursesListService: CoursesListItemService,
    private loaderService: LoaderService
  ) {}

  public ngOnInit(): void {
    this.init();
    this.text = 'LOAD MORE...';
  }

  ngOnChanges(e) {
    if (e.searchText.currentValue === null) {
      return;
    }

    this.onSearch(e.searchText.currentValue);
  }

  init(): void {
    this.usersCreateSubscription = this.coursesListService.getCourseListItems(this.pageData.startPage.toString(), this.pageData.countToStart.toString(), this.pageData.countToLoad.toString(), this.createDate).subscribe((res: CoursesListItem[]) => {
      this.listItems = res;
    });
  }

  onDeleteCourse(id: string): void {
    this.sub = this.coursesListService.deleteItem(id).subscribe(() => {
      this.init();
    });
  }

  public onSearch(queryString: string): void {
    this.sub = this.coursesListService.searchTextWithParams(queryString, this.pageData.startPage.toString(), this.pageData.countToStart.toString(), this.toString(), this.createDate).subscribe((res: CoursesListItem[]) => {
        this.listItems = res;
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  onLoadMore(): void {
    if (this.listItems.length > 0 && this.listItems.length <= 10) {
      this.sub = this.coursesListService.getCourseListItems(this.pageData.nextPage.toString(), this.pageData.countToStart.toString(), this.pageData.countToLoad.toString(), this.createDate).subscribe((res: CoursesListItem[]) => {
          this.text = 'LOAD MORE...';
          this.pageData.nextPage++;
          this.listItems = res;
        },
        (error: HttpErrorResponse) => console.log(error));
    }
    if (this.listItems.length <= 9) {
      this.sub =  this.coursesListService.getCourseListItems(this.pageData.startPage.toString(), this.pageData.countToStart.toString(), this.pageData.countToLoad.toString(), this.createDate).subscribe((res: CoursesListItem[]) => {
          this.listItems = res;
          this.text = 'We\'re backed to the first page...';
          this.pageData.nextPage = stateEnum.NEXT_PAGE;
        },
        (error: HttpErrorResponse) => console.log(error));
    }
}

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  public ngOnDestroy(): void {
    if (this.usersCreateSubscription) {
      this.usersCreateSubscription.unsubscribe();
    }
  }
}
