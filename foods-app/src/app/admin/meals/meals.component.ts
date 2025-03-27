// meals.component.ts
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MealService } from '../services/meal.service';
import { MealResponseDTO } from '../../models/meal.dto';
import { AsyncPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [MatTableModule, MatChipsModule, MatButtonModule, MatIconModule, AsyncPipe],
  template: `
    <div class="header">
      <h2>Meals Management</h2>
      <button mat-raised-button color="primary" (click)="navigateToCreate()">
        <mat-icon>add</mat-icon> Add Meal
      </button>
    </div>

    <mat-table [dataSource]="meals$ | async || []">
      <!-- Table columns remain the same -->
    </mat-table>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px;
    }
    mat-chip {
      margin: 2px;
    }
  `]
})
export class MealsComponent {
  private service = inject(MealService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  displayedColumns = ['name', 'ingredients', 'actions'];
  meals$ = this.service.getMeals();



  navigateToCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  navigateToEdit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  delete(id: number) {
    if (confirm('Delete this meal?')) {
      this.service.deleteMeal(id).subscribe(() => {
        this.meals$ = this.service.getMeals();
      });
    }
  }
}