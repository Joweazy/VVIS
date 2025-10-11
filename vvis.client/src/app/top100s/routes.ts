import { Route } from '@angular/router';
import { Top100sComponent } from './top100s.component';

export default [
  {
    path: '',
    component: Top100sComponent,
    children: [
      { path: '', redirectTo: '2024', pathMatch: 'full' },
      { path: '2024', data: { year: '2024' },
        loadComponent: () => import('../vvis/yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },
      { path: '2023', data: { year: '2023' }, 
        loadComponent: () => import('../vvis/yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },     
      { path: '2022', data: { year: '2022' },
        loadComponent: () => import('../vvis/yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },
      { path: '2021', data: { year: '2021' },
        loadComponent: () => import('../vvis/yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },
      { path: '2020', data: { year: '2020' },
        loadComponent: () => import('../vvis/yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },  
      { path: 'alltime2021', data: { year: 'alltime2021' },
        loadComponent: () => import('../vvis/yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },   
    ],
  },
] as Route[];
