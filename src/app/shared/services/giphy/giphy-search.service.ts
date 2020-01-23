import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiphySearchService {

  constructor(private readonly http: HttpClient) { }

  getGiphyList(q: string, limit: string, offset: string): Observable<any> {

    const options = {
      params: {
        q,
        limit,
        offset
      }
    };
    return this.http.get(`https://api.giphy.com/v1/gifs/search`, options).pipe(
      map((body) => {
        return this.mapToGiphyList(body);
      })
    );
  }

  private mapToGiphyList(body) {
    const responseToView = {
      gifs: [],
      pagination: {},
      meta: {
        response_id: ''
      }
    };

    responseToView.gifs = body.data.map((item) => {
      return { url: item.images.original.url};
    });

    responseToView.pagination = body.pagination;
    responseToView.meta.response_id = body.meta.response_id;

    return responseToView;
  }
}
