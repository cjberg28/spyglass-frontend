import { TestBed } from '@angular/core/testing';

import { GoalSharingService } from './goal-sharing.service';

describe('GoalSharingService', () => {
  let service: GoalSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
