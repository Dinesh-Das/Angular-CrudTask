import { User } from './user-data';
//import { Details } from './ProductDetails';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserFetch } from './user-fetch';

export class UserData implements InMemoryDbService {
  createDb() {
    const users: User[] = [];
    const user: UserFetch[] = [];

    return { users, user };
  }
}
