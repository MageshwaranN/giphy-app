import { FormControl } from '@angular/forms';
import * as Filter from 'bad-words';

export class CustomValidators {

  static isWordsValid(control: FormControl): { [key: string]: boolean } {
    const wordFilter = new Filter();
    if (control.value && wordFilter.isProfane(control.value)) {
      return { isWordsNotValid: true };
    } else {
      return null;
    }
  }
}
