"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var core_1 = require('@angular/core');
var web3_1 = require('web3');
// import abi from 'assets/contracts/UpCoin.json';
var Rx_1 = require('rxjs/Rx');
// import * as abi from 'human-standard-token-abi';
var ServiceService = (function () {
    // 0x4fbcd273892a88a5338d1ee2ecaf0653a1896670
    function ServiceService(http) {
        var _this = this;
        this.http = http;
        this.ready = false;
        this.upCoinAbi = [];
        this.accountsObservable = new Rx_1.Subject();
        this.contractAddress = '0x0c8fc650b0a205469c9ec05f86944038b134da12';
        window.addEventListener('load', function (event) {
            var provider = new web3_1["default"](web3_1["default"].givenProvider || 'wss://ropsten.infura.io/ws');
            _this.web3 = new web3_1["default"](provider);
            // Check if Web3 has been injected by the browser:
            if (typeof _this.web3 !== 'undefined') {
                // You have a web3 browser! Continue below!
                _this.startApp(_this.web3);
                _this.refreshAccounts();
            }
            else {
            }
        });
    }
    ServiceService.prototype.startApp = function (web3) {
        var _this = this;
        this.http.get('assets/contracts/ERC20Basic.json').map(function (res) { return res.json(); }).subscribe(function (upAbi) {
            _this.UpCoinContract = new _this.web3.eth.Contract(upAbi.abi, _this.contractAddress);
        });
    };
    ServiceService.prototype.refreshAccounts = function () {
        var _this = this;
        this.web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                return;
            }
            if (accs.length === 0) {
                return;
            }
            if (!_this.accounts || _this.accounts.length !== accs.length || _this.accounts[0] !== accs[0]) {
                _this.accountsObservable.next(accs);
                _this.accounts = accs;
            }
            _this.ready = true;
        });
    };
    ServiceService.prototype.transfer = function (address, amount) {
        this.UpCoinContract.methods.transfer(address, amount).send({ from: this.accounts[0] })
            .then(function (txHash) {
            console.log('Transaction sent');
            console.log("tx hash", txHash);
            this.waitForTxToBeMined(txHash);
        })
            .catch(console.error);
    };
    ServiceService.prototype.getTokens = function (amount) {
        console.log("get tokens", amount);
        // this.web3.eth.sendTransaction({
        //     from: this.accounts[0],
        //     to: this.contractAddress,
        //     value: amount
        //   })
        //   .then((receipt) => {
        //     this.waitForTxToBeMined(receipt);
        //   });
        this.UpCoinContract.methods.sendTokens().send({ from: this.accounts[0], value: amount })
            .then(function (txHash) {
            console.log('Transaction sent');
            console.log("tx hash", txHash);
            this.waitForTxToBeMined(txHash);
        })
            .catch(console.error);
    };
    ServiceService.prototype.getBalance = function () {
        this.UpCoinContract.methods.balanceOf(this.accounts[0]).call()
            .then(function (balance) {
            console.log("balance", balance);
            return balance;
        })
            .catch(console.error);
    };
    ServiceService.prototype.waitForTxToBeMined = function (txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            var txReceipt;
            while (!txReceipt) {
                try {
                    txReceipt = yield this.web3.eth.getTransactionReceipt(txHash);
                    console.log("txReceipt", txReceipt);
                }
                catch (err) {
                    console.log("err", err);
                }
            }
        });
    };
    ServiceService = __decorate([
        core_1.Injectable()
    ], ServiceService);
    return ServiceService;
}());
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map