import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GiphySearchService } from '../../shared/services';
import { Observable, of } from 'rxjs';

class MockGiphySearchService {
  getGiphyList(): Observable<any> {
    return of({});
  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let giphyService: GiphySearchService;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [ { provide: GiphySearchService, useClass: MockGiphySearchService } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    giphyService = TestBed.get(GiphySearchService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error on swear words', fakeAsync(() => {
    component.searchQuery.setValue('fuck u');
    fixture.detectChanges();
    tick(1000);
    expect(component.searchQuery.hasError('isWordsNotValid')).toBeTruthy();
  }));

  it('should getData for pagination', () => {
    spyOn(giphyService, 'getGiphyList').and.returnValue(of({
      gifs: [],
      pagination: {
        total_count: 45800,
        count: 50,
        offset: 0
      },
      meta: {
        response_id: '1234567890'
      }
    }));
    component.searchQuery.setValue('puppies');
    component.getErrorMessage();
    component.giffs = [{}, {}, {}, {}];
    component.getData({pageIndex: 0, pageSize: 4});
    expect(component.paginatedGiffs.length).toEqual(4);
    component.getData({pageIndex: 1, pageSize: 4});
    expect(giphyService.getGiphyList).toHaveBeenCalledWith('puppies', '100', '0');
  });

  it('should show giphy list on proper words', fakeAsync(() => {
    spyOn(giphyService, 'getGiphyList').and.returnValue(of({
      gifs: [],
      pagination: {
        total_count: 45800,
        count: 50,
        offset: 0
      },
      meta: {
        response_id: '1234567890'
      }
    }));
    component.searchQuery.patchValue('puppies');
    fixture.detectChanges();
    tick(1000);
    expect(giphyService.getGiphyList).toHaveBeenCalledWith('puppies', '100', '0');
  }));

  it('should call ondestroy on no subscription', () => {
    component.searchQueryControlSubscription = null;
    component.ngOnDestroy();
    fixture.detectChanges();
  });
});
