import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { buffer, observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user.model';

// declare const Buffer: Buffer;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // buffer = require('buffer/').Buffer;

  userURL: string = environment.USER_URI;

  constructor(private http: HttpClient) { 

  }

  findByEmail(email: string, username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    // httpHeaders = httpHeaders.append('Authorization', 'Basic Y2JlcmdAc2tpbGxzdG9ybS5jb206Y2Jlcmc=');

    let options = {
      headers: httpHeaders,
      observe: 'response'
    }
    
    return this.http.get<any>(`http://${this.userURL}/${email}`, {headers: httpHeaders, observe: 'response'});
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
