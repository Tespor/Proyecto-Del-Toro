import { Routes } from '@angular/router';
import { AuthGuardGuard } from './core/guard/auth-guard.guard';
import { AuthenticatedGuardGuard } from './core/guard/authenticated-guard.guard';
import TablaProductComponent from './tabla.product/tabla.product.component';

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
        loadComponent: () => import('./home/home.component'),
        canActivate: [AuthGuardGuard]
    },
    {   path: 'tabla',
        component: TablaProductComponent,
        canActivate: [AuthGuardGuard] 
    }
];
