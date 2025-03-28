// chef-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefService } from '../services/chef.service';
import { OrderResponseDTO, UpdateStatusDTO } from '../models/ordre.dto';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ProfileNavComponent } from '../components/profile-nav/profile-nav.component';

@Component({
  selector: 'app-chef-profile',
  standalone: true,
  imports: [ProfileNavComponent,
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './chef-profile.component.html',
  styleUrls: ['./chef-profile.component.css']
})
export class ChefProfileComponent implements OnInit {
  orders: OrderResponseDTO[] = [];
  isLoading = false;
  readonly statusOptions = ['Pending', 'In Progress', 'Ready', 'Completed'];

  constructor(private chefService: ChefService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.isLoading = true;
    this.chefService.getActiveOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.orders = [];
      }
    });
  }

  onStatusChange(order: OrderResponseDTO): void {
    const dto: UpdateStatusDTO = { status: order.status };
    this.chefService.updateOrderStatus(order.id, dto).subscribe({
      error: () => {
        // Revert the status change if update fails
        this.loadOrders();
      }
    });
  }
}