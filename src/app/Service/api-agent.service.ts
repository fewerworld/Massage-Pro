import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAgentService {

  // Request Header
  private requestHeader: { [key: string]: string } = {};

  // URL Mapping
  private urlMap: { [key: string]: string };

  constructor(private httpClient: HttpClient) {
    // Init Reqest Header
      // Token / APIKey
      // this.requestHeader['Token'] = 'TBC';

      // Accept Type & Content Type
      this.requestHeader['Accept'] = 'application/json;charset=UTF-8';
      this.requestHeader['Content-Type'] = 'application/json;charset=UTF-8';

    // Url Mapping
      this.urlMap = {};
      this.urlMap['revList'] = 'http://localhost:8080/rev/find';
      this.urlMap['revSave'] = 'http://localhost:8080/rev/save';
    }

  // URL Mapping
    public getUrl(urlCode: string): string {
      return this.urlMap[urlCode];
    }

  // Common HTTP Get Request
    public aGet<T>(urlCode: string): Observable<T> {

      return this.httpClient.get<T>(this.getUrl(urlCode), {headers: this.requestHeader});
    }

  // Common HTTP Post Request
    public aPost<T>(urlCode: string, requestBody: T): Observable<T> {

      return this.httpClient.post<T>(this.getUrl(urlCode), requestBody, {headers: this.requestHeader});
    }

}
