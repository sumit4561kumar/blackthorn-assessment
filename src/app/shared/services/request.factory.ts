import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiConfig } from '../helpers';
import { HttpService } from './http.service';

const catchAndThrow = (source$: Observable<any>) =>
  source$.pipe(catchError((error: any) => throwError(error || 'Server error')));

@Injectable()
export class RequestFactory {
  constructor(private service: HttpService) {}

  eventsList(): Observable<any> {
    return this.service.get(ApiConfig.base).pipe(catchAndThrow);
  }

  eventInfo(eventId): Observable<any> {
    return this.service.get(`${ApiConfig.base}/${eventId}`).pipe(catchAndThrow);
  }
}
