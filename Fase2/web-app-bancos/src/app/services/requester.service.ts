import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './interfaces/login-response';
import { Observable } from 'rxjs';
import { ResponseObject } from './interfaces/response-object';

@Injectable({
  providedIn: 'root'
})
export class RequesterService {

  constructor(private http: HttpClient) { }

  baseURL: string = "http://localhost:5000/";

  request(method: any, url: any, headers: any, body: any, params: any) {
    return this.http.request(method, url, {
      body: body || {},
      headers: headers || {},
      params: params || {}
    })
  }

  register(username:string, email:string, password:string): Observable<ResponseObject<LoginResponse>> {
    const headers = { 'content-type': 'application/json'}  
    const body={username, email, password};
    console.log(body)
    return this.http.post<ResponseObject<LoginResponse>>(this.baseURL + 'register', body,{'headers':headers})
  }
  login(email:string, password:string): Observable<ResponseObject<LoginResponse>> {
    const headers = { 'content-type': 'application/json'}  
    const body={email, password};
    // console.log(body)
    return this.http.post<ResponseObject<LoginResponse>>(this.baseURL + 'log', body,{'headers':headers})
  }
  
  // async get(url, params?, headers?, data?) {
  //   return await this.request('get', url, params, headers, data)
  // }

  // async put(url, params, headers, data) {
  //   return await this.request('put', url, params, headers, data);
  // }

  // async delete(url, params, headers, data) {
  //   return await this.request('delete', url, params, headers, data);
  // }
}