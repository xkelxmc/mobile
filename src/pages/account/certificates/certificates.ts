import {Component} from '@angular/core';
import {App, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserMainProvider} from "../../../providers/user/main";
import {AuthServiceProvider} from "../../../providers/auth-service/auth-service";

import {CertificatesItemPage} from "./item/certificates-item";

@IonicPage()
@Component({
  selector: 'page-certificates',
  templateUrl: 'certificates.html',
})
export class CertificatesPage {
  userAuth: boolean;
  certificatesList: any;
  token: string;
  colors = {red: "#F93F3F", orange: "#F2A703", green: "#16B83C"};
  currentPage: string = "active";
  constructor(
    public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public events: Events,
    public authService:AuthServiceProvider,
    public userMainService:UserMainProvider) {

  }
  ngOnInit() {
    this.checkAuth(() => {
      this.getCertificates();
    });
  }
  checkAuth(callback = () => {
  }) {
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }
  getCertificates(complete = () => {}){
    this.userMainService.getCertificates(this.token).then((result) => {
      this.certificatesList = result;
      complete();
    }, (err) => {
      this.certificatesList = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }

  doRefresh(refresher) {
    this.getCertificates( () =>  refresher.complete());
  }
  openCertificate(id) {
    this.navCtrl.push(CertificatesItemPage, {id: id});
  }
}
