import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { IngredientService } from '../services/ingredient.service';
import { IngredientResponseDTO } from '../../models/ingredient.dto';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
  <div class="ingredients-container">
    <div class="header">
      <h2>Ingredients Management</h2>
      <button mat-raised-button color="primary" (click)="openForm()">
        <mat-icon>add</mat-icon> Add Ingredient
      </button>
    </div>

    <table mat-table [dataSource]="ingredients" class="mat-elevation-z8">
      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let ingredient">{{ ingredient.name }}</td>
      </ng-container>

      <!-- Category Column -->
      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef>Category</th>
        <td mat-cell *matCellDef="let ingredient">{{ ingredient.category }}</td>
      </ng-container>

      <!-- Actions Column -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let ingredient">
          <button mat-icon-button (click)="openForm(ingredient)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button (click)="delete(ingredient.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    </div>
  `,
  styleUrl: 'ingredients.component.css'
})
export class IngredientsComponent {
  private service = inject(IngredientService);
  private dialog = inject(MatDialog);
  
  displayedColumns: string[] = ['name', 'category', 'actions'];
  ingredients: IngredientResponseDTO[] = [];

  ngOnInit() {
    this.loadIngredients();
  }

  loadIngredients() {
    this.service.getIngredients().subscribe({
      next: (data) => this.ingredients = data,
      error: () => this.ingredients = []
    });
  }

  openForm(ingredient?: IngredientResponseDTO) {
    const dialogRef = this.dialog.open(IngredientFormComponent, {
      width: '400px',
      data: ingredient
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadIngredients();
    });
  }

  delete(id: number) {
    if (confirm('Delete this ingredient?')) {
      this.service.deleteIngredient(id).subscribe(() => {
        this.loadIngredients();
      });
    }
  }
}