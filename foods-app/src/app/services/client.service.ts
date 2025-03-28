// client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealResponseDTO } from '../models/meal.dto';
import { OrderCreateDTO, OrderResponseDTO } from '../models/ordre.dto';
import { FeedbackCreateDTO } from '../models/feedback.dto';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly baseUrl = 'http://localhost:5000/api/client/menu';

  constructor(private http: HttpClient) {}

  getAvailableMeals(): Observable<MealResponseDTO[]> {
    return this.http.get<MealResponseDTO[]>(this.baseUrl);
  }

  placeOrder(mealId: number): Observable<OrderResponseDTO> {
    const dto: OrderCreateDTO = { mealId };
    return this.http.post<OrderResponseDTO>(`${this.baseUrl}/orders`, dto);
  }

  getClientOrders(): Observable<OrderResponseDTO[]> {
    return this.http.get<OrderResponseDTO[]>(`${this.baseUrl}/orders`);
  }

  submitFeedback(message: string): Observable<void> {
    const dto: FeedbackCreateDTO = { message };
    return this.http.post<void>(`${this.baseUrl}/feedback`, dto);
  }
}