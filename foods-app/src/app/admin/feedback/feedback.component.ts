// feedback.component.ts
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackResponseDTO } from '../../models/feedback.dto';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatListModule, 
    AsyncPipe, 
    DatePipe,
    MatDividerModule,
    MatIconModule
  ],
  template: `
    <div class="feedback-container">
      <h2 class="feedback-header">Customer Feedback</h2>
      
      <mat-list class="feedback-list">
        <mat-divider></mat-divider>
        @for (item of feedback$ | async; track item.createdAt) {
          <mat-list-item class="feedback-item">
            <mat-card class="feedback-card">
              <mat-card-header>
                <mat-icon mat-card-avatar>feedback</mat-icon>
                <mat-card-subtitle>
                  {{ item.createdAt | date:'mediumDate' }}
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content class="feedback-message">
                {{ item.message }}
              </mat-card-content>
            </mat-card>
          </mat-list-item>
          <mat-divider></mat-divider>
        } @empty {
          <div class="empty-state">
            <mat-icon>sentiment_dissatisfied</mat-icon>
            <p>No feedback yet</p>
          </div>
        }
      </mat-list>
    </div>
  `,
  styles: [`
    .feedback-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }

    .feedback-header {
      color: #3f51b5;
      font-weight: 500;
      margin-bottom: 16px;
      text-align: center;
    }

    .feedback-list {
      padding: 0;
      background: transparent;
    }

    .feedback-item {
      height: auto !important;
      margin: 12px 0;
    }

    .feedback-card {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .feedback-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .feedback-message {
      padding: 0 16px 16px;
      white-space: pre-wrap;
      line-height: 1.6;
      font-size: 15px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      color: rgba(0, 0, 0, 0.54);
      text-align: center;
    }

    .empty-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    mat-divider {
      margin: 8px 0;
    }

    mat-card-header {
      padding: 16px 16px 0;
    }

    mat-card-subtitle {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class FeedbackComponent {
  private service = inject(FeedbackService);
  feedback$ = this.service.getFeedback();
}