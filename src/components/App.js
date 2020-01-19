import React, { Component } from 'react';
import Web3 from 'web3';
import Color from '..//abis/color.json'
import './App.css';
import { stripColor } from 'ansi-colors';


class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  
  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else
      window.alert(' consider metamask');
  }

  async loadBlockchainData(){
    const web3 = window.web3;
    const accounts = web3.eth.getAccounts();
    this.setState({account: accounts[0]});

    const networkId = await web3.eth.net.getId();
    const networkData = await Color.networks[networkId];
    if(networkData!=null){
      const abi= Color.abi
      const address = networkData.address
      const myContract = new web3.eth.Contract(abi,address);
    }
    else{
      alert('Smart contract is not deployed');
    }
   
  }

  constructor(props){
    super(props);
    this.state = { 
      account:' '
    };

  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://github.com/utkarshtrivedi56"
            target="_blank"
            rel="noopener noreferrer"
          >
            ERC-721 Tokens
          </a>
          <ul className= "navbar-nav px-3">
            <li className = "nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className = "text-whites">
                <span id = "account" >
                  {this.state.account}
                </span>
              </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">

              </div>
            </main>
          </div>
          <div className="row text-center">
            <p>tokens goes here..</p>
          </div>  
        </div>
      </div>
    );
  }
}

export default App;
