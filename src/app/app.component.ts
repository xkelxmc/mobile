import {Component} from '@angular/core';
import {AlertController, Events, ModalController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {WelcomePage} from "../pages/welcome/welcome";
import {TabsPage} from "../pages/tabs/tabs";
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {BuysItemInfoPage} from "../pages/account/buys/buys-item-info";
import {FCM} from '@ionic-native/fcm';
import {Push,PushOptions,PushObject} from "@ionic-native/push";


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  public rootPage: any = TabsPage;
  private pushOptions: PushOptions;
  private pushObject: PushObject;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public modalCtrl: ModalController,
              public authService: AuthServiceProvider,
              private fcm: FCM,
              private push:Push,
              public events: Events,
              public alertCtrl: AlertController) {
    platform.ready().then(() => {

      let skipWelcome = JSON.parse(localStorage.getItem('settings__skip_welcome'));
      console.log(skipWelcome);
      if (skipWelcome !== true) {
        this.rootPage = WelcomePage;
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.hideSplashScreen();
      this.initFCM();
      this.initPushNotification();
    });
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }

  initFCM() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    this.fcm.getToken().then(token => {
      console.log('device token -> ' + token);
      this.authService.storeLocalGoogleKey(token);
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log('device token -> ' + token);
      this.authService.storeLocalGoogleKey(token);
    });
    this.fcm.onNotification().subscribe(data => {
      console.log(JSON.stringify(data));
      if (data.wasTapped) {
        console.log("Received in background");
        if (data.buy && data.buy > 0) {
          let alertBuy = this.alertCtrl.create({
            title: data.title,
            message: data.text,
            buttons: [{
              text: 'Оценить',
              handler: () => {
                this.openBuyInfo(data.buy);
              }
            }]
          });
          alertBuy.present();
        } else {
          let alertCommon = this.alertCtrl.create({
            title: data.title,
            message: data.text,
            buttons: [{
              text: 'Закрыть',
              role: 'cancel'
            }]
          });
          alertCommon.present();
        }
      } else {
        console.log("Received in foreground");
      }

    })
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    this.pushOptions = {
      android: {
        forceShow: "false"
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    this.pushObject = this.push.init(this.pushOptions);

    this.pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      let dataAd = data.additionalData;
      if (data.additionalData.foreground) {
        // if application open, show popup
        if (dataAd && dataAd.buy && dataAd.buy > 0) {
          let alertBuy = this.alertCtrl.create({
            title: data.title,
            message: data.message,
            buttons: [{
              text: 'Оценить',
              handler: () => {
                this.openBuyInfo(dataAd.buy);
              }
            }]
          });
          alertBuy.present();
        } else {
          let alertCommon = this.alertCtrl.create({
            title: data.title,
            message: data.message,
            buttons: [{
              text: 'Закрыть',
              role: 'cancel'
            }]
          });
          alertCommon.present();
        }

      }
    });

    this.pushObject.on('error').subscribe(error => {
      console.error('Error with Push plugin' + error);
    });
  }

  openBuyInfo(id) {
    let modal = this.modalCtrl.create(
      BuysItemInfoPage, {
        id: id
      });
    modal.present();
  }
}
