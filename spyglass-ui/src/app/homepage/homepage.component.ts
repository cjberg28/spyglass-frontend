import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { GoalService } from 'src/services/goal.service';
import { UserCredentialsService } from 'src/services/user-credentials.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  currentUser?: User;

  username?: string;

  password?: string;

  constructor(private userService: UserService, private goalService: GoalService, private userCredsService: UserCredentialsService, private router: Router) { }

  ngOnInit(): void {
    //Grab the currentUser, username, and password variables from the service (accessed by the login page)
    this.getCredentials();
  }

  getCredentials(): void {
    this.currentUser = this.userCredsService.getUser();
    this.username = this.userCredsService.getUsername();
    this.password = this.userCredsService.getPassword();
  }

}
