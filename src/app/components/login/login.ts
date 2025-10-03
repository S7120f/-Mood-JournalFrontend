import { Component } from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';



@Component({
  selector: 'app-login',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = "";
  password = "";
  regiUsername = "";
  regiPassword = "";

  constructor(private authService: AuthService) {}

  get currentUser() {
    return this.authService.currentUser();
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: user => console.log('logged in a', user.username),
      error: () => alert('Wrong username or password')
    });
  }

  onRegister() {
    this.authService.register(this.regiUsername, this.regiPassword).subscribe({
      next: user => alert(`User ${user.username} skapad!`),
      error: err => alert(err.error)

    })
  }

  logout() {
    this.authService.logout();
  }

}
