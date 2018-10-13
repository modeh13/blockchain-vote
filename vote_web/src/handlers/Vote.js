import contract from 'truffle-contract'
import VoteContract from '@contracts/Vote.json'

const Vote = {
  contract: null,
  instance: null,  
  init: () => {
    let self = this;      

    if(self.contract == undefined && self.instance == undefined) {
      return new Promise((resolve, reject) => {
        self.contract = contract(VoteContract);
        self.contract.setProvider(window.web3.currentProvider);
        //self.contract.defaults({gas: 21000, from: '0x88665BeC6E677396a2f77FaDDFf96Ee9747E525D'});
        self.instance = self.contract.deployed().then(i => i).catch(console.error)    
      });
    }
  },
  getNewInstanceTruffle: (candidateList) => {
    let self = this;
    self.contract = contract(VoteContract);
    self.contract.setProvider(window.web3.currentProvider);
    self.contract.defaults({gas: 21000, from: '0x1e09737642228f4afC56F03c7069F12D79D57f0E'});
    self.instance = self.contract.new(candidateList.map(c => c.id)).then(i => i);
  },
  getNewInstance: (candidateList) => {
    let self = this;

    //let gasEstimate = window.web3.eth.estimateGas({data: VoteContract.deployedBytecode});
    let voteContract = window.web3.eth.contract(VoteContract.abi);
    //candidateList.map(c => c.id)
    self.instance = voteContract.new([1, 2, 3], 
                                    {gas: 1000000, 
                                     data: VoteContract.bytecode,
                                     from: '0x1e09737642228f4afC56F03c7069F12D79D57f0E'},
                                     function(err, myContract){
                                      if(!err) {
                                         // NOTE: The callback will fire twice!
                                         // Once the contract has the transactionHash property set and once its deployed on an address.
                                  
                                         // e.g. check tx hash on the first call (transaction send)
                                         if(!myContract.address) {
                                             console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract
                                         
                                         // check address on the second call (contract deployed)
                                         } else {
                                             console.log(myContract.address) // the contract address
                                         }
                                  
                                         // Note that the returned "myContractReturned" === "myContract",
                                         // so the returned "myContractReturned" object will also get the address set.
                                        }
                                      });
    console.log(self.instance);
  },
  registerVote: (nroDoc, candidateId) => {
    let self = this;
    
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase()
        .then((coinbase, error) => {
          if (error) reject(error)
          self.instance
            .then(vote => vote.registerVote(nroDoc, candidateId, {from: coinbase}))
            .then(tx => resolve(tx))
            .catch(error => reject(error))            
        });
    });
  },
  getTotalVotes: () => {
    let self = this;

    return new Promise((resolve, reject) => {
        self.instance
            .then(vote => vote.getTotalVotes())
            .then(count => resolve(count))
            .catch(error => reject(error))
    });
  },
  getCandidateVotes: (candidateId) => {
    let self = this;

    return new Promise((resolve, reject) => {
        self.instance
            .then(vote => vote.getCandidateVotes(candidateId))
            .then(count => resolve(count))
            .catch(error => reject(error))
    });
  },
  getIfPersonVoted: (nroDoc) => {
    let self = this;

    return new Promise((resolve, reject) => {
        self.instance
            .then(vote => vote.getIfPersonVoted(nroDoc))
            .then(voted => resolve(voted))
            .catch(error => reject(error))
    });
  }
}

export default Vote;