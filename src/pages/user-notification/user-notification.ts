import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserMainProvider} from "../../providers/user/main";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the UserNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-notification',
  templateUrl: 'user-notification.html',
})
export class UserNotificationPage {
  userAuth: boolean;
  userData: any;
  userNotifications: any;
  token: string;

  limitNote: number = 10;
  countNote: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public userMainService: UserMainProvider) {
  }
  ngOnInit() {
    this.checkAuth(() => {
      this.getUserNotifications(this.limitNote, 0);
    });
  }
  doRefresh(refresher) {
    this.getUserNotifications(this.limitNote, 0, () => refresher.complete());
  }
  doInfinite(infiniteScroll = null) {
    setTimeout(() => {
      this.getUserNotifications(this.limitNote, this.countNote, () => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });


    }, 500);
  }

  getUserNotifications(limit, offset, complete = () => {
  }) {
    this.userMainService.getUserNotifications(this.token, limit, offset).then((result: any) => {

      if (offset > 0) {
        if (result && result.data) {
          this.countNote += result.data.length;
          for (let i = 0; i < result.data.length; i++) {
            this.userNotifications.data.push(result.data[i]);
          }
        }
      } else {
        this.userNotifications = result;
        if (this.userNotifications && this.userNotifications.data) {
          this.countNote = this.userNotifications.data.length;
        }
      }
      complete();
    }, (err) => {
      this.userNotifications = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
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
