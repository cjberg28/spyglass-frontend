import { HttpClient, HttpClientModule } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { UserService } from './user.service';
import {User} from '../models/user.model'

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  const mockData = {
    'status': 'success',
    'data': [
      {
        'email': 'cberg@skillstorm.com',
        'firstName': 'Cameron',
        'lastName': 'Berg',
        'dateOfBirth': '2000-01-28'
      },
      {
        'email': 'jtester@gmail.com',
        'firstName': 'Jonathan',
        'lastName': 'Tester',
        'dateOfBirth': '2000-01-01'
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //https://jenijoe.medium.com/unit-testing-angular-crud-service-with-jasmine-7e40e7c8aa74
  //Is this the correct way to test these?
  //This more or less lets you determine whatever gets returned back from the HTTP request, so you can code it to be whatever you want.
  it ('should find all users', () => {
    service.findAllUsers(environment.TEST_USERNAME,environment.TEST_PASSWORD).subscribe(response => {
      expect(response.body).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(environment.USER_URI);//Expect a single request was made to the given URL.
    expect(req.request.method).toBe('GET');//Expect that request to be a GET request.
    req.flush(mockData);//Resolve the request by returning the body, specified as a parameter.
  });

  it('should find a user by email', () => {
    service.findByEmail('jtester@gmail.com', environment.TEST_USERNAME, environment.TEST_PASSWORD).subscribe(response => {
      expect(response.body).toEqual(mockData.data[1]);
    });
    const req = httpTestingController.expectOne(`${environment.USER_URI}/jtester@gmail.com`);//Expect a single request was made to the given URL.
    expect(req.request.method).toBe('GET');//Expect that request to be a GET request.
    req.flush(mockData.data[1]);//Resolve the request by returning the body, specified as a parameter.
  });

  //Switching back to the originals. Not sure if these are correct.
  it('should update a user', () => {
    let http = TestBed.inject(HttpClient);
    spyOn(http, 'put').and.callThrough();
    let user: User = new User('jtester@gmail.com','Johnny','Tester',new Date());
    let result = service.updateUser(user,environment.TEST_USERNAME,environment.TEST_PASSWORD);
    expect(http.put).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it('should create a new user', () => {
    let http = TestBed.inject(HttpClient);
    spyOn(http, 'post').and.callThrough();
    let user: User = new User('jtester@gmail.com','Johnny','Tester',new Date());
    let result = service.createUser(user,environment.TEST_USERNAME,environment.TEST_PASSWORD);
    expect(http.post).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it('should delete a user', () => {
    let http = TestBed.inject(HttpClient);
    spyOn(http, 'delete').and.callThrough();
    let result = service.deleteUser('jtester@gmail.com',environment.TEST_USERNAME,environment.TEST_PASSWORD);
    expect(http.delete).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });
});
