import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from '../modules/core/guard/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', component: LoginComponent },
      { path: 'reviews', component: AllReviewsComponent, canActivate: [AuthGuard] },
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
