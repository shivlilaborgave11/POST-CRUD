import { Routes } from '@angular/router';
import { PostDashboard } from './shared/components/post-dashboard/post-dashboard';
import { Home } from './shared/components/home/home';
import { Navbar } from './shared/components/navbar/navbar';

export const routes: Routes = [
    {
        path: '',
        component: Navbar
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'post',
        component: PostDashboard
    }
];
