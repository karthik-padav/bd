import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  headers:any="";
  // Live
  // BASE_URL:string="https://blood-d.appspot.com";
  BASE_URL:string="http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  // Register users
  register(userData) {
    return new Observable((observer) => {
      console.log(userData);
      this.http.post(this.BASE_URL + '/register', userData, {
        headers: this.headers
      }).subscribe((res) => {
        observer.next(res);
        observer.complete();
      }, (err: HttpErrorResponse) => {
        console.log(err.message);
      });
    })
  }

  // Send request
  sendRequest(victimData){
    console.log('service req');
    return new Observable((observer) => {
      console.log(victimData);
      this.http.post(this.BASE_URL + '/request', victimData, {
        headers: this.headers
      }).subscribe((res) => {
        observer.next(res);
        observer.complete();
      }, (err: HttpErrorResponse) => {
        console.log(err.message);
      });
    })
  }

  // Get user depending on phone number
  getUser(phoneNumber){
    console.log(phoneNumber);
    return new Observable((observer) => {
      this.http.post(this.BASE_URL + '/getUserData', phoneNumber, {
        headers: this.headers
      }).subscribe((res) => {
        observer.next(res);
        observer.complete();
      }, (err: HttpErrorResponse) => {
        console.log(err.message);
      });
    })
  }

}