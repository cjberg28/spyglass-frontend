import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

import { ViewGoalComponent } from './view-goal.component';

describe('ViewGoalComponent', () => {
  let component: ViewGoalComponent;
  let fixture: ComponentFixture<ViewGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGoalComponent ],
      imports: [
        HttpClientModule,
        ChartModule,
        ButtonModule,
        DialogModule,
        CalendarModule,
        InputNumberModule,
        FormsModule
      ],
      providers: [MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
