import {Component} from '@angular/core';
import {Header} from './header/header';
import {Login} from './components/login/login';
import {NgIf} from '@angular/common';
import { AuthService} from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [Header, Login, NgIf],
  styleUrl: './app.css',
  templateUrl: 'app.html'
})
export class App {

  constructor(public authService: AuthService) {}

}
