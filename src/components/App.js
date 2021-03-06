import React, { Component } from 'react';
import Web3 from 'web3';
import Color from '..//abis/color.json'
import './App.css';
//import { stripColor } from 'ansi-colors';


class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  
  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      ethereum.autoRefreshOnNetworkChange = false;
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
    this.setState({account : accounts[0]});

    const networkId = await web3.eth.net.getId();
    const networkData = await Color.networks[networkId];
    if(networkData!=null){
      const abi= Color.abi
      const address = networkData.address
      const myContract = new web3.eth.Contract(abi,address);
      this.setState({contract: myContract})
      const totalSupply = await myContract.methods.totalSupply.call();
      this.setState({totalSupply})
      // Load the colors
      for( var i =1 ;i<=totalSupply;i++){
        const color = await myContract.method.colors(i-1).call();
        this.setState({
          colors:[...this.setState.colors,color]
        }) 
      }
      console.log(this.state.colors);
    }
    // else{
    //   alert('Smart contract is not deployed on this network');
    // }
  }

  mint = (color)=> {
    console.log(color)
    this.state.contract.methods.mint().send({from:this.state.account})
    .once('receipt',(receipt)=>{
      this.setState({
        colors : [...this.setState.colors,color]
      })
    })
  }

  constructor(props) {
    super(props);
    this.state = {
        account: " ",
        contract: null,
        totalSupply : 0,
        colors : []
      };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0 text-white" rel="noopener noreferrer" href=" ">
            ERC-721 Color Tokens
          </a>
          <ul className= "navbar-nav px-3">
            <li className = "nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className = "text-white">
                  {this.state.accounts}
              </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Issue Tokens</h1>
                <form onSubmit={(event)=>{
                  event.preventDefault()
                  const color = this.color.value;
                  this.mint(color);
                }}>
                  <input 
                  type='text' 
                  className='form-control mb-1' 
                  placeholder='e.g. #FFFFFF'
                  ref={(input)=>{this.color = input}}  
                  />
                  <input type='submit' className='btn btn-block btn-primary' value='MINT'/>
                </form>
              </div>
            </main>
          </div>
          <div className="row text-center">
            {this.state.colors.map((color,key)=>{
                return(<div key = {key} className= "col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor:color}}></div>
                  <div>{color}</div>
                  </div>
                )
            })}
          </div>  
        </div>
      </div>
    );
  }
}  


export default App;
