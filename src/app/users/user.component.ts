import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  isEditing = false;
  currentUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      
      if (this.isEditing && this.currentUserId) {
        this.userService.updateUser({ ...userData, id: this.currentUserId });
      } else {
        this.userService.addUser(userData);
      }

      this.resetForm();
    }
  }

  editUser(user: User): void {
    this.isEditing = true;
    this.currentUserId = user.id;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id);
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.isEditing = false;
    this.currentUserId = null;
  }
} 