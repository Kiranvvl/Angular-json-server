import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/formservice/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  userForm: FormGroup;
  userData: any[] = [];
  user: any = null;
  userId: number | null = null;

  ngOnInit(): void {}

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  formSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (data) => {
          console.log('new user added', data);
          this.getUsers();
          this.userForm.reset();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  getUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.userId = id;
        this.userForm.patchValue(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateUser(id: number) {
    if (this.userForm.valid) {
      this.userService.updateUser(id, this.userForm.value).subscribe({
        next: (data) => {
          console.log('user data updated', data);
          this.getUsers();
          this.userForm.reset(); // Reset form after updating user
          this.userId = null; // Reset userId after update
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (data) => {
        console.log('user data deleted', data);
        this.getUsers();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
