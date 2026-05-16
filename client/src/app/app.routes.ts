import { Routes } from '@angular/router';
import { ListProducts } from '../features/products/list-products/list-products';
import { Login } from '../features/auth/login/login';

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
    component: Login,
  },
];
