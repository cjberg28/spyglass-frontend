import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'spyglass-ui';

  constructor(private router: Router) {}

  ngOnInit() {
    //Upon launching the application, immediately redirect the user to the login page.
    this.router.navigate(['/login']);
  }
}
