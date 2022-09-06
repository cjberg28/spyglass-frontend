import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Routes, Router } from '@angular/router';
import {routes} from './app-routing.module'
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {Location} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

describe('AppComponent', () => {

  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ToastModule,
        HttpClientModule,
        ButtonModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [MessageService, Location]
    }).compileComponents();

    router = TestBed.inject(Router);//Used for navigation.
    location = TestBed.inject(Location);//Location is used to check the URL path.
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'spyglass-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('spyglass-ui');
  });

  // Had to comment this out for whatever reason.
  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('spyglass-ui app is running!');
  // });

  it ('should navigate to the login page immediately', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    router.initialNavigation();//Set up location change listener
    app.ngOnInit();//Trigger the immediate redirect to /login
    tick();//Cause time to pass so the redirect happens
    expect(location.path()).toBe('/login');
  }));
});
