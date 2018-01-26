"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var CompanyProvider = (function () {
    function CompanyProvider(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
        console.log('Hello CompanyProvider Provider');
    }
    CompanyProvider.prototype.getCategories = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new http_1.Headers();
            _this.http.post(_this.appConfig.apiBaseUrl + 'companies/category/list', JSON.stringify({}), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyProvider.prototype.getCategoryItemsList = function (token, auth, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new http_1.Headers();
            _this.http.post(_this.appConfig.apiBaseUrl + 'companies/category/items', JSON.stringify({ "token": token, "auth": auth, 'id': id }), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyProvider.prototype.toggleSubscribe = function (token, id, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new http_1.Headers();
            _this.http.post(_this.appConfig.apiBaseUrl + type, JSON.stringify({ "token": token, 'id': id }), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    return CompanyProvider;
}());
CompanyProvider = __decorate([
    core_1.Injectable()
], CompanyProvider);
exports.CompanyProvider = CompanyProvider;
