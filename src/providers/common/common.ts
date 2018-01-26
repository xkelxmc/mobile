import { Injectable } from '@angular/core';
import {AlertController, LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class Common {
  public loader: any;
  public toast: any;
  constructor(public loadingCtrl: LoadingController,  public toastCtrl: ToastController, private alertCtrl: AlertController) {
    console.log('Hello CommonProvider Provider');
  }
  presentLoading(){
    this.loader = this.loadingCtrl.create({content: "Пожалуйста, подождите..."});
    this.loader.present();
  }

  closeLoading(){
    this.loader.dismiss();
  }

  declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }
  presentToast(text, type = 'success', duration = 3000) {
    this.toast = this.toastCtrl.create({
      message: text,
      position: 'top',
      cssClass: type,
      duration: duration
    });
    this.toast.present();
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message
    });
    alert.present();
  }
}
