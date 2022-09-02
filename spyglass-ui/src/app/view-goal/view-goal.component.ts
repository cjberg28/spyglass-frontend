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

  isEditingGoal: boolean = false;
  isDeletingGoal: boolean = false;

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
    if (this.goal.currentAmount >= this.goal.targetAmount) {
      this.goalData = {
        labels: ['Amount Invested'],
        datasets: [
          {
            data: [this.goal.currentAmount],
            backgroundColor: ["#36A2EB"],
            hoverBackgroundColor: ["#36A2EB"]
          }
        ]
      };
    } else {
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

  //Exists as a workaround to allow rounding in the HTML page.
  round(num: number): string {
    return num.toFixed(2);
  }

  updateGoal(goal: Goal) {
    this.goalService.updateGoal(goal, this.username, this.password).subscribe({
      next: (data) => {
        if (data.body == false) {//Somehow, the update failed.
          this.messageService.add({severity: 'error', summary: 'Update Failed', detail: 'Please ensure all fields are correct and try again.'});
        } else {
          this.isEditingGoal = false;
          this.setGoalData(goal);//Refreshes the chart to show latest updates.
          this.messageService.add({severity: 'success', summary: 'Update Successful', detail: 'Goal updated successfully.'});
        }
      },
      error: (error) => {
        //Some error has occurred, or the username/password is incorrect somehow.
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error has occurred. Logging out...'});
        setTimeout(() => this.logout(), 2000);//Wait 2 seconds for user to see the message, then log out.
      }
    });
  }

  cancel() {
    this.getGoal();//Refresh to original values in case any information was changed in the modal.
    this.isEditingGoal = false;
    this.ngOnInit();//Necessary to refresh fields showing on the page back to original values.
  }

  returnToHomepage() {
    this.router.navigate(['/home']);
  }

  openUpdateModal() {
    this.getGoal();
    this.isEditingGoal = true;
  }

  openDeleteModal() {
    this.isDeletingGoal = true;
  }

  deleteGoal(id: number) {
    this.goalService.deleteGoal(id, this.username, this.password).subscribe({
      next: (data) => {
        console.log(data);
        if (data.body == false) {//Somehow, the delete failed.
          this.messageService.add({severity: 'error', summary: 'Delete Failed', detail: 'Please try again.'});
        } else {
          this.messageService.add({severity: 'success', summary: 'Delete Successful', detail: 'Returning to home page...'});
          this.isDeletingGoal = false;
          setTimeout(() => this.returnToHomepage(), 2000);//Wait 2 seconds for user to see the message, then return to the homepage.
        }
      },
      error: (error) => {
        //Some error has occurred, or the username/password is incorrect somehow.
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error has occurred. Logging out...'});
        setTimeout(() => this.logout(), 2000);//Wait 2 seconds for user to see the message, then log out.
      }
    });
  }
}
