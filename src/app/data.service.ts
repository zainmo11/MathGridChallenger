import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import {TableRow} from "./table-row";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl // Replace with your API URL
  private accessToken = environment.accessToken

  constructor(private http: HttpClient) { }

  getDataPart(model: string): Observable<TableRow[]> {
    const headers = {
      Authorization: `Token ${this.accessToken}`,
      'Content-Type': 'application/json'
    };

    return this.http.get<TableRow[]>(`${this.apiUrl}/${model}`, { headers });
  }
  getData(data:string) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/${data}`, { headers });
  }
  postData(data: string, requestBody: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.accessToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/${data}`, requestBody, { headers });
  }
}
