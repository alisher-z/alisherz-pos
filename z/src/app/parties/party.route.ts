import { Routes } from '@angular/router';
import { Customer } from './customer/customer';
import { CustomerList } from './customer/views/list/list';

export const partyRoutes: Routes = [
  {
    path: 'customer',
    component: Customer,
    children: [
      {
        path: 'list',
        component: CustomerList,
      },
    ],
  },
];
