import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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
  get(resource: string, query?: object): Observable<any> {
    return this.http
              .get(this.getUrl(resource), { params: this.getUrlParams(query) })
              .pipe(
                map(response => response)
              );
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
