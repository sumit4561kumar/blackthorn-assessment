import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/shared';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';

const COMPONENTS = [EventsComponent];

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule,
    NgbModule,
    EventsRoutingModule,
    SharedModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class EventsModule {}
