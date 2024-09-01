import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { SupportComponent } from './pages/support/support.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
  },
  { path: 'support',
    component: SupportComponent,
    canActivate: [AuthGuard],
    data: { role: 'support' },
  }
];
