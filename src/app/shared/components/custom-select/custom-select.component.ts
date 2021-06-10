import {
  AfterViewInit,
  Attribute,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CustomSelectComponent, multi: true }],
})
export class CustomSelectComponent implements ControlValueAccessor, AfterViewInit {
  @Input() items: any[];
  @Input() translateLabels = false;
  @Input() bindLabel = 'label';
  @Input() bindValue = 'value';
  @Input() formControl?: FormControl;
  @Input() selectFirst?: boolean;
  @Input() placeholder?: string;
  @Input() notFoundText?: string;
  @Input() selectStyles?: any;
  @Input() disabled?: boolean;
  @Input() searchable = false;
  @Input() clearable = false;
  @Input() multiple = false;
  @Input() showMultiple = false;
  @Input() closeOnSelect = true;
  @Input() hideSelected = false;
  @Input() isAppendTo = true;
  @Input() dropdownName?: string;
  @Input() optionTemplate?: TemplateRef<any>;
  @Input() labelTemplate?: TemplateRef<any>;
  @Input() serverErrors = null;
  @Input() submitted = false;
  @Input() errorMapping = {
    required: 'This field is required',
    noEmptyString: 'This field is required',
    email: 'Email is not valid',
    emailTaken: 'Email already taken',
    pattern: 'This field is not valid',
    numeric: 'Value must be number',
    lessThan: 'Value is too high',
  };
  @Input() required = false;
  @Input() label = null;
  @Input() name = null;
  @Input() optional = false;

  @Output() selectChange: EventEmitter<any> = new EventEmitter();
  @Output() selectClose: EventEmitter<any> = new EventEmitter();
  @ViewChild('ngSelect') NgSelect: NgSelectComponent;

  public get isInvalid(): boolean {
    return (
      (this.formControl.invalid && (this.formControl.touched || this.submitted === true)) ||
      this.serverErrors
    );
  }

  public get actualErrors(): string {
    if (this.serverErrors) {
      if (Array.isArray(this.serverErrors)) {
        return this.serverErrors[0];
      } else {
        return this.serverErrors;
      }
    }
    for (const error in this.formControl.errors) {
      if (this.errorMapping[error]) {
        return this.errorMapping[error];
      }
    }
    return '';
  }

  public appendTo = null;

  private _value: any = null;

  constructor(@Attribute('class') public classes: string, private cd: ChangeDetectorRef) {}

  @HostListener('focus')
  public onHostFocus(): void {
    this.NgSelect.focus();
  }

  ngAfterViewInit() {
    if (this.items != null && this.selectFirst && this.items.length > 0) {
      this.NgSelect.select(this.NgSelect.itemsList.items[0]);
    }
    if (this.classes) {
      this.NgSelect.classes += ` ${this.classes}`;
    }
    this.cd.detectChanges();
  }

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  onSelectChange(event) {
    this.selectChange.next(event);
  }

  onSelectClose($event) {
    this.selectClose.next($event);
  }

  writeValue(value: any) {
    if (value === null) {
      this.select(value);
    }
    this._value = value;
    this.onChange(value);
  }

  open(): void {
    this.NgSelect.open();
  }

  onChange = _ => {};
  onTouched = () => {};

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private select(newOption): void {
    if (this.NgSelect && this.NgSelect.itemsList) {
      const item = this.NgSelect.itemsList.findItem(newOption);
      if (item) {
        setTimeout(() => {
          this.NgSelect.select(this.NgSelect.itemsList.items[item.index]);
        }, 0);
      }
    }
  }
}
