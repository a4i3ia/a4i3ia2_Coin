var HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privKeys = [""]
module.exports = {
  networks: {
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>{
        return new HDWalletProvider(privKeys, "https://ropsten.infura.io")
      },
      network_id: 3,
    }
  }
}
;
