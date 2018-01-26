import {Component} from '@angular/core';
import {AlertController, App, IonicPage, ModalController, NavController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Common} from "../../providers/common/common";
import {TabsPage} from "../tabs/tabs";
import {noregcodeModel} from "./noregcode/noregcode";
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData: any;
  loginstr: string = '';
  userData = {
    "login": "",
    "email": "",
    "card": "",
    "code": "",
    "key": "",
    "password": "",
    "confirm_password": "",
    "name": "",
    "surname": "",
    "gender": "",
    "privacy": ""
  };
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
  };
  firstForm: FormGroup;
  checkCodeForm: FormGroup;
  passwordForm: FormGroup;
  step: number = 1;
  secureCode: any = '';
  button: string = 'далее';

  constructor(public navCtrl: NavController,
              public app: App,
              public authService: AuthServiceProvider,
              public common: Common,
              public modalCtrl: ModalController,
              private iab: InAppBrowser,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder) {
    this.firstForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
      email: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(128), Validators.email, Validators.required])],
      card: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(13), Validators.required])],
      code: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(5), Validators.required])],
    });
    this.checkCodeForm = this.formBuilder.group({
      key: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.required])],
    });
    this.passwordForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(64), Validators.required])],
      surname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(64), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(64), Validators.required])],
      confirm_password: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(64), Validators.required])],
      gender: ['', Validators.required],
      privacy: ['', Validators.requiredTrue],
    });
  }

  signupGetCode(login, email, card, code, complete = () => {
  }) {
    this.authService.signup(login, email, card, code).then((result: any) => {
      let alert = this.alertCtrl.create({
        title: result.events[0].title,
        subTitle: result.events[0].text,
        buttons: ['OK']
      });
      alert.present();
      if (result && result.status == 'ok') {
        this.step = 2;
        this.button = 'Проверить код';
      }
      complete();
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Ошибка',
        subTitle: 'Не удалось установить связь с сервером',
        buttons: ['OK']
      });
      alert.present();
      complete();
    });
  }

  signupCheckCode(login, email, card, code, key, complete = () => {
  }) {
    this.authService.signupCheck(login, email, card, code, key).then((result: any) => {
      let alert = this.alertCtrl.create({
        title: result.events[0].title,
        subTitle: result.events[0].text,
        buttons: ['OK']
      });
      alert.present();
      if (result && result.status == 'ok') {
        this.step = 3;
        this.button = 'Зарегистрировать';
        this.secureCode = result.data;
      }
      complete();
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Ошибка',
        subTitle: 'Не удалось установить связь с сервером',
        buttons: ['OK']
      });
      alert.present();
      complete();
    });
  }

  signupCreate(login, email, card, code, password, confirm_password, name, surname, gender, key, complete = () => {
  }) {
    this.authService.signupCreate(login, email, card, code, password, confirm_password, name, surname, gender, key).then((result: any) => {
      let alert = this.alertCtrl.create({
        title: result.events[0].title,
        subTitle: result.events[0].text,
        buttons: ['OK']
      });
      this.responseData = result;
      alert.present();
      if (result && result.status == 'ok') {
        let userData = {
          "card": this.responseData.data.card,
          "cardFormat": this.responseData.data.cardFormat,
          "id": this.responseData.data.id,
          "name": this.responseData.data.name,
          "surname": this.responseData.data.surname,
          "token": this.responseData.token
        };
        this.authService.storeUserData(userData);
        this.authService.initPushNotification();
        this.common.presentToast(this.responseData.events[0].text, 'success', 2000);
        // this.app.getRootNav().push(TabsPage, {fromTabComponent: true}, {animate: true, direction: 'forward'});
        this.navCtrl.setRoot(TabsPage);
      }
      complete();
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Ошибка',
        subTitle: 'Не удалось установить связь с сервером',
        buttons: ['OK']
      });
      alert.present();
      complete();
    });
  }

  back() {
    this.userData = {
      "login": "",
      "email": "",
      "card": "",
      "code": "",
      "key": "",
      "password": "",
      "confirm_password": "",
      "name": "",
      "surname": "",
      "gender": "",
      "privacy": ""
    };
    this.secureCode = "";
    this.step = 1;
  }

  signup() {
    this.loginstr = '7' + this.userData.login.toString();
    this.common.presentLoading();
    let email = this.userData.email;
    let card = this.userData.card;
    let code = this.userData.code;
    if (this.step == 1) {
      this.signupGetCode(this.loginstr, email, card, code, () => {
        this.common.closeLoading();
      });
    }
    if (this.step == 2) {
      let key = this.userData.key;
      this.signupCheckCode(this.loginstr, email, card, code, key, () => {
        this.common.closeLoading();
      });
    }
    if (this.step == 3) {
      this.signupCreate(this.loginstr, email, card, code, this.userData.password, this.userData.confirm_password, this.userData.name, this.userData.surname, this.userData.gender, this.secureCode,() => {
        this.common.closeLoading();
      });
    }
  }

  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.iab.create(url,target,this.options);
  }
  noregcode(){
    let modal = this.modalCtrl.create(noregcodeModel);
    modal.present();
  }
  login() {
    //Login page link
    this.navCtrl.pop();
  }

}
