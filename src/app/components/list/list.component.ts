import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter, skipWhile, map, distinctUntilChanged } from 'rxjs/operators';
import * as Filter from 'bad-words';

import { validations } from '../../shared/custom-validations/validations';
import { validationMessages } from '../../shared/custom-validations/validation-messages';

@Component({
  selector: 'giphy-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  searchQueryControlSubscription: Subscription;
  searchQuery: FormControl;

  wordFilter;
  validationMessages = validationMessages;

  constructor() { }

  ngOnInit() {
    this.searchQuery = new FormControl('', [validations.validSearch]);
    this.wordFilter = new Filter({ placeHolder: ' '});
    this.searchQueryControlSubscription = this.searchQuery.valueChanges.pipe(
      debounceTime(1000),
      map((value) => {
        return this.wordFilter.clean(value).trim();
      }),
      filter(value => value !== ''),
      skipWhile(value => value === '')
    ).subscribe((query) => {
      if (this.searchQuery.valid) {
        console.log('non profane words', query.trim());
        // make api call create service and all
        // (api.giphy.com/v1/gifs/search?q=puppies&limit=10&offset=0) (header: api_key CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6)
      }
    });
  }

  getErrorMessage() {
    return this.searchQuery.hasError('required') ? this.validationMessages.required() :
      this.searchQuery.hasError('isWordsNotValid') ? this.validationMessages.isWordsValid() : '';
  }

  ngOnDestroy() {
    if (this.searchQueryControlSubscription) {
      this.searchQueryControlSubscription.unsubscribe();
    }
  }

}
