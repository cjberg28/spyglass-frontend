import { Injectable } from '@angular/core';
import { Goal } from 'src/models/goal.model';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GoalSharingService {

  private goal: Goal = new Goal(0,'','','',new Date(),0,0,'',new User('','','',new Date()));

  constructor() { }

  getGoal(): Goal {
    return this.goal;
  }

  setGoal(goal: Goal) {
    this.goal = goal;
  }
}
