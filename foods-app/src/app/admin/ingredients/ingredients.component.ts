// ingredients.component.ts
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IngredientService } from '../services/ingredient.service';
import { IngredientResponseDTO } from '../../models/ingredient.dto';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, AsyncPipe],
  template: `
    <div class="header">
      <h2>Ingredients Management</h2>
      <button mat-raised-button color="primary" (click)="openForm()">
        <mat-icon>add</mat-icon> Add Ingredient
      </button>
    </div>

    <mat-table [dataSource]="ingredients$ | async || []">
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
  `]
})
export class IngredientsComponent {
  private service = inject(IngredientService);
  private dialog = inject(MatDialog);
  
  displayedColumns = ['name', 'category', 'actions'];
  ingredients$ = this.service.getIngredients();


  openForm(ingredient?: IngredientResponseDTO) {
    const dialogRef = this.dialog.open(IngredientFormComponent, {
      width: '400px',
      data: ingredient
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ingredients$ = this.service.getIngredients();
    });
  }

  delete(id: number) {
    if (confirm('Delete this ingredient?')) {
      this.service.deleteIngredient(id).subscribe(() => {
        this.ingredients$ = this.service.getIngredients();
      });
    }
  }
}