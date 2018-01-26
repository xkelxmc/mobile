import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from "../../config/app.config";
import {AlertController, Events, Platform} from "ionic-angular";

@Injectable()
export class AuthServiceProvider {

  userData: any;
  token: string;
  registrationId: string;

  constructor(public http: Http,
              public appConfig: AppConfig,
              public platform: Platform,
              public events: Events,
              public alertCtrl: AlertController
  ) {
    console.log('AuthServiceProvider Load');
    this.loadUserData();
    if(this.isAuth()){
      this.initPushNotification();
    }
  }

  isAuth(){
    return this.userData !== null && this.userData !== undefined;
  }

  setUserData(data){
    this.userData = data;
    this.token = (data !== null && data !== undefined && data.token !== null && data.token !== undefined) ? data.token : '';
  }
  setRegistrationId(registrationId){
    this.registrationId = registrationId;
  }
  loadUserData(){
    let data = JSON.parse(localStorage.getItem('userData'));
    let registrationId = localStorage.getItem('registrationId');
    console.log('User data loaded');
    this.setUserData(data);
    this.setRegistrationId(registrationId);
  }

  storeUserData(userData){
    localStorage.setItem('userData', JSON.stringify(userData));
    this.setUserData(userData);
    return true;
  }
  storeLocalGoogleKey(registrationId){
    localStorage.setItem('registrationId', registrationId);
    this.setRegistrationId(registrationId);
    if(this.isAuth()){
      this.initPushNotification();
    }
    return true;
  }
  clearUserData(){
    localStorage.clear();
    this.userData = null;
    this.token = ''
  }


  signup(login, email, card, code){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'signup', JSON.stringify({"login": login, "email": email, "card": card, "code": code}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  signupCheck(login, email, card, code, key){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'signup/check', JSON.stringify({"login": login, "email": email, "card": card, "code": code, "key": key}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  signupCreate(login, email, card, code, password, confirm_password, name, surname, gender, key){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'signup/create', JSON.stringify({
        "login": login,
        "email": email,
        "card": card,
        "code": code,
        "password": password,
        "confirm_password": confirm_password,
        "name": name,
        "surname": surname,
        "gender": gender,
        "key": key}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  restore(login, card){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'restore', JSON.stringify({"login": login, "card": card}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  restoreCheck(login, card, key){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'restore/check', JSON.stringify({"login": login, "card": card, "key": key}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  restorePassword(login, card, key, password, confirm_password){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'restore/password', JSON.stringify({"login": login, "card": card, "key": key, "password": password, "confirm_password": confirm_password}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  login(login, password){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'login', JSON.stringify({"login": login, "password": password}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  storeGoogleKey(token, key){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'user/device_token', JSON.stringify({"token": token, "key": key}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  initPushNotification() {
    if(this.registrationId && this.registrationId != ''){
      this.storeGoogleKey(this.getToken(), this.registrationId).then((result: any) => {
        console.log('device token is saved');
      }, (err) => {
        console.log('device token is NOT saved');
      });
    }
  }

  getUserData(){
    return this.userData;
  }

  getToken(){
    return this.token;
  }
}
