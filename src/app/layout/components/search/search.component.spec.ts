import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {FormsModule} from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have <button> with "Search"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('button');
    expect(p.textContent).toEqual(' Search');
  });
});
