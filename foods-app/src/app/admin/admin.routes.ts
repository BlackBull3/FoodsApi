import { Routes } from '@angular/router';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { MealsComponent } from './meals/meals.component';
import { MealFormComponent } from './meals/meal-form/meal-form.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RoleGuard } from '../guards/role.guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminProfileComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Admin' },
    children: [
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'meals', component: MealsComponent },
      { path: 'meals/create', component: MealFormComponent },
      { path: 'meals/edit/:id', component: MealFormComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: '', redirectTo: 'ingredients', pathMatch: 'full' }
    ]
  }
];