import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Config } from '../../../app.config';

import 'rxjs/add/operator/map';

@Injectable()
export class FamilyMediaViewBlockService {
  public http: Http;

  public constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  public getData(query: any): Observable<any> {
    return this.http.get(`${Config.api}/v1/home-media-view-block?${query}`).map((res: any) => {
      let parseRes = JSON.parse(res._body);

      return {err: parseRes.error, data: parseRes.data};
    });
  }
}