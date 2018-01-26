import {Component} from '@angular/core';
import {App, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../../../providers/auth-service/auth-service";
import {UserMainProvider} from "../../../../providers/user/main";


@IonicPage()
@Component({
  selector: 'page-certificates-item',
  templateUrl: 'certificates-item.html',
})
export class CertificatesItemPage {
  userAuth: boolean;
  certificatesItem: any;
  certificateID: number;
  token: string;
  colors = {red: "#F93F3F", orange: "#F2A703", green: "#16B83C"};
  constructor(
    public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public events: Events,
    public authService:AuthServiceProvider,
    public userMainService:UserMainProvider) {

  }
  ngOnInit() {
    if (this.navParams.data) {
      this.certificateID = this.navParams.data.id;
    }
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
    this.userMainService.getCertificatesItem(this.token, this.certificateID).then((result) => {
      this.certificatesItem = result;
      complete();
    }, (err) => {
      this.certificatesItem = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }

  openCompany(id) {
    this.navCtrl.parent.select(0);
    this.events.publish('TabGoToCompanyPage', id);
  }
}
