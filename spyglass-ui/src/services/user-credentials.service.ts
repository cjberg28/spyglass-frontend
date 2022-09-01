import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';


//This service exists to pass information between the login page and the homepage.
@Injectable({
  providedIn: 'root'
})
export class UserCredentialsService {

  private user: User = new User('','','',new Date());
  private username: string = '';
  private password: string = '';

  constructor() { }

  getUser(): User {
    return this.user;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  setUser(user: User): void {
    this.user = user;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  setPassword(password: string): void {
    this.password = password;
  }
}
