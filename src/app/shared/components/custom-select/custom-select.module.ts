import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CustomSelectComponent } from './custom-select.component';

const COMPONENTS = [
  CustomSelectComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class CustomSelectModule {
}
