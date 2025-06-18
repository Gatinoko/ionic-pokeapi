import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: BottomNavComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./pages/favorites/favorites.module').then(
            (m) => m.FavoritesPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
