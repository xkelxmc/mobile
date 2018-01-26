import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from "../../config/app.config";

@Injectable()
export class BuysProvider {

  constructor(public http: Http, public appConfig: AppConfig) {
    console.log('Hello BuysProvider Provider');
  }
  getBuys(token, limit, offset) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/buys', JSON.stringify({"token": token, "limit": limit, "offset": offset}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getBuysItem(token, id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/buys/item', JSON.stringify({"token": token, "id": id}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getBuysStaffList(token, id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/buys/item/staff/list', JSON.stringify({"token": token, "id": id}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  setBuyRating(token, id, rating, message) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/buys/item/setrating', JSON.stringify({"token": token, "id": id, "rating": rating, "message": message}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  setBuyStaffRating(token, id, userID, rating, message) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/buys/item/staff/setrating', JSON.stringify({"token": token, "id": id, "userID": userID, "rating": rating, "message": message}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
