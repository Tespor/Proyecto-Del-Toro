import { Routes } from '@angular/router';
import { AuthGuardGuard } from './core/guard/auth-guard.guard';
import { AuthenticatedGuardGuard } from './core/guard/authenticated-guard.guard';
import HomeComponent from './pages/home/home.component';
import { AllComponent } from './pages/all/all.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component'),
        canActivate: [AuthenticatedGuardGuard]
    },
    {
        path: 'home',
        //loadComponent: () => import('./home/home.component'),
        component: HomeComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: 'students',
        component: AllComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: 'teachers',
        component: AllComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: 'courses',
        component: AllComponent,
        canActivate: [AuthGuardGuard]
    }
];
