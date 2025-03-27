import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  VerificationResponse,
  ForgotPasswordRequest,
  ResetPasswordResponse,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  ApiErrorResponse,
  ValidateTokenResponseDTO
} from '../models/auth.dtos';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private apiUrl = 'http://localhost:5000/api/admin/auth';
  private emailApiUrl = 'http://localhost:3000/send-email';

  constructor(private http: HttpClient) {}

  
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(`${this.apiUrl}/register`, request);
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(`${this.apiUrl}/forgot-password`, request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, request, { 
      responseType: 'text' as 'json' 
    });
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/change-password`, request, { 
      headers,
      responseType: 'text' as 'json'
    });
  }

  verifyEmail(request: VerifyEmailRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/verify-email`, request, { 
      responseType: 'text' as 'json' 
    });
  }

  resendVerificationCode(email: string): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(`${this.apiUrl}/resend-verification`, { email });
  }

  sendEmail(to: string, subject: string, text: string): Observable<void> {
    return this.http.post<void>(this.emailApiUrl, { to, subject, text });
  }

 validateToken(): Observable<ValidateTokenResponseDTO> {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return throwError(() => new Error('No token found'));
  }

  return this.http.get<ValidateTokenResponseDTO>(
    `${this.apiUrl}/validate-token`,
    {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
  ).pipe(
    catchError(error => {
      if (error.status === 401) {
        this.logout(); // Clear invalid token
      }
      return throwError(() => error);
    })
  );
}
// Add these methods to your existing AuthService
hasRole(requiredRole: string): Observable<boolean> {
  return this.validateToken().pipe(
    map(response => response.isValid && response.role === requiredRole)
  );
}

getUserRole(): Observable<string> {
  return this.validateToken().pipe(
    map(response => response.role)
  );
}
 

  logout() {
    localStorage.removeItem('token');
  }
  
}