import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ContentChild,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { InputDirective } from './directives/input/input.directive';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent extends BaseComponent implements AfterContentInit {
  @Input() classNames: string;

  get isTouched() {
    return this.input?.ngControl.control.touched;
  }

  get isInvalid() {
    return this.input?.ngControl.control.invalid;
  }

  @ContentChild(InputDirective) input: InputDirective;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterContentInit() {
    this.input.ngControl.control.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.cdr.markForCheck());
  }
}
