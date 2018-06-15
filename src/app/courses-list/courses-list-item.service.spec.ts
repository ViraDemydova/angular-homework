import { TestBed, inject } from '@angular/core/testing';

import { CoursesListItemService } from './courses-list-item.service';

describe('CoursesListItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesListItemService]
    });
  });

  it('should be created', inject([CoursesListItemService], (service: CoursesListItemService) => {
    expect(service).toBeTruthy();
  }));
});
