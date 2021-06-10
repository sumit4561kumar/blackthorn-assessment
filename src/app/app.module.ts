import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBusyModule, BusyConfig } from 'ng-busy';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';

import { RequestFactory, SharedModule, HttpService } from '@app/shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const busyConf = (): BusyConfig =>
  new BusyConfig({
    backdrop: true,
    delay: 100,
    minDuration: 400,
  });

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgBusyModule,
    NgbModule,
    SharedModule.forRoot(),
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    RequestFactory,
    HttpService,
    {
      provide: BusyConfig,
      useFactory: busyConf,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
