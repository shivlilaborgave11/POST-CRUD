import { Routes } from '@angular/router';
import { PostDashboard } from './shared/components/post-dashboard/post-dashboard';
import { Home } from './shared/components/home/home';


export const routes: Routes = [
    {
        path: '',
        component: Home
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
