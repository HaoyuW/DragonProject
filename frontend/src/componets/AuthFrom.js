import React, {Component }from 'react';
import{connect} from 'react-redux';
import {Button,FormGroup,FormControl} from 'react-bootstrap'
import {signup,login} from '../actions/account';
import fetchState from '../reducers/fetchState';

class AuthForm extends Component{

    state = { username: '', password: '',buttonClicked: false}; 

    updateUsername = event =>{
        
        this.setState({ username :event.target.value});
    }


    updatePassword = event =>{
        
        this.setState({ password :event.target.value});
    }


    signup =()=>{

        this.setState({ buttonClicked:true});
        //console.log('thhis.state',this.state);
        const {username,password} = this.state;
        this.props.signup({username,password});
    }

    login =()=>{

        this.setState({ buttonClicked:true});
        //console.log('this.state',this.state);
        const {username,password} = this.state;
        this.props.login({username,password});
    }

    //js computed property instead of function
    // get Error () {

    //    console.log('sth needs to be fixed',this.props.account.message);
    //    if(this.state.buttonClicked){
       
    //        if (this.props.status === fetchState.error){
               
    //            return <div> {this.props.account.message} </div>
    //         }
    //     }
    // }

    render(){
        return(
            <div>  
                <h2>DG</h2> 

                <FormGroup>
                    <FormControl 
                       type = 'text'
                       value={this.state.username}
                       placeholder = 'username'
                       onChange = {this.updateUsername}
                    />
                </FormGroup>

                <FormGroup>
                    <FormControl 
                       type = 'password'
                       value={this.state.password}
                       placeholder = 'password'
                       onChange = {this.updatePassword}
                    />
                </FormGroup>

                <div>
                    <Button onClick={this.login}>Log In</Button>
                    <span> or </span>
                    <Button onClick={this.signup}>Sign Up</Button>  
                   
                </div>

            </div>
            
        );
    }
};


export  default connect(
    //mapstatetoprop    
    ({account}) =>({account}),
    //map dispatchto prop is the function signup
    {signup,login}
)
(AuthForm);