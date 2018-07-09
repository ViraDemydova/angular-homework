import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxComponent } from './toolbox.component';
import {SearchComponent} from '../search/search.component';
import {FormsModule} from '@angular/forms';

describe('ToolboxComponent', () => {
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolboxComponent,
        SearchComponent
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have <button> with "Add course"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const div = bannerElement.querySelector('div');
    expect(div.textContent).toEqual(' Add course');
  });
});
