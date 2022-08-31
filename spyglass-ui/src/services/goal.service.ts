import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Goal } from 'src/models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  goalURL: string = environment.GOAL_URI;// localhost:8080/goals

  constructor(private http: HttpClient) { 

  }

  findAllGoals(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`http://${username}:${password}%40${this.goalURL}`, {observe: 'response'});
  }

  findByUser(email: string, username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`http://${username}:${password}%40${this.goalURL}/user/${email}`, {observe: 'response'});
  }

  findById(id: number, username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`http://${username}:${password}%40${this.goalURL}/${id}`, {observe: 'response'});
  }

  createGoal(goal: Goal, username: string, password: string): Observable<HttpResponse<Goal>> {
    return this.http.post<Goal>(`http://${username}:${password}%40${this.goalURL}`, goal, {observe: 'response'});
  }

  updateGoal(goal: Goal, username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.put<Goal>(`http://${username}:${password}%40${this.goalURL}`, goal, {observe: 'response'});
  }

  deleteGoal(id: number, username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`http://${username}:${password}%40${this.goalURL}/${id}`, {observe: 'response'});
  }
}
