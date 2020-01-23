import { TestBed } from '@angular/core/testing';

import { GiphySearchService } from './giphy-search.service';
import { HttpClientTestingModule } from '../../../../../node_modules/@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('GiphySearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: GiphySearchService = TestBed.get(GiphySearchService);
    expect(service).toBeTruthy();
  });
});
