import {Injectable, signal} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';


export interface User {
  id: string,
  username: string
}


@Injectable({providedIn: "root"})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {
    this.loadUserFromStorage(); // read from storage in start

    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this.currentUser.set(JSON.parse(saved));
    }
  }




  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(user =>  {
          this.currentUser.set(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }

  register(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, { username, password})
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');

  }

  private loadUserFromStorage() {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }
}
