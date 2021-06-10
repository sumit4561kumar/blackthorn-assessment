import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPortalComponent } from './user-portal.component';

const routes: Routes = [
  {
    path: '',
    component: UserPortalComponent,
    children: [
      {
        path: 'events',
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'event/:eventId',
        loadChildren: () =>
          import('./event/event.module').then((m) => m.EventModule),
      },
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'events',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPortalRoutingModule {}
