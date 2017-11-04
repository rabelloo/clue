import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Performs a request with `get` http method.
   *
   * Uses the app environment's base api url.
   *
   * Returns the data unwrapped from the response.
   */
  get<T>(resource: string, query?: object): Observable<any> {
    return this.http
              .get<T>(this.getUrl(resource), { params: this.getUrlParams(query) });
  }

  /**
   * Gets the full api url for a specified resource
   */
  private getUrl(resource: string): string {
    return (environment.api + resource)
            .replace(/\b\/\//g, '/');
  }

  /**
   * Gets an `URLSearchParams` from an object
   */
  private getUrlParams(query: object): HttpParams {
    const params = new HttpParams();

    Object.keys(query)
      .map(key =>
        params.set(key, query[key]));

    return params;
  }
}
