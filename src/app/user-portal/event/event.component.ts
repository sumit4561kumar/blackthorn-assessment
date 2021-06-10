import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { RequestFactory, BaseComponent } from '@app/shared';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent extends BaseComponent implements OnInit, OnDestroy {
  eventId: number;
  eventInfo;

  constructor(
    private api: RequestFactory,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router,
    title: Title
  ) {
    super();
    title.setTitle('Event');
    this.eventId = this.route.snapshot.params.eventId;
    this.api.eventInfo(this.eventId).subscribe(
      (res) => {
        this.eventInfo = res;
        this.cd.detectChanges();
      },
      (err) => console.error(err)
    );
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  register(): void {
    void this.router.navigate([
      '/user-portal/event/',
      this.eventId,
      'register',
    ]);
  }

  backEvent(): void {
    void this.router.navigate(['/user-portal/events/']);
  }
}
