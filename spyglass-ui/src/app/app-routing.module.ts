import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGoalComponent } from './create-goal/create-goal.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ViewGoalComponent } from './view-goal/view-goal.component';

const routes: Routes = [
  {// /login -> LoginComponent
    path: 'login',
    component: LoginComponent
  },
  {// /home -> HomepageComponent
    path: 'home',
    component: HomepageComponent
  },
  {// /view-goal -> ViewGoalComponent
    path: 'view-goal',
    component: ViewGoalComponent
  },
  {// /new-goal -> CreateGoalComponent
    path: 'new-goal',
    component: CreateGoalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
