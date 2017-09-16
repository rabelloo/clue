import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

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
              .map(response => response.json().data);
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
  private getUrlParams(query: object): URLSearchParams {
    const params = new URLSearchParams();

    Object.keys(query)
      .map(key =>
        params.set(key, query[key]));

    return params;
  }
}
