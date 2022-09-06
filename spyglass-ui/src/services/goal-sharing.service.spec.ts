import { TestBed } from '@angular/core/testing';
import { Goal } from 'src/models/goal.model';
import { User } from 'src/models/user.model';

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

  it ('should set the goal when setGoal() is called', () => {
    let newGoal: Goal = new Goal(1,'Name','Description','imageSrc',new Date('2000/01/28'),12,1,'',new User('','','',new Date('2001/01/28')));
    service.setGoal(newGoal);
    expect(service.getGoal()).toBe(newGoal);
  });
});
