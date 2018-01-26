import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {AppConfig} from "../../config/app.config";

import 'rxjs/add/operator/map';

@Injectable()
export class BonusProvider {

  constructor(public http: Http, public appConfig: AppConfig) {
    console.log('Hello BonusProvider Provider');

  }

  getBonus(token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/bonus', JSON.stringify({"token": token}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
