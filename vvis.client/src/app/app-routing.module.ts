import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'user', loadComponent: () => import('./user/user.component').then(mod => mod.UserComponent) },
      { path: 'vvis', loadChildren: () => import('./vvis/routes')},
      { path: 'stats', loadComponent: () => import('./stats/stats.component').then(mod => mod.StatsComponent) }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
