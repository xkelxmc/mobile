import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Common} from "../../providers/common/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-restore',
  templateUrl: 'restore.html',
})
export class RestorePage {
  loginstr :string = '';
  userData = {"login": "","card":"","key": "","password": "" , "confirm_password": ""};
  checkForm: FormGroup;
  checkCodeForm: FormGroup;
  passwordForm: FormGroup;
  step: number = 1;
  secureCode: any = '';
  constructor(
    public navCtrl: NavController,
    public app: App,
    public authService:AuthServiceProvider,
    public common:Common,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
    this.checkForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
      card: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(13), Validators.required])],
    });
    this.checkCodeForm = this.formBuilder.group({
      key: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.required])],
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(64), Validators.required])],
      confirm_password: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(64), Validators.required])],
    });
  }

  restoreGetCode(login, card, complete = () => {}) {
    this.authService.restore(login, card).then((result: any) => {
      let alert = this.alertCtrl.create({
        title: result.events[0].title,
        subTitle: result.events[0].text,
        buttons: ['OK']
      });
      alert.present();
      if (result && result.status == 'ok') {
        this.step = 2;
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
  restoreCheckCode(login, card, key, complete = () => {}) {
    this.authService.restoreCheck(login, card, key).then((result: any) => {
      let alert = this.alertCtrl.create({
        title: result.events[0].title,
        subTitle: result.events[0].text,
        buttons: ['OK']
      });
      alert.present();
      if (result && result.status == 'ok') {
        this.step = 3;
        this.secureCode = result.data;
        console.log(this.secureCode);
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
  restorePassword(login, card, key, password, confirm_password, complete = () => {}) {
    this.authService.restorePassword(login, card, key, password, confirm_password).then((result: any) => {
      let alert = this.alertCtrl.create({
        title: result.events[0].title,
        subTitle: result.events[0].text,
        buttons: ['OK']
      });
      alert.present();
      if (result && result.status == 'ok') {
        this.navCtrl.pop();
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
  back(){
    this.userData = {"login": "","card":"","key": "","password": "" , "confirm_password": ""};
    this.secureCode = "";
    this.step = 1;
  }
  restore(){
    this.loginstr = '7'+this.userData.login.toString();
    this.common.presentLoading();
    let card = this.userData.card;
    if(this.step == 1){
      this.restoreGetCode(this.loginstr, card, () => {
        this.common.closeLoading();
      });
    }
    if(this.step == 2){
      let key = this.userData.key;
      this.restoreCheckCode(this.loginstr, card, key, () => {
        this.common.closeLoading();
      });
    }
    if(this.step == 3){
      this.restorePassword(this.loginstr, card, this.secureCode, this.userData.password, this.userData.confirm_password, () => {
        this.common.closeLoading();
      });
    }
  }
}
