import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
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

  findByEmail(email: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.userURL}/${email}`, {observe: 'response'});
  }

  findAllUsers(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.userURL, {observe: 'response'});
  }

  createUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.userURL, user, {observe: 'response'});
  }

  updateUser(user: User): Observable<HttpResponse<any>> {
    return this.http.put<User>(this.userURL, user, {observe: 'response'});
  }

  deleteUser(email: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.userURL}/${email}`, {observe: 'response'});
  }
}
