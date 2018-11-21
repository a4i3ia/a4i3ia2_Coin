import {Component, OnInit} from '@angular/core';
import {ServiceService} from './service.service'


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'app';
    tokenAmount: number;
    ethAmount: number;
    balance: string = '0';
    reciverAccount: string;
    symbol: string;
    constructor(public web3Service: ServiceService){
    }
  
    ngOnInit(){
    }
    async sendTokens(){
        try{
            this.web3Service.transferTokens(this.reciverAccount, this.tokenAmount);
        }catch (err){
            console.log("error get balance: ", err);
        }
    }
    async getBalance(){
        try {
            let balance = await this.web3Service.getBalance();
            this.balance = String(balance);
        }catch (err){
            console.log("error get balance: ", err);
        }
    }
    getTokens(){
        this.web3Service.getTokens(this.web3Service.web3.utils.toWei(String(this.ethAmount)));
    }
}
