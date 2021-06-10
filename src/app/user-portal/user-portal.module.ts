import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { UserPortalRoutingModule } from './user-portal-routing.module';
import { UserPortalComponent } from './user-portal.component';

const COMPONENTS = [UserPortalComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    UserPortalRoutingModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class UserPortalModule {}
