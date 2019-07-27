import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// const BASE_URL = 'http://intelaccounts.in/ems_tya/index.php/';
// const BASE_URL = 'http://192.168.10.192/ems_tya/index.php/';
// const BASE_URL = 'http://tyahq-svr/ems_tya/index.php/';
const BASE_URL = 'http://localhost/tya-ems-api/index.php/'


@Injectable({
  providedIn: 'root'
})
export class WebService {
  constructor(private http: HttpClient, private router: Router) {}

  urlEndPoint: any = BASE_URL;
  post(url: string, data: any): Observable<any> {
    const postHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };
    const endPoint = this.urlEndPoint + url;
    return this.http.post(endPoint, data, postHeader);
  }

  get(url: string): Observable<any> {
    const getHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };
    const endPoint = this.urlEndPoint + url;
    return this.http.get(endPoint, getHeader);
  }

  delete(id: any, url: string) {
    const deleteHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };
    const endPoint = this.urlEndPoint + url;
    this.http.delete(endPoint, deleteHeader);
  }
}
