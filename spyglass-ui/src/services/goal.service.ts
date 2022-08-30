import { HttpClient, HttpResponse } from '@angular/common/http';
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

  findAllGoals(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.goalURL, {observe: 'response'});
  }

  findByUser(email: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.goalURL}/user/${email}`, {observe: 'response'});
  }

  findById(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.goalURL}/${id}`, {observe: 'response'});
  }

  createGoal(goal: Goal): Observable<HttpResponse<Goal>> {
    return this.http.post<Goal>(this.goalURL, goal, {observe: 'response'});
  }

  updateGoal(goal: Goal): Observable<HttpResponse<any>> {
    return this.http.put<Goal>(this.goalURL, goal, {observe: 'response'});
  }

  deleteGoal(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.goalURL}/${id}`, {observe: 'response'});
  }
}
