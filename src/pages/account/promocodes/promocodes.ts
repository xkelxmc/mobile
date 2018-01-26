import {Component} from '@angular/core';
import {AlertController, App, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserMainProvider} from "../../../providers/user/main";
import {AuthServiceProvider} from "../../../providers/auth-service/auth-service";
import {SMS} from "@ionic-native/sms";
import {Common} from "../../../providers/common/common";

@IonicPage()
@Component({
  selector: 'page-promocodes',
  templateUrl: 'promocodes.html',
})
export class PromocodesPage {
  userAuth: boolean;
  promocodesList: any;
  token: string;
  colors = {red: "#F93F3F", orange: "#F2A703", green: "#16B83C"};
  currentPage: string = "active";

  userData = {"promo": ""};
  constructor(
    public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public events: Events,
    public common: Common,
    public alertCtrl: AlertController,
    private sms: SMS,
    public authService:AuthServiceProvider,
    public userMainService:UserMainProvider) {

  }
  ngOnInit() {
    this.checkAuth(() => {
      this.getPromocodes();
    });
  }


  doRefresh(refresher) {
    this.getPromocodes( () =>  refresher.complete());
  }
  checkAuth(callback = () => {
  }) {
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }
  getPromocodes(complete = () => {}){
    this.userMainService.getPromocodes(this.token).then((result) => {
      this.promocodesList = result;
      complete();
    }, (err) => {
      this.promocodesList = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }

  userPromocodesSend(complete = () => {}){
    this.userMainService.userPromocodesSend(this.token, this.userData.promo).then((result: any) => {
      this.common.closeLoading();
      let alert = this.alertCtrl.create({
        title: result.events[0].title,
        subTitle: result.events[0].text,
        buttons: ['OK']
      });
      alert.present();
      complete();
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: "Ошибка",
        subTitle: "Невозможно получить данные",
        buttons: ['OK']
      });
      alert.present();
      complete();
    });
  }
  submitPromo(){
    this.common.presentLoading();
    this.userPromocodesSend();
  }

  sendSMS(key){
    let options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // send SMS with the native android SMS messaging
      }
    };
    this.sms.send('', 'Промокод - ' + key, options);
  }

  openCompany(id) {
    this.navCtrl.parent.select(0);
    this.events.publish('TabGoToCompanyPage', id);
  }
}
