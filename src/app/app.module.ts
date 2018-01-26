import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule,HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {HttpModule} from "@angular/http";
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import {MyApp} from './app.component';
import {AppConfig} from '../config/app.config';

import {AuthServiceProvider} from "../providers/auth-service/auth-service";

import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { SMS } from '@ionic-native/sms';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {WelcomePage} from "../pages/welcome/welcome";
import {LoginPage} from "../pages/login/login";
import {RestorePage} from "../pages/restore/restore";
import {SignupPage} from "../pages/signup/signup";
import {AccountPage} from "../pages/account/account";
import {Common} from '../providers/common/common';
import {BonusProvider} from '../providers/user/bonus';
import {BuysProvider} from "../providers/user/buys";
import {CompanyProvider} from '../providers/company/company';
import {CompanyListPage} from "../pages/company/list/list";
import {ModalCategoriesOption} from "../pages/company/list/optios/categories";
import {CompanyItemPage} from "../pages/company/item/item";
import {SubscriptionsPage} from "../pages/account/subscriptions/subscriptions";
import {UserMainProvider} from "../providers/user/main";
import {CertificatesPage} from "../pages/account/certificates/certificates";
import {CertificatesItemPage} from "../pages/account/certificates/item/certificates-item";
import {PromocodesPage} from "../pages/account/promocodes/promocodes";
import {BuysItemInfoPage} from "../pages/account/buys/buys-item-info";
import {Push} from "@ionic-native/push";
import { FCM } from '@ionic-native/fcm';

import { StarRatingModule } from 'angular-star-rating';
import {BuyStaffListPage} from "../pages/account/buys/staff/buy-staff-list";
import {BuyStaffItemPage} from "../pages/account/buys/staff/item/buy-staff-item";
import {CompanyShopPage} from "../pages/company/item/shop/company-shop";
import {ShoppingCartPage} from "../pages/company/item/shop/cart/shopping-cart";
import {BusinessPage} from "../pages/business/business";
import {BusinessPaymentsPage} from "../pages/business/payments/payments";
import {BusinessPaymentsTypesPage} from "../pages/business/payments/types/payments_types";
import {BusinessPaymentsCreatePage} from "../pages/business/payments/types/create/payments_create";
import {BusinessPaymentsCheckPage} from "../pages/business/payments/types/create/check/payments_check";
import {BusinessPaymentsCashOutModal} from "../pages/business/payments/cash_out/payments_cash_out";
import {BusinessPaymentsEnterDataModel} from "../pages/business/payments/cash_out/enter_data/payments_enter_data";
import {BusinessPaymentsCashOutCheckModal} from "../pages/business/payments/cash_out/enter_data/check/payments_cash_out_check";
import {UserCardPage} from "../pages/usercard/user-card";
import {ShoppingOrderPage} from "../pages/company/item/shop/order/shopping-order";
import {UserNotificationPage} from "../pages/user-notification/user-notification";
import {noregcodeModel} from "../pages/signup/noregcode/noregcode";
import {CompanyItemMap} from "../pages/company/item/map/company-item-map";


@NgModule({
  // DEV
  declarations: [
    MyApp,
    AccountPage,
    UserCardPage,
    CompanyListPage,
    CompanyItemPage,
    CompanyShopPage,
    ShoppingCartPage,
    ModalCategoriesOption,
    BuyStaffListPage,
    BuyStaffItemPage,
    BuysItemInfoPage,
    SubscriptionsPage,
    PromocodesPage,
    CertificatesPage,
    CertificatesItemPage,
    WelcomePage,
    LoginPage,
    RestorePage,
    ShoppingOrderPage,
    UserNotificationPage,
    SignupPage,
    TabsPage,
    BusinessPage,
    BusinessPaymentsPage,
    BusinessPaymentsTypesPage,
    BusinessPaymentsCreatePage,
    BusinessPaymentsCheckPage,
    BusinessPaymentsCashOutModal,
    BusinessPaymentsEnterDataModel,
    BusinessPaymentsCashOutCheckModal,
    noregcodeModel,
    CompanyItemMap
  ],
  // PROD
  // declarations: [
  //   MyApp,
  //   ModalCategoriesOption,
  //   BuysItemInfoPage,
  //   BuyStaffListPage,
  //   BuyStaffItemPage,
  //   BusinessPaymentsTypesPage,
  //   BusinessPaymentsCreatePage,
  //   BusinessPaymentsCheckPage,
  //   BusinessPaymentsCashOutModal,
  //   BusinessPaymentsEnterDataModel,
  //   BusinessPaymentsCashOutCheckModal,
  //   noregcodeModel
  // ],
  imports: [
    BrowserModule, HttpModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp),
    StarRatingModule.forRoot()
  ],
  bootstrap: [IonicApp],


  entryComponents: [
    MyApp,
    AccountPage,
    UserCardPage,
    CompanyListPage,
    CompanyItemPage,
    CompanyShopPage,
    ShoppingCartPage,
    ModalCategoriesOption,
    BuyStaffListPage,
    BuyStaffItemPage,
    BuysItemInfoPage,
    SubscriptionsPage,
    PromocodesPage,
    CertificatesPage,
    CertificatesItemPage,
    WelcomePage,
    LoginPage,
    RestorePage,
    ShoppingOrderPage,
    UserNotificationPage,
    SignupPage,
    TabsPage,
    BusinessPage,
    BusinessPaymentsPage,
    BusinessPaymentsTypesPage,
    BusinessPaymentsCreatePage,
    BusinessPaymentsCheckPage,
    BusinessPaymentsCashOutModal,
    BusinessPaymentsEnterDataModel,
    BusinessPaymentsCashOutCheckModal,
    noregcodeModel
  ],
  providers: [
    StatusBar,
    Push,
    FCM,
    AppConfig,
    SplashScreen,
    AuthServiceProvider,
    Common,
    SMS,
    InAppBrowser,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BonusProvider, BuysProvider, UserMainProvider,
    CompanyProvider,
  ]
})
export class AppModule {
}
