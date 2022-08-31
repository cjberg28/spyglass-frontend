import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { buffer, observable, Observable, catchError, throwError } from 'rxjs';
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

  //Basic authentication requires sending a header <K,V> pair called <'Authorization', 'Basic ' + Base64 encoding of username:password>.
  //See https://mixedanalytics.com/knowledge-base/api-connector-encode-credentials-to-base-64/ for more info.
  //See https://stackoverflow.com/questions/50694913/angular-6-httpclient-passing-basic-auth-in-httpoptions for info on how headers are passed.
  findByEmail(email: string, username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.get<any>(`${this.userURL}/${email}`, {headers: httpHeaders, observe: 'response'});
  }

  findAllUsers(username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.get<any>(`${this.userURL}`, {headers: httpHeaders, observe: 'response'});
  }

  createUser(user: User, username: string, password: string): Observable<HttpResponse<User>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.post<User>(`${this.userURL}`, user, {headers: httpHeaders, observe: 'response'});
  }

  updateUser(user: User, username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.put<User>(`${this.userURL}`, user, {headers: httpHeaders, observe: 'response'});
  }

  deleteUser(email: string, username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.delete<any>(`${this.userURL}/${email}`, {headers: httpHeaders, observe: 'response'});
  }
}
