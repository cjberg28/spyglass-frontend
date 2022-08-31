import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoalService } from 'src/services/goal.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private goalService: GoalService, private router: Router) { }

  ngOnInit(): void {
  }

  getAllUsers(): void {
    this.userService.findByEmail('cberg@skillstorm.com', environment.TEST_USERNAME, environment.TEST_PASSWORD).subscribe({
      next: (data) => { console.log(data); },//data is an HttpResponse
      error: (error) => { console.log(error.error) }//error is an HttpErrorResponse
    });
    this.goalService.findByUser('cberg@skillstorm.com', environment.TEST_USERNAME, environment.TEST_PASSWORD).subscribe({
      next: (data) => { console.log(data); },//data is an HttpResponse
      error: (error) => { console.log(error.error) }//error is an HttpErrorResponse
    });
  }

}
