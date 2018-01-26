import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'noregcode',
  templateUrl: 'noregcode.html',
})
export class noregcodeModel {
  userAuth: boolean;
  userData: any;
  userInfo: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
