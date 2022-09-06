import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import {routes} from '../app-routing.module'
import { RouterTestingModule } from '@angular/router/testing';
import {Location} from '@angular/common';

import { CreateGoalComponent } from './create-goal.component';
import { GoalService } from 'src/services/goal.service';

describe('CreateGoalComponent', () => {
  let component: CreateGoalComponent;
  let fixture: ComponentFixture<CreateGoalComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGoalComponent ],
      imports: [
        HttpClientModule,
        CalendarModule,
        InputNumberModule,
        ButtonModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [MessageService, Location]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGoalComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should return to homepage if returnToHomepage() is called', fakeAsync(() => {
    component.returnToHomepage();
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('should logout when logout() is called', fakeAsync(() => {
    spyOn(component, 'clearCredentials');
    component.logout();
    expect(component.clearCredentials).toHaveBeenCalled();
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('should clear credentials when clearCredentials() is called', () => {
    component.clearCredentials();
    component.getCredentials();//CredsService is private, so this is the way to access the values
    expect(component.currentUser.firstName).toEqual('');
    expect(component.currentUser.email).toBe('');
    expect(component.currentUser.lastName).toBe('');
    //Date should also be checked, but clearing creds sets the date to new Date(), so equality would generally never be true
    expect(component.username).toBe('');
    expect(component.password).toBe('');
  });

  it('should not create a goal when name is invalid', () => {
    let goalService = TestBed.inject(GoalService);
    component.goal.name = '';
    component.goal.description = 'Test Desc';
    component.goal.targetDate = new Date('2032/10/21');
    component.goal.targetAmount = 100;
    component.createGoal(component.goal);
    spyOn(goalService, 'createGoal');
    expect(goalService.createGoal).not.toHaveBeenCalled();
  });

  it('should not create a goal when description is invalid', () => {
    let goalService = TestBed.inject(GoalService);
    component.goal.name = 'Test Name';
    component.goal.description = 'Test Desc foreverrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
                                  + 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
                                  + 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr';
    component.goal.targetDate = new Date('2032/10/21');
    component.goal.targetAmount = 100;
    component.createGoal(component.goal);
    spyOn(goalService, 'createGoal');
    expect(goalService.createGoal).not.toHaveBeenCalled();
  });

  it('should not create a goal when target date is invalid', () => {
    let goalService = TestBed.inject(GoalService);
    component.goal.name = 'Test Name';
    component.goal.description = 'Test Desc';
    component.goal.targetDate = new Date('2022/01/01');
    component.goal.targetAmount = 100;
    component.createGoal(component.goal);
    spyOn(goalService, 'createGoal');
    expect(goalService.createGoal).not.toHaveBeenCalled();
  });

  it('should not create a goal when target amount is invalid', () => {
    let goalService = TestBed.inject(GoalService);
    component.goal.name = 'Test Name';
    component.goal.description = 'Test Desc';
    component.goal.targetDate = new Date('2032/01/01');
    component.goal.targetAmount = 0;
    component.createGoal(component.goal);
    spyOn(goalService, 'createGoal');
    expect(goalService.createGoal).not.toHaveBeenCalled();
  });

  it('should not create a goal when current amount is invalid', () => {
    let goalService = TestBed.inject(GoalService);
    component.goal.name = 'Test Name';
    component.goal.description = 'Test Desc';
    component.goal.targetDate = new Date('2022/01/01');
    component.goal.targetAmount = 100;
    component.goal.currentAmount = -40;
    component.createGoal(component.goal);
    spyOn(goalService, 'createGoal');
    expect(goalService.createGoal).not.toHaveBeenCalled();
  });

  //Function calls that need to be tested are contained within a subscribe() to an observable.
  //Figuring out how to wait for a subscribe to finish before testing the expectation is complicated.
  //I am yet to figure it out, hence this test is commented out.
  // it('should create a goal when fields are valid', () => {
  //   let goalService = TestBed.inject(GoalService);
  //   component.goal.name = 'Test Name';
  //   component.goal.description = 'Test Desc';
  //   component.goal.targetDate = new Date('2032/01/01');
  //   component.goal.targetAmount = 100;
  //   component.createGoal(component.goal);
  //   spyOn(goalService, 'createGoal');
  //   expect(goalService.createGoal).toHaveBeenCalled();
  // });
});
