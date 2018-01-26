import { Component } from '@angular/core';
import {App, IonicPage, NavController } from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Common} from "../../providers/common/common";
import {TabsPage} from "../tabs/tabs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestorePage} from "../restore/restore";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  userData = {"login": "","password": ""};
  loginstr :string = '';
  checkForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public app: App,
    public authService:AuthServiceProvider,
    public common:Common,
    public formBuilder: FormBuilder) {
    this.checkForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(64), Validators.required])],
    });
  }

  login(){
    this.loginstr = '7'+this.userData.login.toString();
    this.common.presentLoading();
    this.authService.login(this.loginstr, this.userData.password).then((result) => {
      this.responseData = result;
      this.common.closeLoading();
      if(this.responseData.status === 'ok'){
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
      }else{
        this.common.presentToast(this.responseData.events[0].text, 'error', 2000);
      }
    }, (err) => {
      this.common.closeLoading();
      this.common.presentToast('Системная ошибка', 'error', 2000);
      // Error log
    });

  }


  restore(){
    this.navCtrl.push(RestorePage);
  }
  signup(){
    this.navCtrl.push(SignupPage);
  }
}
