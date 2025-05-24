import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor() {
    // Initialize with some sample data
    this.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
    ];
    this.usersSubject.next(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: Omit<User, 'id'>): void {
    const newUser = {
      ...user,
      id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1
    };
    this.users.push(newUser);
    this.usersSubject.next(this.users);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.usersSubject.next(this.users);
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    this.usersSubject.next(this.users);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
} 