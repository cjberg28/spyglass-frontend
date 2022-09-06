import { Component, OnInit } from '@angular/core';
import { GoalService } from 'src/services/goal.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import {MessageService} from 'primeng/api';
import { UserCredentialsService } from 'src/services/user-credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  currentUser?: User;

  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private messageService: MessageService, private userCredsService: UserCredentialsService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.findByEmail(this.username, this.username, this.password).subscribe({
      next: (data) => {
        this.currentUser = new User(data.body.email, data.body.firstName, data.body.lastName, data.body.dateOfBirth);
        //Send currentUser, username, and password through a service so that the homepage can access it.
        this.userCredsService.setUser(this.currentUser);
        this.userCredsService.setUsername(this.username);
        this.userCredsService.setPassword(this.password);
        this.clearInputFields();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.clearInputFields();
        this.messageService.add({key: 'rootToast', severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials. Please try again.'});
      }
    });
  }

  clearInputFields(): void {
    this.username = '';
    this.password = '';
  }

  //Not implemented yet
  createAccount(username: string, password: string) {
    this.messageService.add({key: 'rootToast', severity: 'info', summary: 'No Content', detail: 'Check back soon!'});
  }

}
