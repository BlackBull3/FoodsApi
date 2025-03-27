// meal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { MealCreateDTO, MealResponseDTO, MealUpdateDTO } from '../../models/meal.dto';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'http://localhost:5000/api/admin/laboratory/meals';

  constructor(private http: HttpClient) {}

  getMeals(): Observable<MealResponseDTO[]> {
    return this.http.get<MealResponseDTO[]>(this.apiUrl).pipe(
      map(data => data ?? []), // Convert null to empty array
      catchError(() => of([])) // Return empty array on error
    );
  } 

  getMeal(id: number): Observable<MealResponseDTO> {
    return this.http.get<MealResponseDTO>(`${this.apiUrl}/${id}`);
  }

  createMeal(dto: MealCreateDTO): Observable<MealResponseDTO> {
    return this.http.post<MealResponseDTO>(this.apiUrl, dto);
  }

  updateMeal(dto: MealUpdateDTO): Observable<void> {
    if (!dto.id) {
      throw new Error('ID is required for update');
    }
    return this.http.put<void>(`${this.apiUrl}/${dto.id}`, dto);
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}