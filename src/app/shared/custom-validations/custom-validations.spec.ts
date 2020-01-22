import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validations';

describe('CustomValidators', () => {

  describe('isWordsValid', () => {
    it('should return null if the value is a valid words', () => {
      expect(CustomValidators.isWordsValid(new FormControl('test'))).toEqual(null);
      expect(CustomValidators.isWordsValid(new FormControl('test 123'))).toEqual(null);
      expect(CustomValidators.isWordsValid(new FormControl('test-123'))).toEqual(null);
    });

    it('should return false if the value is a invalid words', () => {
      expect(CustomValidators.isWordsValid(new FormControl('fuck u')).toString()).toBe({ isWordsNotValid: true }.toString());
    });
  });
});
