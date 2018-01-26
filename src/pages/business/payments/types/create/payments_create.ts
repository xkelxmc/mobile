import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthServiceProvider} from "../../../../../providers/auth-service/auth-service";
import {Common} from "../../../../../providers/common/common";
import {UserMainProvider} from "../../../../../providers/user/main";
import {BusinessPaymentsCheckPage} from "./check/payments_check";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-business-payments-create',
  templateUrl: 'payments_create.html',
})
export class BusinessPaymentsCreatePage {
  userAuth: boolean;
  userData: any;
  token: string;
  typeID: number;
  paymentID: number;
  typeInfo: any;

  header: string;
  parent: any;

  paymentData = {"number": "", "name": "", "surname": ""};
  checkForm: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public common: Common,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public userMainService: UserMainProvider,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
    this.checkForm = this.formBuilder.group({
      number: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(32), Validators.required])],
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(32), Validators.required])],
      surname: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(32), Validators.required])],
    });
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.typeID = this.navParams.data.id;
      this.typeInfo = this.navParams.data.type;
      this.parent = this.navParams.data.parent;
      this.header = this.typeInfo.name;
      this.checkAuth();
    } else {
      this.dismiss(false);
    }
  }

  dismiss(change = false) {
    this.viewCtrl.dismiss({change: change});
    this.parent.viewCtrl.dismiss({change: change});
  }

  checkAuth(callback = () => {}) {
    this.userData = this.authService.getUserData();
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }
  openCheckKey(id) {
    let modal = this.modalCtrl.create(
      BusinessPaymentsCheckPage, {
        id: id,
        parent: this
      });
    modal.present();
  }

  createPayment(completeS = () => {}, complete_error = () => {}) {
    this.userMainService.getBusinessPaymentsTypesCreate(this.token, this.typeID, this.paymentData.number, this.paymentData.name, this.paymentData.surname).then((result: any) => {
      if (result && result.status == 'error') {
        let alert = this.alertCtrl.create({
          title: result.events[0].title,
          subTitle: result.events[0].text,
          buttons: ['OK']
        });
        alert.present();
        complete_error();
      }
      if(result && result.status == 'ok'){
        this.paymentID = result.data.id;
        completeS();
      }
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Ошибка',
        subTitle: 'Не удалось установить связь с сервером',
        buttons: ['OK']
      });
      alert.present();
      complete_error();
    });
  }

  submitPayment(){
    this.common.presentLoading();
    this.createPayment(() => {
      this.common.closeLoading();
      this.openCheckKey(this.paymentID);
    },() => {
      this.common.closeLoading();
    });
  }
}
