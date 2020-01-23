import { TestBed } from '@angular/core/testing';

import { GiphySearchService } from './giphy-search.service';

describe('GiphySearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiphySearchService = TestBed.get(GiphySearchService);
    expect(service).toBeTruthy();
  });
});
