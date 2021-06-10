import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { RequestFactory, BaseComponent } from '@app/shared';

@Component({
  selector: 'app-event-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventRegisterComponent extends BaseComponent implements OnDestroy {
  eventId: number;
  eventInfo;
  freeTickets = [];
  vipTickets = [];

  form = new FormGroup({
    freeTicket: new FormControl('0', [Validators.required]),
    vipTicket: new FormControl('0', [Validators.required]),
  });

  get freeTicketQuantity(): AbstractControl {
    return this.form?.get('freeTicket');
  }

  get vipTicketQuantity(): AbstractControl {
    return this.form?.get('vipTicket');
  }

  constructor(
    private api: RequestFactory,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    title: Title
  ) {
    super();
    title.setTitle('Event Register');
    this.eventId = this.route.snapshot.params.eventId;
    this.api.eventInfo(this.eventId).subscribe(
      (res) => {
        this.eventInfo = res;

        this.freeTickets = [
          ...Array.from(Array(this.eventInfo.quantity + 1).keys()).map(
            (count) => ({
              value: count.toString(),
              label: count.toString(),
            })
          ),
        ];

        this.vipTickets = [
          ...Array.from(Array(this.eventInfo.quantity + 1).keys()).map(
            (count) => ({
              value: count.toString(),
              label: count.toString(),
            })
          ),
        ];
        this.cd.detectChanges();
      },
      (err) => console.error(err)
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  addTicketDetails(event): void {
    console.log(this.form.value);
    void this.router.navigate(
      ['/user-portal/event/', this.eventId, 'register', 'ticket-details'],
      { state: { data: this.form.value } }
    );
  }

  backEvent(): void {
    void this.router.navigate(['/user-portal/event/', this.eventId]);
  }
}
