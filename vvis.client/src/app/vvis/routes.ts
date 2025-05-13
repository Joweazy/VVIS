import { Route } from '@angular/router';
import { VvisComponent } from './vvis.component';
import { VvisHomeComponent } from './home/vvis-home.component';

export default [
  {
    path: '',
    component: VvisComponent,
    children: [
      { path: 'home', component: VvisHomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '2024', data: { year: '2024' },
        loadComponent: () => import('./yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },
      { path: '2023', data: { year: '2023' }, 
        loadComponent: () => import('./yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },     
      { path: '2022', data: { year: '2022' },
        loadComponent: () => import('./yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },
      { path: '2021', data: { year: '2021' },
        loadComponent: () => import('./yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },
      { path: '2020', data: { year: '2020' },
        loadComponent: () => import('./yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },  
      { path: 'alltime2021', data: { year: 'alltime2021' },
        loadComponent: () => import('./yearly-top-100/yearly-top-100.component').then(mod => mod.YearlyTop100Component) },   
    ],
  },
] as Route[];
