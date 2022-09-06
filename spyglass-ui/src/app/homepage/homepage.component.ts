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
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: []
})
export class HomepageComponent implements OnInit {

  currentUser: User = new User('','','',new Date());

  username: string = '';

  password: string = '';

  totalProgress: number = 0;

  goals: Goal[] = [];

  constructor(private userService: UserService, private goalService: GoalService, private userCredsService: UserCredentialsService, private messageService: MessageService,
              private goalSharingService: GoalSharingService, private router: Router) { }

  ngOnInit(): void {
    //Grab the currentUser, username, and password variables from the service (accessed by the login page)
    this.getCredentials();
    this.getGoals(this.currentUser.email, this.username, this.password);
    // this.calculateProgress();//Placing this here is too fast for the subscribe in getGoals() to run.
  }

  getCredentials(): void {
    this.currentUser = this.userCredsService.getUser();
    this.username = this.userCredsService.getUsername();
    this.password = this.userCredsService.getPassword();
  }

  getGoals(email: string, username: string, password: string): void {
    this.goalService.findByUser(email, username, password).subscribe({
      next: (data) => {
        this.goals = data.body;
        this.calculateProgress();
      },
      error: (error) => {
        //Some error has occurred, or the username/password is incorrect somehow.
        this.messageService.add({key: 'rootToast', severity: 'error', summary: 'Error', detail: 'An error has occurred. Logging out...'});
        setTimeout(() => this.logout(), 2000);//Wait 2 seconds for user to see the message, then log out.
      }
    });
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

  //Exists as a workaround to allow rounding in the HTML page.
  round(num: number): string {
    return num.toFixed(2);
  }

  viewGoal(goal: Goal) {
    //Pass the selected goal to the GoalSharingService, then navigate to that page.
    this.goalSharingService.setGoal(goal);
    this.router.navigate(['/view-goal']);
  }

  navigateToCreatePage() {
    this.router.navigate(['/new-goal']);
  }

  calculateProgress() {
    let currentSum: number = 0;
    let targetSum: number = 0;
    for (let goal of this.goals) {
      if (goal.currentAmount >= goal.targetAmount) {
        //This ensures that oversaving in one particular goal doesn't change the total percentage on the home page,
        //as technically you haven't made any additional progress towards your other goals.
        currentSum += goal.targetAmount;
      } else {
        currentSum += goal.currentAmount;
      }
      targetSum += goal.targetAmount;
    }
    this.totalProgress = (currentSum >= targetSum) ? 100 : (currentSum/targetSum)*100;
  }
}
