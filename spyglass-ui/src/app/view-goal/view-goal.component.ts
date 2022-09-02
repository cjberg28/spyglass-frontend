import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Goal } from 'src/models/goal.model';
import { User } from 'src/models/user.model';
import { GoalSharingService } from 'src/services/goal-sharing.service';
import { GoalService } from 'src/services/goal.service';
import { UserCredentialsService } from 'src/services/user-credentials.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-view-goal',
  templateUrl: './view-goal.component.html',
  styleUrls: ['./view-goal.component.css'],
  providers: [MessageService]
})
export class ViewGoalComponent implements OnInit {

  goal: Goal = new Goal(0,'','','',new Date(),0,0,'',new User('','','',new Date()));
  currentUser: User = new User('','','',new Date());
  username: string = '';
  password: string = '';

  goalData: any;

  constructor(private userService: UserService, private goalService: GoalService, private goalSharingService: GoalSharingService, private userCredsService: UserCredentialsService,
              private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    //Grab the currentUser, username, and password variables from the service (accessed by the login page)
    this.getCredentials();
    this.getGoal();
    this.setGoalData(this.goal);
  }

  getCredentials(): void {
    this.currentUser = this.userCredsService.getUser();
    this.username = this.userCredsService.getUsername();
    this.password = this.userCredsService.getPassword();
  }

  logout(): void {
    this.clearCredentials();
    this.router.navigate(['/login']);//NOTE: May need to clear backend authentication as well, if user can login again with any password after this.
  }

  clearCredentials(): void {
    this.userCredsService.setUser(new User('','','',new Date()));
    this.userCredsService.setUsername('');
    this.userCredsService.setPassword('');
  }

  getGoal(): void {
    this.goal = this.goalSharingService.getGoal();
  }

  setGoalData(goal: Goal) {
    this.goalData = {
      labels: ['Amount Invested', 'Amount Remaining'],
      datasets: [
        {
          data: [this.goal.currentAmount, this.goal.targetAmount - this.goal.currentAmount],
          backgroundColor: [
            "#36A2EB",
            "#808080"
          ],
          hoverBackgroundColor: [
            "#36A2EB",
            "#808080"
          ]
        }
      ]
    };
  }
}
