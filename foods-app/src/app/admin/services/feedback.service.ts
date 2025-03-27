// feedback.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackResponseDTO } from '../../models/feedback.dto';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:5000/api/admin/laboratory/meals/feedback';

  constructor(private http: HttpClient) {}

  getFeedback(): Observable<FeedbackResponseDTO[]> {
    return this.http.get<FeedbackResponseDTO[]>(this.apiUrl);
  }
}