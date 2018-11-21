import {Injectable} from '@angular/core';
import Web3 from 'web3';
import {Subject} from 'rxjs/Rx';
import {Http} from '@angular/http'
@Injectable()
export class ServiceService {
  public web3:Web3;
  private accounts:string[];
  public ready = false;
  public UpCoinContract:any;
  public upCoinAbi:Array<Object> = [];
  public accountsObservable = new Subject<string[]>();
  private contractAddress = '0x32546684e28df9024f35f77818099e7a05c5b6ea';
  constructor(public http: Http) {
    window.addEventListener('load', (event) => {
      const provider = new Web3(Web3.givenProvider || 'wss://ropsten.infura.io/ws');
      this.web3 = new Web3(provider);
      if (this.web3.currentProvider.isMetaMask === true) {
        this.startApp(this.web3)
        this.refreshAccounts();
      } else {
        alert('No web3? Please use google chrome and metamask plugin to enter this Dapp!');
        window.location.href = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
      }
    });

  }

  startApp(web3) {
    this.http.get('assets/contracts/UpCoin.json').map((res:any) => res.json()).subscribe((upAbi) => {
      this.UpCoinContract = new this.web3.eth.Contract(upAbi.abi, this.contractAddress)
    })

  }
  private refreshAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        return;
      }

      if (accs.length === 0) {
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }

  transferTokens(address:string, amount:number) {
    this.UpCoinContract.methods.transfer(address, amount).send({from: this.accounts[0]})
      .then(function (txHash) {
        console.log('Transaction sent')
        console.log("tx hash", txHash.txHash)
      })
      .catch(console.error)
  }
  getTokens(amount:number) {
    this.UpCoinContract.methods.sendTokens().send({from: this.accounts[0], value: amount})
      .then(function (txHash) {
      })
      .catch(console.error)
  }
  getBalance() {
    return new Promise(async (resolve, reject) => {
      try{
        const balance =  await this.UpCoinContract.methods.balanceOf(this.accounts[0]).call();
        return resolve(balance);
      }catch (err){
        return reject(err)
      }
    })
    
  }
}
