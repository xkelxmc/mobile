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
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
        console.log('AuthServiceProvider Load');
        this.loadUserData();
    }
    AuthServiceProvider.prototype.isAuth = function () {
        return this.userData !== null && this.userData !== undefined;
    };
    AuthServiceProvider.prototype.setUserData = function (data) {
        this.userData = data;
        this.token = (data !== null && data !== undefined && data.token !== null && data.token !== undefined) ? data.token : '';
    };
    AuthServiceProvider.prototype.loadUserData = function () {
        var data = JSON.parse(localStorage.getItem('userData'));
        console.log('User data loaded');
        this.setUserData(data);
    };
    AuthServiceProvider.prototype.storeUserData = function (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        this.setUserData(userData);
        return true;
    };
    AuthServiceProvider.prototype.clearUserData = function () {
        localStorage.clear();
        this.userData = null;
        this.token = '';
    };
    AuthServiceProvider.prototype.postData = function (credentials, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new http_1.Headers();
            _this.http.post(_this.appConfig.apiBaseUrl + type, JSON.stringify(credentials), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthServiceProvider.prototype.getUserData = function () {
        return this.userData;
    };
    AuthServiceProvider.prototype.getToken = function () {
        return this.token;
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    core_1.Injectable()
], AuthServiceProvider);
exports.AuthServiceProvider = AuthServiceProvider;
