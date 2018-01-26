import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  slides = [
    {
      title: "Карта «Легенда» приветствует вас в мире скидок и бонусов!",
      image: "assets/img/slide/1.png",
    },
    {
      title: "Здесь вы оцениваете сервис и повышаете качество обслуживания",
      image: "assets/img/slide/2.png",
    },
    {
      title: "Здесь вы экономите на покупках и получаете за это сертификаты и подарки",
      image: "assets/img/slide/3.png",
    },
    {
      title: "Здесь различные заведения предоставляют скидки и бонусы по одной карте",
      image: "assets/img/slide/4.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  continueApp(){
    localStorage.setItem('settings__skip_welcome', JSON.stringify(true));
    this.navCtrl.push(TabsPage);
  }


}
