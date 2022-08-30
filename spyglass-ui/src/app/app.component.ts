import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spyglass-ui';

  // userService: UserService;

  constructor(private userService: UserService) {}

  getAllUsers(): void {
    this.userService.findByEmail('cberg@skillstorm.com').subscribe(data => {console.log(data)});
  }
}
