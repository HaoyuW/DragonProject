import {ACCOUNT_INFO} from '../actions/types';
import  fetchState from './fetchState'

const accountInfo =( state = {},action)=>{
    switch(action.type){
        case ACCOUNT_INFO.FETCH:
            return {...state, status: fetchState.fetching};
        case ACCOUNT_INFO.FETCH_ERROR:
            return {...state,  status: fetchState.error,message: action.message};
        case ACCOUNT_INFO.FETCH_SUCCESS:
            return {
                ...state, 
                status: fetchState.success,
                message:action.message,
                ...action.info
            };
        
        default:
            return state;
        
    }
}


export default accountInfo;