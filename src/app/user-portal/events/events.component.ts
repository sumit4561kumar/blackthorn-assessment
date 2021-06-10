import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RequestFactory } from '@app/shared';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  eventsList = [];

  constructor(
    title: Title,
    private api: RequestFactory,
    private cd: ChangeDetectorRef
  ) {
    title.setTitle('Events List');
    this.api.eventsList().subscribe(
      (res) => {
        this.eventsList = res;
        this.cd.detectChanges();
      },
      (err) => console.error(err)
    );
  }

  ngOnInit(): void {
  }
}
