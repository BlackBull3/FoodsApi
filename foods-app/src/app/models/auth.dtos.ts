// Request DTOs
export interface RegisterRequest {
    email: string;
    password: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface ForgotPasswordRequest {
    email: string;
  }
  
  export interface ResetPasswordRequest {
    email: string;
    code: string;
    newPassword: string;
  }
  
  export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
  }
  
  export interface VerifyEmailRequest {
    email: string;
    code: string;
  }
  
  // Response DTOs
  export interface VerificationResponse {
    email: string;
    verificationCode: string;
  }
  
  export interface ResetPasswordResponse {
    email: string;
    resetCode: string;
  }
  export interface ValidateTokenResponseDTO {
    isValid: boolean;
    email: string;
    role: string;
    expiresAt?: Date;  // Optional: token expiration time
  }
  export interface LoginResponse {
    token: string;
    email: string;
  }
  
  // Error Response
  export interface ApiErrorResponse {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
  }