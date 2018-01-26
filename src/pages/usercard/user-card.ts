import {Component} from '@angular/core';
import {App, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {UserMainProvider} from "../../providers/user/main";
import {Common} from "../../providers/common/common";

@IonicPage()
@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html',
})
export class UserCardPage {
  userAuth: boolean;
  userData: any;
  userInfo: any;
  token: string;


  constructor(public navCtrl: NavController,
              public app: App,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public modalCtrl: ModalController,
              public common: Common,
              public userMainService: UserMainProvider) {

  }

  ngOnInit() {
    this.checkAuth(() => {
      this.getUserInfo();
    });
  }
  getUserInfo(complete = () => {
  }) {
    this.userMainService.getUserInfo(this.token).then((result) => {
      this.userInfo = result;
      complete();
    }, (err) => {
      this.userInfo = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }
  checkAuth(callback) {
    this.userData = this.authService.getUserData();
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }
}
