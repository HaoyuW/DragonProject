import React, {Component }from 'react';
import{connect} from 'react-redux';
import { Link } from 'react-router-dom'
import {fetchAccountDragons} from '../actions/accountDragon';
import AccountDragonRow from './AccountDragonRow';

class AccountDragons extends Component {
    componentDidMount(){
        this.props.fetchAccountDragons();
    }

    render(){
        return(
            <div>
                <h3>ACCOUNT DRAGONS</h3>
                {
                    this.props.accountDragons.dragons.map(
                        dragon =>{
                            return(
                                <div key = {dragon.dragonId}>
                                      <AccountDragonRow  dragon = {dragon}/>
                                      <hr />
                                </div>
                            );
                          
                        }
                    )
                }

            <Link to = "/"> Home </Link> 
            </div>
        );
    }
}


export default connect(
    ({accountDragons})=>({accountDragons}),
    {fetchAccountDragons}
)(AccountDragons);