import {PUBLIC_DRAGONS} from '../actions/types';
import  fetchState from './fetchState'


const DEFALUT_PUBLIC_DRAGONS ={
    dragons: []
}


const publicDragons = (state = DEFALUT_PUBLIC_DRAGONS, action) =>{
     
    switch(action.type){

        case PUBLIC_DRAGONS.FETCH:
            return {...state, status: fetchState.fetching};
        case PUBLIC_DRAGONS.FETCH_ERROR:
            return {...state,  status: fetchState.error,message: action.message};
        case PUBLIC_DRAGONS.FETCH_SUCCESS:
            return{...state, status: fetchState.success,dragons:action.dragons};

        default:
            return state;
    }
}

export default publicDragons;