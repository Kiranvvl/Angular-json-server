import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:3000/users';

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.url}`, user);
  }
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
