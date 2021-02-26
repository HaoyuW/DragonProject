import React, {Component }from 'react';
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import Generation from'./Generation';
import Dragon from './dragon';
import AccountInfo from './accountInfo';
import{ logout} from '../actions/account';
import root from './root';


class Home extends Component{
    render(){
       return(
        <div> 
            <Button onClick ={this.props.logout} className = 'logout-button'> 
            LOG OUT 
            </Button>

            <h2>Dragon Stack</h2>
            <Generation/>
            <Dragon/>
            <hr />
            <AccountInfo/>
            <hr />
            <Link to = "/AD"> Dragons </Link> 
            <br/>   
            <Link to ='/public-dragons'> Public Dragon </Link>             
        </div>
       );
    }
};


export default connect(null,{logout})(Home);