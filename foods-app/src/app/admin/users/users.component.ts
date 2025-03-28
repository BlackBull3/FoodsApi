import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RegisterRequest } from '../../models/auth.dtos';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['email', 'role', 'verified', 'actions'];
  dataSource = new MatTableDataSource<any>();
  loading = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Add to displayedColumns

// Update loadUsers to handle verification status
loadUsers(): void {
  this.loading = true;
  this.userService.getUsers().subscribe({
    next: (users) => {
      this.dataSource.data = users.map(user => ({
        ...user,
        verified: user.isVerified ? 'Yes' : 'No'
      }));
      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading users:', err);
      this.loading = false;
    }
  });
}

  openAddChefDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: { role: 'Chef' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.registerChef(result);
    });
  }

  openAddAdminDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: { role: 'Admin' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.registerAdmin(result);
    });
  }

  registerChef(userData: RegisterRequest): void {
    this.loading = true;
    this.userService.registerChef(userData).subscribe({
      next: () => {
        this.snackBar.open('Chef registered successfully', 'Close', { duration: 3000 });
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error registering chef:', err);
        this.snackBar.open('Failed to register chef', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  registerAdmin(userData: RegisterRequest): void {
    this.loading = true;
    this.userService.registerAdmin(userData).subscribe({
      next: () => {
        this.snackBar.open('Admin registered successfully', 'Close', { duration: 3000 });
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error registering admin:', err);
        this.snackBar.open('Failed to register admin', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  deleteUser(email: string): void {
    if (confirm(`Are you sure you want to delete user ${email}?`)) {
      this.loading = true;
      this.userService.deleteUser(email).subscribe({
        next: (response: string) => {
          this.snackBar.open(response, 'Close', { duration: 3000 });
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          const errorMessage = err.error?.message || err.message || 'Failed to delete user';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }
}