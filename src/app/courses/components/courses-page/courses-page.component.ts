import {Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CoursesListItem } from '../../models/courses-list-item.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../loader/services/loader.service';
import { stateEnum } from './enum';
import { Store } from '@ngrx/store';
import { coursesSelector, CoursesState } from '../../store/states';
import {LoadSuccess} from "../../store/actions/course.actions";


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
    private loaderService: LoaderService,
    private storeCourse: Store<CoursesState>
  ) {}

  public ngOnInit(): void {
    this.coursesListService.getCourseListItems(stateEnum.DEFAULT_PAGE.toString(), stateEnum.DEFAULT_START_COUNT.toString(), stateEnum.DEFAULT_LOAD_COUNT.toString(), 'createDate').subscribe((res: CoursesListItem[]) => {
      //this.listItems = res;
      // this.hideLoader();
      //this.store.dispatch();
      console.log('res', res);
      this.storeCourse.dispatch(new LoadSuccess(res));
    });
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
    this.showLoader();
    this.storeCourse.select(coursesSelector).subscribe(res => {
      this.listItems = res.course.courses;  console.log('xxxxxxxxxxxxxxx', this.listItems);
      this.listItems = res.course.courses;
      console.log('xxxxxxxxxxxxxxx', this.listItems);
    });
  }

  onDeleteCourse(id: string): void {
    this.showLoader();
    this.sub = this.coursesListService.deleteItem(id).subscribe(() => {
      this.init();
      this.hideLoader();
    });
  }

  public onSearch(queryString: string): void {
    this.showLoader();
    this.sub = this.coursesListService.searchTextWithParams(queryString, this.pageData.startPage.toString(), this.pageData.countToStart.toString(), this.toString(), this.createDate).subscribe((res: CoursesListItem[]) => {
        this.listItems = res;
        this.hideLoader();
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  onLoadMore(): void {
    this.showLoader();
    if (this.listItems.length > 0 && this.listItems.length <= 10) {
      this.sub = this.coursesListService.getCourseListItems(this.pageData.nextPage.toString(), this.pageData.countToStart.toString(), this.pageData.countToLoad.toString(), this.createDate).subscribe((res: CoursesListItem[]) => {
          this.text = 'LOAD MORE...';
          this.pageData.nextPage++;
          this.listItems = res;
          this.hideLoader();
        },
        (error: HttpErrorResponse) => console.log(error));
    }
    if (this.listItems.length <= 9) {
      this.sub =  this.coursesListService.getCourseListItems(this.pageData.startPage.toString(), this.pageData.countToStart.toString(), this.pageData.countToLoad.toString(), this.createDate).subscribe((res: CoursesListItem[]) => {
          this.listItems = res;
          this.text = 'We\'re backed to the first page...';
          this.pageData.nextPage = stateEnum.NEXT_PAGE;
          this.hideLoader();
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

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
