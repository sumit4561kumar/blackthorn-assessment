import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/shared';
import { EventComponent } from './event.component';
import { EventRegisterComponent } from './register/register.component';
import { EventTicketsComponent } from './ticket-details/ticket-details.component';
import { EventRoutingModule } from './event-routing.module';

const COMPONENTS = [
  EventComponent,
  EventRegisterComponent,
  EventTicketsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule,
    NgbModule,
    EventRoutingModule,
    SharedModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class EventModule {}
