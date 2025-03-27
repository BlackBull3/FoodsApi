// feedback.component.ts
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackResponseDTO } from '../../models/feedback.dto';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, AsyncPipe, DatePipe],
  template: `
    <h2>Customer Feedback</h2>
    <mat-list>
      <mat-list-item *ngFor="let item of feedback$ | async">
        <mat-card>
          <mat-card-content>{{ item.message }}</mat-card-content>
          <mat-card-footer>
            <small>{{ item.createdAt | date:'medium' }}</small>
          </mat-card-footer>
        </mat-card>
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    mat-card {
      margin: 8px 0;
      width: 100%;
    }
    mat-card-footer {
      padding: 16px;
      color: rgba(0, 0, 0, 0.6);
    }
  `]
})
export class FeedbackComponent {
  private service = inject(FeedbackService);
  feedback$ = this.service.getFeedback();
}