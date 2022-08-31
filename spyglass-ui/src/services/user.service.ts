import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string = environment.USER_URI;

  constructor(private http: HttpClient) { 

  }

  findByEmail(email: string, username: string, password: string): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    console.log(`http://${username}:${password}%40${this.userURL}/${email}`)
    return this.http.get<any>(`http://${this.userURL}/${email}`, {observe: 'response'});
  }

  findAllUsers(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`http://${username}:${password}%40${this.userURL}`, {observe: 'response'});
  }

  createUser(user: User, username: string, password: string): Observable<HttpResponse<User>> {
    return this.http.post<User>(`http://${username}:${password}%40${this.userURL}`, user, {observe: 'response'});
  }

  updateUser(user: User, username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.put<User>(`http://${username}:${password}%40${this.userURL}`, user, {observe: 'response'});
  }

  deleteUser(email: string, username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`http://${username}:${password}%40${this.userURL}/${email}`, {observe: 'response'});
  }
}
