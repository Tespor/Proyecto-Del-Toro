import { Routes } from '@angular/router';
import { AuthGuardGuard } from './core/guard/auth-guard.guard';
import { AuthenticatedGuardGuard } from './core/guard/authenticated-guard.guard';
import { StudentsComponent } from './pages/students/students.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { CoursComponent } from './pages/cours/cours.component';
import HomeComponent from './pages/home/home.component';

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
        component: StudentsComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: 'teachers',
        component: TeachersComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: 'courses',
        component: CoursComponent,
        canActivate: [AuthGuardGuard]
    }
];
