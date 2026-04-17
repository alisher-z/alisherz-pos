import { Routes } from '@angular/router';
import { partyRoutes } from './components/parties/party.route';
import { productRoutes } from './components/product/product.route';
import { publicRoutes } from './components/public/public.route';
import { repairRoutes } from './components/repair/repair.route';
import { serviceRoutes } from './components/service/service.route';
import { Home } from './home/home';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'party', children: partyRoutes },
    { path: 'product', children: productRoutes },
    { path: 'public', children: publicRoutes },
    { path: 'repair', children: repairRoutes },
    { path: 'service', children: serviceRoutes }
];
