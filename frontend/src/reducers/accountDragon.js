import {ACCOUNT_DRAGON} from '../actions/types';
import  fetchState from './fetchState';

const DEFAULT_ACCOUNT_DRAGONS = {
    dragons:[]
};


const accountDragons =( state = DEFAULT_ACCOUNT_DRAGONS,action)=>{
    switch(action.type){
        case ACCOUNT_DRAGON.FETCH:
            return {...state, status: fetchState.fetching};
        case ACCOUNT_DRAGON.FETCH_ERROR:
            return {...state,  status: fetchState.error,message: action.message};
        case ACCOUNT_DRAGON.FETCH_SUCCESS:
            return {
                ...state, 
                status: fetchState.success,
                message:action.message,
               dragons:action.dragons
            };
        
        default:
            return state;
        
    }
}


export default accountDragons;