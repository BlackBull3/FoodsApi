// ingredient-form.component.ts
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { IngredientCreateDTO, IngredientResponseDTO, IngredientUpdateDTO } from '../../../models/ingredient.dto';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Edit' : 'Create' }} Ingredient</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="ingredient.name" required>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Category</mat-label>
        <input matInput [(ngModel)]="ingredient.category" required>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class IngredientFormComponent {
  private service = inject(IngredientService);
  private dialogRef = inject(MatDialogRef<IngredientFormComponent>);

  ingredient: IngredientCreateDTO | IngredientUpdateDTO;
  isEditMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IngredientResponseDTO | null) {
    this.isEditMode = !!data;
    this.ingredient = data ? { ...data } : { name: '', category: '' };
  }

  onSave() {
    if (this.isEditMode) {
      this.service.updateIngredient(this.ingredient as IngredientUpdateDTO)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.service.createIngredient(this.ingredient as IngredientCreateDTO)
        .subscribe(() => this.dialogRef.close(true));
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}