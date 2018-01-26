import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from "../../config/app.config";

@Injectable()
export class UserMainProvider {

  constructor(public http: Http, public appConfig: AppConfig) {
    console.log('Hello BuysProvider Provider');
  }

  getSubscriptions(token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/subscriptions', JSON.stringify({"token": token}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getUserInfo(token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/info', JSON.stringify({"token": token}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getUserNotifications(token, limit, offset){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/notification', JSON.stringify({"token": token, "limit": limit, "offset": offset}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getPromocodes(token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/promocodes', JSON.stringify({"token": token}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  userPromocodesSend(token, key){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/promocodes/send', JSON.stringify({"token": token, "key": key}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getCertificates(token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/certificates', JSON.stringify({"token": token}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getCertificatesItem(token, id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/certificates/item', JSON.stringify({"token": token, "id": id}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getBusinessMoney(token, limit, offset) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/business/money', JSON.stringify({"token": token, "limit": limit, "offset": offset}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getBusinessPaymentsTypesList(token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/business/payments/types/list', JSON.stringify({"token": token}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getBusinessPaymentsTypesCheck(token, paymentID, key){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/business/payments/types/check', JSON.stringify({"token": token, "payment": paymentID, "key": key}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getBusinessPaymentsCashOutCheck(token, key){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/business/payments/cash_out/check', JSON.stringify({"token": token, "key": key}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getBusinessPaymentsCashOut(token, paymentID, money){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/business/payments/cash_out', JSON.stringify({"token": token, "payment": paymentID, "money": money}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getBusinessPaymentsTypesCreate(token, paymentID, number, name, surname){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/business/payments/types/create', JSON.stringify({"token": token, "payment": paymentID, "number": number, "name": name, "surname": surname}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getBusinessPaymentsTypes(token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/business/payments/types', JSON.stringify({"token": token}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getBusinessPayments(token, limit, offset) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/business/payments', JSON.stringify({"token": token, "limit": limit, "offset": offset}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
