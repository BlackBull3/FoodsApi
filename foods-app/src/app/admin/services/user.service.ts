import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../../models/auth.dtos';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/admin/auth';
  private emailApiUrl = 'http://localhost:3000/send-email';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

 // Update registerChef and registerAdmin methods
registerChef(userData: RegisterRequest): Observable<any> {
  return this.http.post(`${this.apiUrl}/register-chef`, userData).pipe(
    tap((response: any) => {
      // Send welcome email
      const subject = 'Your Chef Account Has Been Created';
      const text = `Welcome to our platform! Your chef account has been created.\n\nEmail: ${userData.email}`;
      this.sendEmail(userData.email, subject, text).subscribe();
    })
  );
}

registerAdmin(userData: RegisterRequest): Observable<any> {
  return this.http.post(`${this.apiUrl}/register-admin`, userData).pipe(
    tap((response: any) => {
      // Send welcome email
      const subject = 'Your Admin Account Has Been Created';
      const text = `Welcome to our platform! Your admin account has been created.\n\nEmail: ${userData.email}`;
      this.sendEmail(userData.email, subject, text).subscribe();
    })
  );
}

sendEmail(to: string, subject: string, text: string): Observable<void> {
  return this.http.post<void>(this.emailApiUrl, { to, subject, text });
}
deleteUser(email: string): Observable<string> {
  return this.http.delete(`${this.apiUrl}/users/${email}`, {
    responseType: 'text'
  });
}
}