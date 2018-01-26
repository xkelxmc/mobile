import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from "../../config/app.config";

@Injectable()
export class CompanyProvider {

  shoppingCard: any;

  constructor(public http: Http, public appConfig: AppConfig) {
    console.log('Hello CompanyProvider Provider');
    this.loadShoppingCard();
  }


  addToShoppingCard(itemId, orgId, price){
    let shoppingCard = this.shoppingCard;
    if (shoppingCard[orgId] === undefined) {
      shoppingCard[orgId] = {items: {[itemId]: {id: itemId, price: price, count: 1}}};
      shoppingCard[orgId].price = price;
      shoppingCard[orgId].count = 1;
    } else {
      let count = 1;
      if (shoppingCard[orgId].items[itemId] === undefined) {
        shoppingCard[orgId].items[itemId] = {id: itemId, price: price, count: 1};
      } else {
        count = shoppingCard[orgId].items[itemId].count;
        if(count < 25){
          shoppingCard[orgId].items[itemId].count = count + 1;
        }
      }
      if(count < 25) {
        shoppingCard[orgId].price = shoppingCard[orgId].price + price;
        shoppingCard[orgId].count = shoppingCard[orgId].count + 1;
      }
    }
    this.storeShoppingCard(shoppingCard);
    return shoppingCard[orgId];
  }

  removeAllOrgFromShoppingCard(itemId, orgId){
    let shoppingCard = this.shoppingCard;
    if (shoppingCard[orgId] !== undefined) {
      if (shoppingCard[orgId].items[itemId] !== undefined) {
        let count = shoppingCard[orgId].items[itemId].count;
        let price = shoppingCard[orgId].items[itemId].price;
        delete shoppingCard[orgId].items[itemId];
        shoppingCard[orgId].price = shoppingCard[orgId].price - price * count;
        shoppingCard[orgId].count = shoppingCard[orgId].count - count;
      }
    }
    this.storeShoppingCard(shoppingCard);
    return shoppingCard[orgId];
  }

  removeOneOrgFromShoppingCard(itemId, orgId){
    let shoppingCard = this.shoppingCard;
    let remove = false;
    if (shoppingCard[orgId] !== undefined) {
      if (shoppingCard[orgId].items[itemId] !== undefined) {
        let count = shoppingCard[orgId].items[itemId].count;
        let price = shoppingCard[orgId].items[itemId].price;
        if (count === 1) {
          delete shoppingCard[orgId].items[itemId];
          remove = true;
        } else {
          shoppingCard[orgId].items[itemId].count = count - 1;
        }
        shoppingCard[orgId].price = shoppingCard[orgId].price - price;
        shoppingCard[orgId].count = shoppingCard[orgId].count - 1;
      }
    }
    this.storeShoppingCard(shoppingCard);
    // return remove;
    return shoppingCard[orgId];
  }

  removeAllFromShoppingCard(orgId) {
    let shoppingCard = this.shoppingCard;
    if (shoppingCard[orgId] !== undefined) {
      delete shoppingCard[orgId];
    }
    this.storeShoppingCard(shoppingCard);
    return shoppingCard[orgId];
  }
  removeAllCompanysFromShoppingCard() {
    let shoppingCard = {};
    this.storeShoppingCard(shoppingCard);
    return shoppingCard;
  }

  loadShoppingCard(){
    let shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'));
    if(!shoppingCard){
      this.shoppingCard = {};
    }else{
      this.shoppingCard = shoppingCard;
    }
  }

  storeShoppingCard(data){
    localStorage.setItem('shoppingCard', JSON.stringify(data));
    this.shoppingCard = data;
    return true;
  }

  clearShoppingCard(){
    localStorage.clear();
    this.shoppingCard = null;
  }


  getShoppingCard(companyID){
    return this.shoppingCard[companyID];
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/category/list', JSON.stringify({}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getCategoryItemsList(token, auth, id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/category/items', JSON.stringify({"token": token, "auth": auth, 'id': id}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getCompanyItemInfo(token, auth, id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/item/info', JSON.stringify({"token": token, "auth": auth, 'id': id}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getCompanyBranchList(id, limit){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/item/branch/list', JSON.stringify({'id': id, 'limit': limit}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getCompanyGallery(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/item/gallery', JSON.stringify({'id': id}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getCompanyReviews(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/item/reviews', JSON.stringify({'id': id}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getCompanyShopCategoriesList(id){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/item/shop/categories/list', JSON.stringify({'id': id}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getCompanyShopCategoriesItems(id, companyID){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/item/shop/categories/items', JSON.stringify({'id': id, 'companyID': companyID}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getCompanyShopItems(ids, companyID){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/item/shop/items', JSON.stringify({'ids': ids, 'companyID': companyID}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  CompanyShopOrder(ids, companyID, address, room, level, token){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + 'companies/item/shop/order', JSON.stringify({'ids': ids, 'companyID': companyID, "token": token, "address": address, "room": room, "level": level}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  toggleSubscribe(token, id, type){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.appConfig.apiBaseUrl + type, JSON.stringify({"token": token, 'id': id}), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
