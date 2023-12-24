import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultItem } from 'src/app/core/interfaces/results.interface';

import {
  API_RESULTS,
  API_RESULTS_MY,
  API_RESULTS_RECORDS,
} from 'src/environments/urls';

@Injectable({
  providedIn: 'root',
})
export class ResultsApiService {
  constructor(private httpClient: HttpClient) {}

  getMyResultsList(): Observable<ResultItem[]> {
    return this.httpClient.get<ResultItem[]>(API_RESULTS_MY);
  }

  getRecordsList(): Observable<ResultItem[]> {
    return this.httpClient.get<ResultItem[]>(API_RESULTS_RECORDS);
  }

  postNewResult(score: number): Observable<ResultItem> {
    return this.httpClient.post<ResultItem>(API_RESULTS, { score });
  }
}
