import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component'
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import {TooltipModule} from 'primeng/tooltip';
import {ProgressBarModule} from 'primeng/progressbar';
import {CardModule} from 'primeng/card';
import { ViewGoalComponent } from './view-goal/view-goal.component';
import {ChartModule} from 'primeng/chart';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import { CreateGoalComponent } from './create-goal/create-goal.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    ViewGoalComponent,
    CreateGoalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    TooltipModule,
    ProgressBarModule,
    CardModule,
    ChartModule,
    DialogModule,
    InputNumberModule,
    CalendarModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
