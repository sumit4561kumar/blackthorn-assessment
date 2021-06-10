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
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  RequestFactory,
  BaseComponent,
  ConfirmModalComponent,
} from '@app/shared';

@Component({
  selector: 'app-event-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTicketsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  eventId: number;
  eventInfo;
  data = {
    freeTicket: 0,
    vipTicket: 0,
  };
  freeTicket = 0;
  vipTicket = 0;
  freeTicketQuantity;
  vipTicketQuantity;
  form: FormGroup = new FormGroup({});

  @Input() hideMeta = false;
  @HostBinding('class.no-content') noContent = false;

  formErrorMapping: { [key: string]: { [key: string]: string } } = {
    firstNameErrors: {
      required: 'first name is required',
    },
    lastNameErrors: {
      required: 'last name is required',
    },
    emailErrors: {
      required: 'email is required',
    },
    phoneErrors: {
      required: 'phone is required',
    },
    companyErrors: {
      required: 'company is required',
    },
  };
  private instance: NgbModalRef;

  constructor(
    private api: RequestFactory,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private cd: ChangeDetectorRef,
    title: Title
  ) {
    super();
    title.setTitle('Event Register - Tickets Details');
    this.data = this.router.getCurrentNavigation()?.extras?.state?.data;
    this.eventId = this.route.snapshot.params.eventId;
  }

  ngOnInit(): void {
    if (!this.data) {
      void this.router.navigate([
        '/user-portal/event/',
        this.eventId,
        'register',
      ]);
    } else {
      this.freeTicket = +this.data.freeTicket;
      this.vipTicket = +this.data.vipTicket;
      this.freeTicketQuantity = Array.from(Array(this.freeTicket).keys());
      this.vipTicketQuantity = Array.from(Array(this.vipTicket).keys());
    }

    this.api.eventInfo(this.eventId).subscribe(
      (res) => {
        this.eventInfo = res;
        console.log(this.eventInfo, this.data);
        this.cd.detectChanges();
      },
      (err) => console.error(err)
    );

    for (let i = 0; i < this.freeTicket; i++) {
      const formGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
      });
      this.form.addControl('freeTicket_' + i, formGroup);
    }
    for (let i = 0; i < this.vipTicket; i++) {
      const formGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
      });
      this.form.addControl('vipTicket_' + i, formGroup);
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.instance = this.modal.open(ConfirmModalComponent, {
      windowClass: 'modal-small',
      backdrop: 'static',
    });
    const modalComponent = this.instance.componentInstance;
    modalComponent.header = 'Tickets Booked';
    modalComponent.text = '<span class="body-text">Congratulations tickets are booked successfully</span>';
    modalComponent.okButtonText = 'Back to Events';
    modalComponent.showCancelButton = false;

    this.instance.result
      .then(() => {
        void this.router.navigate(['/user-portal', 'events']);
      })
      .catch(() => {});
  }

  backEvent(): void {
    void this.router.navigate([
      '/user-portal/event/',
      this.eventId,
      'register',
    ]);
  }
}
