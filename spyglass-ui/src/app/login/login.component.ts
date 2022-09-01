import { Component, OnInit } from '@angular/core';
import { GoalService } from 'src/services/goal.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  currentUser?: User;

  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private goalService: GoalService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.findByEmail(this.username, this.username, this.password).subscribe({
      next: (data) => {
        this.currentUser = new User(data.body.email, data.body.firstName, data.body.lastName, data.body.dateOfBirth);
        console.log(this.currentUser);
        this.clearInputFields();
        //TODO: Send currentUser, username, and password through a service so that the homepage can access it.
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.clearInputFields();
        this.messageService.add({severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials. Please try again.'});
      }
    });
  }

  clearInputFields(): void {
    this.username = '';
    this.password = '';
  }

  createAccount(username: string, password: string) {
    this.messageService.add({severity: 'info', summary: 'No Content', detail: 'Check back soon!'});
  }

}
