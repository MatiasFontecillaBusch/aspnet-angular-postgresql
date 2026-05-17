import { Routes } from '@angular/router';
import { ListProducts } from '../features/products/list-products/list-products';
import { Login } from '../features/auth/login/login';
import { NotFound } from '../features/not-found/not-found';
import { authenticationGuard } from '../core/guards/authentication-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'products',
    component: ListProducts,
    runGuardsAndResolvers: 'always',
    canActivate: [authenticationGuard],
  },
  {
    path: '**',
    component: NotFound,
  },
];
