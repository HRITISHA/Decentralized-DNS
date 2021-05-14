require("dotenv").config();

const Web3 = require("web3");
const web3 = new Web3(process.env.TESTNET_URL);

function createAccount(){
    let newAccount = web3.eth.accounts.create();
    let address = newAccount.address;
    let privateKey = newAccount.privateKey;
    console.log("Address", address);
    console.log("Private Key", privateKey);
}

var dnsContract = new web3.eth.Contract([
  {
    constant: true,
    inputs: [
      { internalType: "string", name: "domainName", type: "string" },
      { internalType: "uint256", name: "paymentAmount", type: "uint256" },
    ],
    name: "calculateReservationTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "string", name: "domainName", type: "string" }],
    name: "extendDomainNameReservation",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "string", name: "domainName", type: "string" }],
    name: "getDomainAddress",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "string", name: "domainName", type: "string" }],
    name: "isDomainNameReserved",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "string", name: "domainName", type: "string" }],
    name: "isDomainNameReservedBySender",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "pendingDepositReturns",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "pullDeposit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "string", name: "domainName", type: "string" }],
    name: "releaseDomainName",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "string", name: "domainName", type: "string" }],
    name: "reserveDomainName",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "domainName", type: "string" },
      { internalType: "string", name: "domainAlias", type: "string" },
    ],
    name: "setCustomDomainAddress",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "domainName", type: "string" },
      { internalType: "string", name: "domainAddress", type: "string" },
    ],
    name: "setDomainAddress",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
]);
var dns = dnsContract
  .deploy({
    data: "0x608060405234801561001057600080fd5b50611f0a806100206000396000f3fe60806040526004361061009c5760003560e01c806399d7a0f41161006457806399d7a0f4146104b4578063ab14b31a146104e3578063ab6694e6146105be578063be46eb73146106a4578063cd746d8e14610731578063edd3a798146107965761009c565b806317f2ae25146100a15780633b2213181461018157806377ed88291461025c57806391d2bf581461033c57806394310e51146103b5575b600080fd5b3480156100ad57600080fd5b50610167600480360360208110156100c457600080fd5b81019080803590602001906401000000008111156100e157600080fd5b8201836020820111156100f357600080fd5b8035906020019184600183028401116401000000008311171561011557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061085e565b604051808215151515815260200191505060405180910390f35b34801561018d57600080fd5b5061025a600480360360408110156101a457600080fd5b81019080803590602001906401000000008111156101c157600080fd5b8201836020820111156101d357600080fd5b803590602001918460018302840111640100000000831117156101f557600080fd5b90919293919293908035906020019064010000000081111561021657600080fd5b82018360208201111561022857600080fd5b8035906020019184600183028401116401000000008311171561024a57600080fd5b9091929391929390505050610933565b005b34801561026857600080fd5b506103226004803603602081101561027f57600080fd5b810190808035906020019064010000000081111561029c57600080fd5b8201836020820111156102ae57600080fd5b803590602001918460018302840111640100000000831117156102d057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610aae565b604051808215151515815260200191505060405180910390f35b6103b36004803603602081101561035257600080fd5b810190808035906020019064010000000081111561036f57600080fd5b82018360208201111561038157600080fd5b803590602001918460018302840111640100000000831117156103a357600080fd5b9091929391929390505050610b25565b005b3480156103c157600080fd5b50610439600480360360208110156103d857600080fd5b81019080803590602001906401000000008111156103f557600080fd5b82018360208201111561040757600080fd5b8035906020019184600183028401116401000000008311171561042957600080fd5b9091929391929390505050610d78565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561047957808201518184015260208101905061045e565b50505050905090810190601f1680156104a65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104c057600080fd5b506104c96112d3565b604051808215151515815260200191505060405180910390f35b3480156104ef57600080fd5b506105bc6004803603604081101561050657600080fd5b810190808035906020019064010000000081111561052357600080fd5b82018360208201111561053557600080fd5b8035906020019184600183028401116401000000008311171561055757600080fd5b90919293919293908035906020019064010000000081111561057857600080fd5b82018360208201111561058a57600080fd5b803590602001918460018302840111640100000000831117156105ac57600080fd5b90919293919293905050506113f7565b005b3480156105ca57600080fd5b5061068e600480360360408110156105e157600080fd5b81019080803590602001906401000000008111156105fe57600080fd5b82018360208201111561061057600080fd5b8035906020019184600183028401116401000000008311171561063257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001909291905050506115c8565b6040518082815260200191505060405180910390f35b61071b600480360360208110156106ba57600080fd5b81019080803590602001906401000000008111156106d757600080fd5b8201836020820111156106e957600080fd5b8035906020019184600183028401116401000000008311171561070b57600080fd5b90919293919293905050506115fb565b6040518082815260200191505060405180910390f35b34801561073d57600080fd5b506107806004803603602081101561075457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061192b565b6040518082815260200191505060405180910390f35b3480156107a257600080fd5b5061085c600480360360208110156107b957600080fd5b81019080803590602001906401000000008111156107d657600080fd5b8201836020820111156107e857600080fd5b8035906020019184600183028401116401000000008311171561080a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611943565b005b600061086982610aae565b801561092c57503373ffffffffffffffffffffffffffffffffffffffff166000836040518082805190602001908083835b602083106108bd578051825260208201915060208101905060208303925061089a565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b9050919050565b61098084848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061085e565b6109d5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180611e2e602c913960400191505060405180910390fd5b6000808585604051808383808284378083019250505092505050908152602001604051809103902060040160006101000a81548160ff02191690836001811115610a1b57fe5b021790555081816000868660405180838380828437808301925050509250505090815260200160405180910390206005019190610a59929190611c92565b50604051806020016040528060008152506000858560405180838380828437808301925050509250505090815260200160405180910390206006019080519060200190610aa7929190611d12565b5050505050565b600080826040518082805190602001908083835b60208310610ae55780518252602082019150602081019050602083039250610ac2565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206001015442109050919050565b610b7282828080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061085e565b610bc7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180611e2e602c913960400191505060405180910390fd5b600042600084846040518083838082843780830192505050925050509081526020016040518091039020600101540390506000610c4884848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050346115c8565b905060008183019050620d2f00811015610cad576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180611e5a6022913960400191505060405180910390fd5b6301e13380811115610d0a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180611eb36023913960400191505060405180910390fd5b806000868660405180838380828437808301925050509250505090815260200160405180910390206001018190555034600086866040518083838082843780830192505050925050509081526020016040518091039020600301600082825401925050819055505050505050565b6060610dc783838080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610aae565b610e39576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f446f6d61696e206e616d65206973206e6f74207265736572766564000000000081525060200191505060405180910390fd5b60006001811115610e4657fe5b60008484604051808383808284378083019250505092505050908152602001604051809103902060040160009054906101000a900460ff166001811115610e8957fe5b1415610f59576000838360405180838380828437808301925050509250505090815260200160405180910390206005018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f4d5780601f10610f2257610100808354040283529160200191610f4d565b820191906000526020600020905b815481529060010190602001808311610f3057829003601f168201915b505050505090506112cd565b60606000848460405180838380828437808301925050509250505090815260200160405180910390206006018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110195780601f10610fee57610100808354040283529160200191611019565b820191906000526020600020905b815481529060010190602001808311610ffc57829003601f168201915b505050505090505b60018081111561102d57fe5b6000826040518082805190602001908083835b602083106110635780518252602082019150602081019050602083039250611040565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060040160009054906101000a900460ff1660018111156110b257fe5b14156111c4576000816040518082805190602001908083835b602083106110ee57805182526020820191506020810190506020830392506110cb565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206006018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156111b85780601f1061118d576101008083540402835291602001916111b8565b820191906000526020600020905b81548152906001019060200180831161119b57829003601f168201915b50505050509050611021565b6000816040518082805190602001908083835b602083106111fa57805182526020820191506020810190506020830392506111d7565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206005018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112c45780601f10611299576101008083540402835291602001916112c4565b820191906000526020600020905b8154815290600101906020018083116112a757829003601f168201915b50505050509150505b92915050565b600080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008111156113ee576000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050506113ed5780600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060009150506113f4565b5b60019150505b90565b61144484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061085e565b8015611499575061149882828080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061085e565b5b6114ee576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180611e00602e913960400191505060405180910390fd5b600160008585604051808383808284378083019250505092505050908152602001604051809103902060040160006101000a81548160ff0219169083600181111561153557fe5b0217905550604051806020016040528060008152506000858560405180838380828437808301925050509250505090815260200160405180910390206005019080519060200190611587929190611d12565b50818160008686604051808383808284378083019250505092505050908152602001604051809103902060060191906115c1929190611c92565b5050505050565b600080835160050a6638d7ea4c680000816115df57fe5b04905060008184816115ed57fe5b049050809250505092915050565b600061164a83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610aae565b156116bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f446f6d61696e206e616d6520697320616c72656164792072657365727665642e81525060200191505060405180910390fd5b61170a83838080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050611943565b600061175a84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050346115c8565b9050620d2f008110156117b8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180611e5a6022913960400191505060405180910390fd5b6301e13380811115611815576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180611eb36023913960400191505060405180910390fd5b8383600086866040518083838082843780830192505050925050509081526020016040518091039020600001919061184e929190611c92565b50804201600085856040518083838082843780830192505050925050509081526020016040518091039020600101819055503360008585604051808383808284378083019250505092505050908152602001604051809103902060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034600085856040518083838082843780830192505050925050509081526020016040518091039020600301600082825401925050819055508091505092915050565b60016020528060005260406000206000915090505481565b3373ffffffffffffffffffffffffffffffffffffffff166000826040518082805190602001908083835b60208310611990578051825260208201915060208101905060208303925061196d565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480611a0f5750611a0d81610aae565b155b611a64576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526037815260200180611e7c6037913960400191505060405180910390fd5b6000816040518082805190602001908083835b60208310611a9a5780518252602082019150602081019050602083039250611a77565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020600301546001600080846040518082805190602001908083835b60208310611b0a5780518252602082019150602081019050602083039250611ae7565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055506000816040518082805190602001908083835b60208310611bde5780518252602082019150602081019050602083039250611bbb565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060008082016000611c229190611d92565b60018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560038201600090556004820160006101000a81549060ff0219169055600582016000611c7d9190611d92565b600682016000611c8d9190611d92565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611cd357803560ff1916838001178555611d01565b82800160010185558215611d01579182015b82811115611d00578235825591602001919060010190611ce5565b5b509050611d0e9190611dda565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611d5357805160ff1916838001178555611d81565b82800160010185558215611d81579182015b82811115611d80578251825591602001919060010190611d65565b5b509050611d8e9190611dda565b5090565b50805460018160011615610100020316600290046000825580601f10611db85750611dd7565b601f016020900490600052602060002090810190611dd69190611dda565b5b50565b611dfc91905b80821115611df8576000816000905550600101611de0565b5090565b9056fe446f6d61696e206e616d6573206861766520746f206265207265736572766564206279207468652073656e646572446f6d61696e206e616d652068617320746f206265207265736572766564206279207468652073656e646572546865207061796d656e74206973206c6f776572207468616e206578706563746564446f6d61696e206e616d652068617320746f206265207265736572766564206279207468652073656e646572206f722065787069726564546865207061796d656e7420697320686967686572207468616e206578706563746564a265627a7a723158204c1ae476f378f22882263408b6c8ef1171553898463d71459511ce9db3c77e0a64736f6c63430005110032",
    arguments: [],
  })
  .send(
    {
      from: web3.eth.accounts[0],
      gas: "4700000",
    },
    function (e, contract) {
      console.log(e, contract);
      if (typeof contract.address !== "undefined") {
        console.log(
          "Contract mined! address: " +
            contract.address +
            " transactionHash: " +
            contract.transactionHash
        );
      }
    }
  );




