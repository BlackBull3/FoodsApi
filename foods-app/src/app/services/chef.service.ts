// services/chef.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResponseDTO, UpdateStatusDTO } from '../models/ordre.dto';

@Injectable({ providedIn: 'root' })
export class ChefService {
  private readonly baseUrl = 'http://localhost:5000/api/chef/orders';

  constructor(private http: HttpClient) {}

  getActiveOrders(): Observable<OrderResponseDTO[]> {
    return this.http.get<OrderResponseDTO[]>(this.baseUrl);
  }

  updateOrderStatus(orderId: number, status: UpdateStatusDTO): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${orderId}/status`, status);
  }
}