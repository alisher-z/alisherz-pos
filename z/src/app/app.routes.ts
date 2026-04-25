import { Routes } from '@angular/router';
import { Home } from './home/home';
import { partyRoutes } from './parties/party.route';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'party',
    children: partyRoutes,
  },
];
