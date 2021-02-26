import React, {Component }from 'react';
import{connect} from 'react-redux';
import {fetchAccountInfo} from '../actions/accountinfo';

class AccountInfo extends Component {
   componentDidMount(){
    this.props.fetchAccountInfo();
   }

   render(){
       return(
           <div>
               <h3>ACCOUNT INFO</h3>
               <div>UserName: {this.props.accountInfo.username}</div>
               <div>Balance: {this.props.accountInfo.balance}</div>
           </div>
       )
   }
   

}

export default connect(
    ({accountInfo})=>({accountInfo}),
    {fetchAccountInfo}
)(AccountInfo);