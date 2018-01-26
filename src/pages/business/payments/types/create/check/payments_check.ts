import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthServiceProvider} from "../../../../../../providers/auth-service/auth-service";
import {Common} from "../../../../../../providers/common/common";
import {UserMainProvider} from "../../../../../../providers/user/main";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-business-payments-check',
  templateUrl: 'payments_check.html',
})
export class BusinessPaymentsCheckPage {
  userAuth: boolean;
  userData: any;
  token: string;
  typeID: number;
  parent: any;

  key: string;

  checkForm: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public common: Common,
              public alertCtrl: AlertController,
              public userMainService: UserMainProvider,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
    this.checkForm = this.formBuilder.group({
      key: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.required])],
    });
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.typeID = this.navParams.data.id;
      this.parent = this.navParams.data.parent;
      this.checkAuth();
    } else {
      this.dismiss();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({change: true});
    this.parent.viewCtrl.dismiss({change: true});
    this.parent.parent.viewCtrl.dismiss({change: true});
  }

  checkAuth(callback = () => {}) {
    this.userData = this.authService.getUserData();
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }


  sendKey(complete = () => {}) {
    this.userMainService.getBusinessPaymentsTypesCheck(this.token, this.typeID, this.key).then((result: any) => {
      let alert = this.alertCtrl.create({
        title: result.events[0].title,
        subTitle: result.events[0].text,
        buttons: ['OK']
      });
      alert.present();
      if (result && result.status == 'ok') {
        this.dismiss();
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
  submitKey(){
    this.common.presentLoading();
    this.sendKey(()=>{
      this.common.closeLoading();
    });
    // this.setBuyRating(() => {
    //   this.common.closeLoading();
    //   if (this.buyInfo.staff > 0) {
    //     this.goToStaffList();
    //   } else {
    //     this.dismiss();
    //   }
    // });
  }
}
