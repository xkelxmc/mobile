import {Component, ViewChild} from '@angular/core';
import {
  IonicPage, ModalController, NavController, NavParams, Slides, Content, Platform
} from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import {AuthServiceProvider} from "../../../providers/auth-service/auth-service";
import {CompanyProvider} from "../../../providers/company/company";
import {Common} from "../../../providers/common/common";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {CompanyShopPage} from "./shop/company-shop";
import {ShoppingCartPage} from "./shop/cart/shopping-cart";

@IonicPage()
@Component({
  selector: 'page-company-item',
  templateUrl: 'item.html',
})
export class CompanyItemPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;
  @ViewChild('MultiItemsScrollingTabs') ItemsTitles: Content;

  /* user data */
  userAuth: boolean;
  token: string;

  /* company info */
  itemCompanyId: number;
  itemCompanyStatus: string;
  itemCompanyEvents: any;
  itemCompany: any;
  showCompany: boolean = false;
  itemCompanyLoad: boolean = false;

  /* branch list */
  branchListStatus: string;
  branchListEvents: any;
  branchList: any;
  branchLimit: number = 100;

  /* gallery */
  galleryPhotosStatus: string;
  galleryPhotosEvents: any;
  galleryPhotos: any;

  /* reviews */
  reviewsList: any;

  /* shop */
  shopCategoriesList: any;
  shoppingCard: any;


  colors = {red: "#F93F3F", orange: "#F2A703", green: "#16B83C"};
  currentPage: string = "info";
  tabs: any = ["Инфо", "Галерея", "Филиалы"];
  currSlide :number = 0;

  constructor(private iab: InAppBrowser,
              public navCtrl: NavController,
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
    this.shoppingCard = this.company.getShoppingCard(this.itemCompanyId);
    this.checkAuth(() => {
      this.getCompanyItemInfo(()=> {
        if(this.itemCompany && this.itemCompany.online_shop == 1){
          this.getCompanyShopCategoriesList();
        }
        setTimeout(()=>this.showCompany = true, 500)
      });
      this.getCompanyBranchList();
      this.getCompanyGallery();
      this.getCompanyReviews();
    });
  }

  checkAuth(callback = () => {
  }) {
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }

  getCompanyItemInfo(complete = () => {
  }) {
    this.company.getCompanyItemInfo(this.token, this.authService.isAuth(), this.itemCompanyId).then((result: any) => {
      this.itemCompanyLoad = true;
      this.itemCompanyStatus = result.status;
      this.itemCompanyEvents = result.events;
      this.itemCompany = result.data;
      if (this.itemCompany && this.itemCompany.rating) {
        this.itemCompany.rating = parseFloat(this.itemCompany.rating).toFixed(1);
        this.itemCompany.rating_color = this.itemCompany.rating < 3 ? this.colors.red : this.itemCompany.color = this.itemCompany.rating < 4 ? this.colors.orange : this.colors.green;
        this.itemCompany.reviews_text = this.common.declOfNum(this.itemCompany.reviews, ['отзыв', 'отзыва', 'отзывов']);
      }
      complete();
    }, (err) => {
      this.itemCompanyLoad = true;
      this.itemCompanyStatus = "error";
      this.itemCompanyEvents = [{"text": "Невозможно получить данные"}];
      complete();
    });
  }

  getCompanyBranchList(complete = () => {
  }) {
    this.company.getCompanyBranchList(this.itemCompanyId, this.branchLimit).then((result: any) => {

      this.branchListStatus = result.status;
      this.branchListEvents = result.events;
      this.branchList = result.data;

      if(this.branchList){
        let length = this.branchList.length;
        if(length > 0){
          for(let i = 0; i<length; i++){
            if (this.branchList[i].rating) {
              let rating = parseFloat(this.branchList[i].rating);
              this.branchList[i].rating = rating.toFixed(1);
              this.branchList[i].rating_color = rating < 3 ? this.colors.red : this.branchList[i].color = rating < 4 ? this.colors.orange : this.colors.green;
              this.branchList[i].reviews_text = this.common.declOfNum(this.branchList[i].reviews, ['отзыв', 'отзыва', 'отзывов']);
            }else{
              this.branchList[i].rating = '-';
            }
          }
        }
      }
      complete();
    }, (err) => {
      this.branchListStatus = "error";
      this.branchListEvents = [{"text": "Невозможно получить данные"}];
      complete();
    });
  }

  getCompanyGallery(complete = () => {
  }) {
    this.company.getCompanyGallery(this.itemCompanyId).then((result: any) => {

      this.galleryPhotosStatus = result.status;
      this.galleryPhotosEvents = result.events;
      this.galleryPhotos = result.data;

      complete();
    }, (err) => {
      this.galleryPhotosStatus = "error";
      this.galleryPhotosEvents = [{"text": "Невозможно получить данные"}];
      complete();
    });
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
  getCompanyShopCategoriesList(complete = () => {
  }) {
    this.company.getCompanyShopCategoriesList(this.itemCompanyId).then((result: any) => {
      this.shopCategoriesList = result;
      complete();
    }, (err) => {
      this.shopCategoriesList ={"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }
  openSiteLink(){
    const browser = this.iab.create(this.itemCompany.site, '_system');
    browser.close();
  }

  selectShopCategory(id, name){
    this.navCtrl.push(CompanyShopPage, {id: id, name:name, companyID: this.itemCompanyId});
  }
  openShoppingCart(){
    this.navCtrl.push(ShoppingCartPage, {companyID: this.itemCompanyId});
  }
  /* Gallery Start*/
  openModalPhoto(id){
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.galleryPhotos,
      initialSlide: id
    });
    modal.present();
  }
  /* Gallery End*/


  /* Табы - START*/
  selectTab(index) {
    this.currSlide = index;
    this.SwipedTabsSlider.slideTo(index);
  }

  updateIndicatorPosition() {
    let index = this.SwipedTabsSlider.getActiveIndex();
    if (this.SwipedTabsSlider.length() == index)
      index = index - 1;
    this.currSlide = index;
  }
  updateIndicatorPositionOnTouchEnd() {
    this.updateIndicatorPosition();
  }
  /* Табы - END */
}
