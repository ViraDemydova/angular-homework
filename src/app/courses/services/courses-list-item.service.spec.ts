import { TestBed, inject } from '@angular/core/testing';

import { CoursesListItemService } from './courses-list-item.service';

describe('CoursesListItemService', () => {
  let service: CoursesListItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesListItemService]
    });
  });

  xit('should use CoursesListItemService', () => {
    service = TestBed.get(CoursesListItemService);
    expect(service.getCourseListItems()).toBe( [
      {
        id: 1,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 2,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 3,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 4,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 5,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      }
    ]
    );
  });
});
