import {Component} from '@angular/core';
import {Events, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../../providers/auth-service/auth-service";
import {CompanyProvider} from "../../../providers/company/company";
import {Common} from "../../../providers/common/common";
import {ModalCategoriesOption} from "./optios/categories";
import {CompanyItemPage} from "../item/item";

@IonicPage()
@Component({
  selector: 'page-company-list',
  templateUrl: 'list.html',
})
export class CompanyListPage {
  listCompany: any;
  listCategory: any;
  userAuth: boolean;
  token: string;

  categoryName: string = 'Все компании';
  selectCategory: number = 0;

  colors = {red: "#F93F3F", orange: "#F2A703", green: "#16B83C"};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public company: CompanyProvider,
    public common: Common,
    public modalCtrl: ModalController,
    public events: Events) {

    this.events.subscribe('TabGoToCompanyPage', (id) => { this.navCtrl.push(CompanyItemPage, {id: id}); });

  }
  ngOnDestroy() {
    this.events.unsubscribe('TabGoToCompanyPage');
  }
  ngOnInit() {
    this.checkAuth(() => this.getCategoryItemsList());
    this.getCategories();
  }

  changeOption() {
    let modal = this.modalCtrl.create(
      ModalCategoriesOption, {
        category: this.selectCategory,
        categoryName: this.categoryName,
        listCategory: this.listCategory});
    modal.onDidDismiss(data => {
      if(data.id != this.selectCategory){
        this.common.presentLoading();
        this.selectCategory = data.id;
        this.categoryName = data.name;
        this.getCategoryItemsList(() => this.common.closeLoading());
      }
    });
    modal.present();
  }

  toggleSubscribe(id, index){
    this.common.presentLoading();
    let type = this.listCompany.data[index].subscribe == 1 ? 'companies/unsubscribe' : 'companies/subscribe';

    this.company.toggleSubscribe(this.token, id, type).then((result: any) => {
      this.common.closeLoading();
      if(result.status == 'error'){
        this.common.presentAlert(result.events[0].title, result.events[0].text);
      }else if(result.status == 'ok'){
        this.listCompany.data[index].subscribe = this.listCompany.data[index].subscribe == 1 ? 0 : 1;
      }
    }, (err) => {
      this.common.closeLoading();
      this.common.presentAlert('Ошибка', 'Не удалось установить связь с сервером');
    });
  }

  goCompanyPage(id){
    this.navCtrl.push(CompanyItemPage, {id: id});
  }

  checkAuth(callback = () => {}){
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }

  doRefresh(refresher) {
    this.getCategoryItemsList(() => refresher.complete());
  }

  getCategoryItemsList(complete = () => {}){
    this.company.getCategoryItemsList(this.token, this.authService.isAuth(), this.selectCategory).then((result) => {
      this.listCompany = result;
      if(this.listCompany.data){
        let length = this.listCompany.data.length;
        if(length > 0){
          for(let i = 0; i<length; i++){
            if(this.listCompany.data[i].rating){
              this.listCompany.data[i].rating = parseFloat(this.listCompany.data[i].rating).toFixed(1);
              this.listCompany.data[i].color = this.listCompany.data[i].rating < 3 ? this.colors.red : this.listCompany.data[i].color = this.listCompany.data[i].rating < 4 ? this.colors.orange : this.colors.green;
              this.listCompany.data[i].reviews_text = this.common.declOfNum(this.listCompany.data[i].reviews, ['оценка', 'оценки', 'оценок']);
            }
          }
        }
      }

      complete();
    }, (err) => {
      this.listCompany = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }
  getCategories(){
    this.company.getCategories().then((result) => {
      this.listCategory = result;
    }, (err) => {
      this.listCategory = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
    });
  }
  getStars = function (rating) {
    let val = parseFloat(rating);
    let size = val / 5 * 100;
    return size + '%';
  };

}
