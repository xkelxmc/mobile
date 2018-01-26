import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../../providers/auth-service/auth-service";
import {UserMainProvider} from "../../../providers/user/main";
import {Common} from "../../../providers/common/common";
import {CompanyProvider} from "../../../providers/company/company";

@IonicPage()
@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html',
})
export class SubscriptionsPage {
  userAuth: boolean;
  subscriptionsList: any;
  token: string;
  constructor(
    public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public company: CompanyProvider,
    public common: Common,
    public authService:AuthServiceProvider,
    public userMainService:UserMainProvider) {

  }
  ngOnInit() {
    this.checkAuth(() => {
      this.getSubscriptions();
    });
  }
  checkAuth(callback = () => {
  }) {
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }

  doRefresh(refresher) {
    this.getSubscriptions( () =>  refresher.complete());
  }
  getSubscriptions(complete = () => {}){
    this.userMainService.getSubscriptions(this.token).then((result) => {
      this.subscriptionsList = result;
      complete();
    }, (err) => {
      this.subscriptionsList = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }

  toggleSubscribe(id, index){
    this.common.presentLoading();
    let type = this.subscriptionsList.data[index].subscribe == 1 ? 'companies/unsubscribe' : 'companies/subscribe';

    this.company.toggleSubscribe(this.token, id, type).then((result: any) => {
      this.common.closeLoading();
      if(result.status == 'error'){
        this.common.presentAlert(result.events[0].title, result.events[0].text);
      }else if(result.status == 'ok'){
        this.subscriptionsList.data[index].subscribe = this.subscriptionsList.data[index].subscribe == 1 ? 0 : 1;
      }
    }, (err) => {
      this.common.closeLoading();
      this.common.presentAlert('Ошибка', 'Не удалось установить связь с сервером');
    });
  }
}
