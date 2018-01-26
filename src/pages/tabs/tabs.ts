import { Component } from '@angular/core';

import {AccountPage} from "../account/account";
import {CompanyListPage} from "../company/list/list";
import {Common} from "../../providers/common/common";
import {App, NavController, NavParams} from "ionic-angular";
import {UserMainProvider} from "../../providers/user/main";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {BusinessPage} from "../business/business";
import {UserCardPage} from "../usercard/user-card";
import {UserNotificationPage} from "../user-notification/user-notification";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  userAuth: boolean;
  userData: any;
  userInfo: any;
  token: string;

  tab1Root = CompanyListPage;
  tab2Root = BusinessPage;
  tab3Root = AccountPage;
  tab4Root = UserCardPage;
  tab5Root = UserNotificationPage;

  constructor(public navCtrl: NavController,
              public app: App,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
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
