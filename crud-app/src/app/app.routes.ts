import { Routes } from '@angular/router';
import { Index } from './post/index';
import { Create } from './post/create/create';

export const routes: Routes = [
    { path : '',component: Index},
    { path : 'create',component: Create},
];
