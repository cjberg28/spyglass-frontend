import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { GoalService } from 'src/services/goal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spyglass-ui';

  // userService: UserService;

  constructor(private userService: UserService, private goalService: GoalService) {}

  getAllUsers(): void {
    this.userService.findByEmail('cberg@skillstorm.com', 'jchan@aol.com', 'jchan').subscribe({
      next: (data) => { console.log(data); },//data is an HttpResponse
      error: (error) => { console.log(error.error) }//error is an HttpErrorResponse
    });
    this.goalService.findByUser('cberg@skillstorm.com', 'jchan@aol.com', 'jchan').subscribe({
      next: (data) => { console.log(data); },//data is an HttpResponse
      error: (error) => { console.log(error.error) }//error is an HttpErrorResponse
    });
  }
}
