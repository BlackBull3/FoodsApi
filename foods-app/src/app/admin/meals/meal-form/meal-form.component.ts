// meal-form.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MealService } from '../../services/meal.service';
import { IngredientService } from '../../services/ingredient.service';
import { MealCreateDTO, MealResponseDTO, MealUpdateDTO } from '../../../models/meal.dto';
import { IngredientResponseDTO } from '../../../models/ingredient.dto';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-meal-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    AsyncPipe
  ],
  template: `
    <div class="form-container">
      <h2>{{ isEditMode ? 'Edit' : 'Create' }} Meal</h2>
      
      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="meal.name" required>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Ingredients</mat-label>
        <mat-select multiple [(ngModel)]="selectedIngredientIds">
          <mat-option *ngFor="let ingredient of ingredients$ | async" 
                     [value]="ingredient.id">
            {{ ingredient.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <div class="actions">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="onSave()">
          {{ isEditMode ? 'Update' : 'Create' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
  `]
})
export class MealFormComponent implements OnInit {
  private mealService = inject(MealService);
  private ingredientService = inject(IngredientService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  meal: MealCreateDTO | MealUpdateDTO = { name: '', ingredientIds: [] };
  selectedIngredientIds: number[] = [];
  ingredients$ = this.ingredientService.getIngredients();

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.mealService.getMeals().subscribe(meals => {
        const meal = meals.find(m => m.id === +id);
        if (meal) {
          this.meal = {
            id: meal.id,
            name: meal.name,
            ingredientIds: meal.ingredients.map(i => i.id)
          };
          this.selectedIngredientIds = [...this.meal.ingredientIds];
        }
      });
    }
  }

  onSave() {
    this.meal.ingredientIds = this.selectedIngredientIds;
    
    if (this.isEditMode) {
      this.mealService.updateMeal(this.meal as MealUpdateDTO)
        .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
    } else {
      this.mealService.createMeal(this.meal as MealCreateDTO)
        .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}