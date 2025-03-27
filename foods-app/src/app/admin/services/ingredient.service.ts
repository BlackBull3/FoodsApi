// ingredient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { IngredientCreateDTO, IngredientResponseDTO, IngredientUpdateDTO } from '../../models/ingredient.dto';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'http://localhost:5000/api/admin/laboratory/ingredients';

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<IngredientResponseDTO[]> {
    return this.http.get<IngredientResponseDTO[]>(this.apiUrl).pipe(
      map(data => data ?? []), // Convert null to empty array
      catchError(() => of([])) // Return empty array on error
    );
  }

  createIngredient(dto: IngredientCreateDTO): Observable<IngredientResponseDTO> {
    return this.http.post<IngredientResponseDTO>(this.apiUrl, dto);
  }

  updateIngredient(dto: IngredientUpdateDTO): Observable<void> {
    if (!dto.id) {
      throw new Error('ID is required for update');
    }
    return this.http.put<void>(`${this.apiUrl}/${dto.id}`, dto);
  }

  deleteIngredient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}