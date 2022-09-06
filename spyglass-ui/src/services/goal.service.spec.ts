import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Goal } from 'src/models/goal.model';
import { User } from 'src/models/user.model';

import { GoalService } from './goal.service';

describe('GoalService', () => {
  let service: GoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(GoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Is this the correct way to test these?
  //This more or less checks if the functions are called, not if the data being returned matches expected output.
  it ('should find all goals', () => {
    let http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.callThrough();
    let result = service.findAllGoals(environment.TEST_USERNAME, environment.TEST_PASSWORD);
    expect(http.get).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it ('should find by ID', () => {
    let http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.callThrough();
    let result = service.findById(1, environment.TEST_USERNAME, environment.TEST_PASSWORD);
    expect(http.get).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it ('should create a goal', () => {
    let http = TestBed.inject(HttpClient);
    spyOn(http, 'post').and.callThrough();
    let goal: Goal = new Goal(0,'Test Name','Test Description','images.com/example',new Date('2033/12/21'),20,10,environment.TEST_USERNAME,new User(environment.TEST_USERNAME,'Cameron','Berg',new Date('2000/01/28')));
    let result = service.createGoal(goal, environment.TEST_USERNAME, environment.TEST_PASSWORD);
    expect(http.post).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it ('should update a goal', () => {
    let http = TestBed.inject(HttpClient);
    spyOn(http, 'put').and.callThrough();
    let goal: Goal = new Goal(1,'Test Name','Test Description','images.com/example',new Date('2033/12/21'),20,10,environment.TEST_USERNAME,new User(environment.TEST_USERNAME,'Cameron','Berg',new Date('2000/01/28')));
    let result = service.updateGoal(goal,environment.TEST_USERNAME,environment.TEST_PASSWORD);
    expect(http.put).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it ('should delete a goal', () => {
    let http = TestBed.inject(HttpClient);
    spyOn(http, 'delete').and.callThrough();
    let result = service.deleteGoal(1,environment.TEST_USERNAME,environment.TEST_PASSWORD);
    expect(http.delete).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });
});
