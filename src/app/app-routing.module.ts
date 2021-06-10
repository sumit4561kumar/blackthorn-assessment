import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-portal',
    loadChildren: () =>
      import('./user-portal/user-portal.module').then(
        (m) => m.UserPortalModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-portal',
  },
  {
    path: '**',
    redirectTo: 'user-portal',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
