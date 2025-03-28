// client-menu.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../services/client.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MealResponseDTO } from '../models/meal.dto';
import { OrderResponseDTO } from '../models/ordre.dto';

@Component({
  selector: 'app-client-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.css']
})
export class ClientMenuComponent implements OnInit {
  private clientService = inject(ClientService);
  private snackBar = inject(MatSnackBar);

  activeTab: 'menu' | 'orders' | 'feedback' = 'menu';
  meals: MealResponseDTO[] = [];
  orders: OrderResponseDTO[] = [];
  feedbackMessage = '';
  isLoading = false;
  isLoadingOrders = false;

  ngOnInit(): void {
    this.loadMenu();
    this.loadOrders();
  }

  private loadMenu(): void {
    this.isLoading = true;
    this.clientService.getAvailableMeals().subscribe({
      next: (meals) => {
        this.meals = meals;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.showError('Failed to load menu');
      }
    });
  }

  loadOrders(): void {
    this.isLoadingOrders = true;
    this.clientService.getClientOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoadingOrders = false;
      },
      error: () => {
        this.isLoadingOrders = false;
        // Show error to user
      }
    });
  }

  placeOrder(mealId: number): void {
    this.clientService.placeOrder(mealId).subscribe({
      next: () => {
        this.loadOrders();
        this.showSuccess('Order placed successfully!');
      },
      error: () => this.showError('Failed to place order')
    });
  }

  submitFeedback(): void {
    if (!this.feedbackMessage.trim()) return;

    this.clientService.submitFeedback(this.feedbackMessage).subscribe({
      next: () => {
        this.feedbackMessage = '';
        this.showSuccess('Feedback submitted successfully!');
      },
      error: () => this.showError('Failed to submit feedback')
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { 
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { 
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}