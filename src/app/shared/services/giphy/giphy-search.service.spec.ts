import { TestBed } from '@angular/core/testing';

import { GiphySearchService } from './giphy-search.service';
import { HttpClientTestingModule, HttpTestingController } from '../../../../../node_modules/@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('GiphySearchService', () => {
  let service: GiphySearchService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [HttpClient]
  }));

  beforeEach(() => {
    service = TestBed.get(GiphySearchService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the giphy list', () => {

    const dummyGiphyResponse = {
      data: [{
        images: {
          original: {
            url: 'https://www.google.com/'
          }
        }
      }],
      pagination: {
        total_count: 45800,
        count: 50,
        offset: 0
      },
      meta: {
        response_id: '1234567890'
      }
    };

    service.getGiphyList('query', '50', '0').subscribe(giphy => {
      expect(giphy.gifs.length).toEqual(1);
      expect(giphy.meta.response_id).toEqual('1234567890');
      expect(giphy.pagination.count).toEqual(50);
    });

    const request = httpTestingController.expectOne({method: 'GET'});
    expect(request.request.url).toBe('https://api.giphy.com/v1/gifs/search');
    request.flush(dummyGiphyResponse);
  });
});
