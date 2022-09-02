import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Goal } from 'src/models/goal.model';
import { User } from 'src/models/user.model';
import { GoalService } from 'src/services/goal.service';
import { UserCredentialsService } from 'src/services/user-credentials.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css'],
  providers: [MessageService]
})
export class CreateGoalComponent implements OnInit {

  username: string = '';
  password: string = '';
  currentUser: User = new User('','','',new Date());
  goal: Goal = new Goal(0,'','','',new Date(),0,0,'',this.currentUser);

  constructor(private userService: UserService, private userCredsService: UserCredentialsService, private goalService: GoalService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getCredentials();
  }

  getCredentials(): void {
    this.currentUser = this.userCredsService.getUser();
    this.username = this.userCredsService.getUsername();
    this.password = this.userCredsService.getPassword();
  }

  createGoal(goal: Goal) {
    //Must set user and userId fields for the POST request.
    goal.user = this.currentUser;
    goal.userId = this.currentUser.email;
    this.goalService.createGoal(goal, this.username, this.password).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Goal Added', detail: 'Goal successfully added! Returning to home page...'});
        this.returnToHomepage();
      },
      error: (error) => {
        //Some error has occurred, or the username/password is incorrect somehow.
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error has occurred. Logging out...'});
        setTimeout(() => this.logout(), 2000);//Wait 2 seconds for user to see the message, then log out.
      }
    });
  }

  returnToHomepage() {
    this.router.navigate(['/home']);
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

}
