import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { GoalService } from 'src/services/goal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spyglass-ui';

  constructor(private userService: UserService, private goalService: GoalService) {}

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
