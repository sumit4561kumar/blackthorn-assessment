import { FormGroup, ValidationErrors } from '@angular/forms';

export const setFormErrors = (form: FormGroup, errors: ValidationErrors) => {
  const controlNames = Object.keys(form.controls);
  controlNames.forEach(controlName => {
    if (errors[controlName]) {
      form.get(controlName).setErrors({ serverError: errors[controlName] });
    }
  });
};
