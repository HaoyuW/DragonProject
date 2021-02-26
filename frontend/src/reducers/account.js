import {ACCOUNT} from '../actions/types';
import  fetchState from './fetchState';

const DEFAULT_ACCOUNT = {
    loggedIn:false
};


const account = (state = DEFAULT_ACCOUNT, action) =>{
     
    switch(action.type){

        case ACCOUNT.FETCH:
            return {...state, status: fetchState.fetching};
        case ACCOUNT.FETCH_ERROR:
            return {...state,  status: fetchState.error,message: action.message};
        case ACCOUNT.FETCH_SUCCESS:
            return {
                ...state, 
                status: fetchState.success,
                message:action.message,
                loggedIn: true
            };

        case ACCOUNT.FETCH_LOGOUT_SUCCESS: 
           return {
               ...state, 
               status: fetchState.success,
               message:action.message,
               loggedIn:false
            }

        case ACCOUNT.FETCH_LOGIN_SUCCESS: 
            return {
                ...state, 
                status: fetchState.success,
                message:action.message,
                loggedIn:true
             }


        case ACCOUNT.FETCH_AUTH_SUCCESS:
            return{
                ...state,
                status:fetchState.success,
                message:action.message,
                loggedIn:action.authenticated
            }
        

        default:
            return state;
    }
}

export default account;
