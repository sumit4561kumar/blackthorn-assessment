import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventComponent } from './event.component';
import { EventRegisterComponent } from './register/register.component';
import { EventTicketsComponent } from './ticket-details/ticket-details.component';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
  },
  {
    path: 'register',
    children: [
      {
        path: 'ticket-details',
        component: EventTicketsComponent,
      },
      {
        path: '',
        component: EventRegisterComponent,
      },
      {
        path: '**',
        component: EventRegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
