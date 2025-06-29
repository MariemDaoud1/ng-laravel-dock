import { Routes } from '@angular/router';
import { Index } from './post/index';
import { Create } from './post/create/create';
import { Edit } from './post/edit/edit';
import { Show } from './post/show/show';
import { Auth } from './auth/auth';
import { LoginComponent } from './auth/login/login';

export const routes: Routes = [
    { path : 'post',component: Index},
    { path : 'post/create',component: Create},
    { path : 'post/:postId/edit',component: Edit},
    { path : 'post/:postId', component: Show },
    { path : 'login', component : LoginComponent},
];
