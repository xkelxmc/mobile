"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Common = (function () {
    function Common(loadingCtrl, toastCtrl, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        console.log('Hello CommonProvider Provider');
    }
    Common.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({ content: "Пожалуйста, подождите..." });
        this.loader.present();
    };
    Common.prototype.closeLoading = function () {
        this.loader.dismiss();
    };
    Common.prototype.declOfNum = function (number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };
    Common.prototype.presentToast = function (text, type, duration) {
        if (type === void 0) { type = 'success'; }
        if (duration === void 0) { duration = 3000; }
        this.toast = this.toastCtrl.create({
            message: text,
            position: 'top',
            cssClass: type,
            duration: duration
        });
        this.toast.present();
    };
    Common.prototype.presentAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message
        });
        alert.present();
    };
    return Common;
}());
Common = __decorate([
    core_1.Injectable()
], Common);
exports.Common = Common;
