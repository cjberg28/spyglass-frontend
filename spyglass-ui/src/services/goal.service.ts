import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Goal } from 'src/models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  goalURL: string = environment.GOAL_URI;

  constructor(private http: HttpClient) { 

  }

  findAllGoals(username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.get<any>(`${this.goalURL}`, {headers: httpHeaders, observe: 'response'});
  }

  findByUser(email: string, username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.get<any>(`${this.goalURL}/user/${email}`, {headers: httpHeaders, observe: 'response'});
  }

  findById(id: number, username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.get<any>(`${this.goalURL}/${id}`, {headers: httpHeaders, observe: 'response'});
  }

  createGoal(goal: Goal, username: string, password: string): Observable<HttpResponse<Goal>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.post<Goal>(`${this.goalURL}`, goal, {headers: httpHeaders, observe: 'response'});
  }

  updateGoal(goal: Goal, username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.put<Goal>(`${this.goalURL}`, goal, {headers: httpHeaders, observe: 'response'});
  }

  deleteGoal(id: number, username: string, password: string): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders();//Immutable!
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.delete<any>(`${this.goalURL}/${id}`, {headers: httpHeaders, observe: 'response'});
  }
}
