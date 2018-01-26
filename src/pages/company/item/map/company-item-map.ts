import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import {AuthServiceProvider} from "../../../../providers/auth-service/auth-service";
import {CompanyProvider} from "../../../../providers/company/company";
import {Common} from "../../../../providers/common/common";

@IonicPage()
@Component({
  selector: 'company-item-map',
  templateUrl: 'company-item-map.html',
})
export class CompanyItemMap {

  /* user data */
  userAuth: boolean;
  token: string;

  /* company info */
  itemCompanyId: number;

  /* reviews */
  reviewsList: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public company: CompanyProvider,
              public common: Common,
              public modalCtrl: ModalController,
              platform: Platform) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.itemCompanyId = this.navParams.data.id;
    }
    this.checkAuth(() => {
      this.getCompanyReviews();
    });
  }

  checkAuth(callback = () => {
  }) {
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }

  getCompanyReviews(complete = () => {
  }) {
    this.company.getCompanyReviews(this.itemCompanyId).then((result: any) => {
      this.reviewsList = result;
      complete();
    }, (err) => {
      this.reviewsList ={"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }

}
