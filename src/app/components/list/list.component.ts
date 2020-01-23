import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter, skipWhile, map } from 'rxjs/operators';
import * as Filter from 'bad-words';

import { validations } from '../../shared/custom-validations/validations';
import { validationMessages } from '../../shared/custom-validations/validation-messages';
import { GiphySearchService } from '../../shared/services';

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

  private limit = 12;
  private offset = 0;

  public giffs = [];
  public paginatedGiffs = [];
  public pagination;

  public page = 0;
  public size = 4;

  constructor(private readonly giphySearchService: GiphySearchService) { }

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
    ).subscribe(() => {
      if (this.searchQuery.valid) {
        this.giffs = [];
        this.pagination = {};
        this.offset = 0;
        this.callGiffSearch();
      }
    });
  }

  getErrorMessage() {
    return this.searchQuery.hasError('required') ? this.validationMessages.required() :
      this.searchQuery.hasError('isWordsNotValid') ? this.validationMessages.isWordsValid() : '';
  }

  getData(obj) {
    let index = 0;
    const startingIndex = obj.pageIndex * obj.pageSize;
    const endingIndex = startingIndex + obj.pageSize;

    this.paginatedGiffs = this.giffs.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });

    if (startingIndex !== 0 && startingIndex === this.giffs.length) {
      this.callGiffSearch();
    }
  }

  private callGiffSearch() {
    this.giphySearchService.getGiphyList(this.searchQuery.value, this.limit.toString(), this.offset.toString()).subscribe(
      (data) => {
        this.giffs = this.giffs.concat(data.gifs);
        this.pagination = data.pagination;
        this.offset = this.offset + this.pagination.count;
        // start from new page location
        this.getData({pageIndex: this.page, pageSize: this.size});
      }
    );
  }

  ngOnDestroy() {
    if (this.searchQueryControlSubscription) {
      this.searchQueryControlSubscription.unsubscribe();
    }
  }

}
