import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { SupportComponent } from './pages/support/support.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard], // AuthGuard checks if user route is authorized to access
    data: { role: 'user' }, // Specifies that this route is for 'user' role
  },
  { path: 'support',
    component: SupportComponent,
    canActivate: [AuthGuard], // AuthGuard checks if support route is authorized to access
    data: { role: 'support' }, // Specifies that this route is for 'support' role
  }
];
