import { Routes } from '@angular/router';
import { Index } from './post/index';
import { Create } from './post/create/create';
import { Edit } from './post/edit/edit';
import { Show } from './post/show/show';
import { Auth } from './auth/auth'; // Make sure this path is correct
import { LoginComponent } from './auth/login/login';
import { LandingComponent } from './auth/landing/landing';
import { AuthGuard } from './guards/auth-guard';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [
    { path : 'post',component: Index , canActivate: [AuthGuard] },
    { path : 'post/create',component: Create,canActivate: [AuthGuard]},
    { path : 'post/:postId/edit',component: Edit,canActivate: [AuthGuard]},
    { path : 'post/:postId', component: Show ,canActivate: [AuthGuard]},
    { path : 'register', component: RegisterComponent},
    { path : 'login', component : LoginComponent},
    { path: '', component:LandingComponent }

];
