import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MealService } from '../services/meal.service';
import { MealResponseDTO } from '../../models/meal.dto';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [MatTableModule, MatChipsModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
  <div class="meals-container">
    <div class="header">
      <h2>Meals Management</h2>
      <button mat-raised-button color="primary" (click)="navigateToCreate()">
        <mat-icon>add</mat-icon> Add Meal
      </button>
    </div>

    <table mat-table [dataSource]="meals" class="mat-elevation-z8">
      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let meal">{{ meal.name }}</td>
      </ng-container>

      <!-- Ingredients Column -->
      <ng-container matColumnDef="ingredients">
        <th mat-header-cell *matHeaderCellDef>Ingredients</th>
        <td mat-cell *matCellDef="let meal">
          <mat-chip-listbox>
            <mat-chip *ngFor="let ingredient of meal.ingredients">
              {{ ingredient.name }}
            </mat-chip>
          </mat-chip-listbox>
        </td>
      </ng-container>

      <!-- Actions Column -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let meal">
          <button mat-icon-button (click)="navigateToEdit(meal.id)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button (click)="delete(meal.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    </div>
  `,
  styleUrl :'meals.component.css'
})
export class MealsComponent {
  private service = inject(MealService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  displayedColumns: string[] = ['name', 'ingredients', 'actions'];
  meals: MealResponseDTO[] = [];

  ngOnInit() {
    this.loadMeals();
  }

  loadMeals() {
    this.service.getMeals().subscribe({
      next: (data) => this.meals = data,
      error: () => this.meals = []
    });
  }

  navigateToCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  navigateToEdit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  delete(id: number) {
    if (confirm('Delete this meal?')) {
      this.service.deleteMeal(id).subscribe(() => {
        this.loadMeals();
      });
    }
  }
}