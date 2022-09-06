import { Goal } from './goal.model';
import { User } from './user.model';

describe('Goal', () => {
  it('should create an instance', () => {
    expect(new Goal(0,'','','',new Date(),0,0,'',new User('','','',new Date()))).toBeTruthy();
  });
});
