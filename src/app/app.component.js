"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(web3Service) {
        this.web3Service = web3Service;
        this.title = 'app';
        this.balance = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.sendTokens = function () {
        this.web3Service.transfer(this.reciverAccount, this.web3Service.web3.utils.toWei(String(this.tokenAmount)));
    };
    AppComponent.prototype.getBalance = function () {
        this.web3Service.getBalance();
    };
    AppComponent.prototype.getTokens = function () {
        this.web3Service.getTokens(this.web3Service.web3.utils.toWei(String(this.ethAmount)));
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map