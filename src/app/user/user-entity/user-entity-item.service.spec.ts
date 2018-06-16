import { TestBed, inject } from '@angular/core/testing';

import { UserEntityItemService } from './user-entity-item.service';

describe('UserEntityItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEntityItemService]
    });
  });

  it('should be created', inject([UserEntityItemService], (service: UserEntityItemService) => {
    expect(service).toBeTruthy();
  }));
});
