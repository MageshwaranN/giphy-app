import { Validators } from '@angular/forms';
import { CustomValidators } from './custom-validations';

export const validations = {
  validSearch: Validators.compose([
    Validators.required,
    CustomValidators.isWordsValid
  ])
};
