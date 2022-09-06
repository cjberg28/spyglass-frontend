import { TestBed } from '@angular/core/testing';
import { User } from 'src/models/user.model';
import { environment } from 'src/environments/environment';

import { UserCredentialsService } from './user-credentials.service';

describe('UserCredentialsService', () => {
  let service: UserCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should set the user when setUser() is called', () => {
    let newUser: User = new User('jtester@aol.com','Jonathan','Tester',new Date('2000/01/01'));
    service.setUser(newUser);
    expect(service.getUser()).toBe(newUser);
  });

  it ('should set the username when setUsername() is called', () => {
    let newUsername: string = 'jtester@skillstorm.com';
    service.setUsername(newUsername);
    expect(service.getUsername()).toBe(newUsername);
  });

  it ('should set the password when setPassword() is called', () => {
    service.setPassword(environment.TEST_PASSWORD);
    expect(service.getPassword()).toBe(environment.TEST_PASSWORD);
  });
});
