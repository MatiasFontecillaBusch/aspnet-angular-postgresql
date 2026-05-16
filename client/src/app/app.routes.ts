import { Routes } from '@angular/router';
import { ListProducts } from '../features/products/list-products/list-products';
import { Login } from '../features/auth/login/login';
import { NotFound } from '../features/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'products',
    component: ListProducts,
  },
  {
    path: '**',
    component: NotFound,
  },
];
