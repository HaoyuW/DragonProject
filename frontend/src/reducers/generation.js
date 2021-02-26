import {GENERATION} from '../actions/types';
import  fetchState from './fetchState'



const DEFAULT_GENERATION = {generationId:'', expiration:''};


const generationReducer = (state = DEFAULT_GENERATION,action) =>{
     
      switch(action.type){

          case GENERATION.FETCH:
              return {...state, status: fetchState.fetching};
          case GENERATION.FETCH_ERROR:
              return {...state,  status: fetchState.error,message: action.message};
          case GENERATION.FETCH_SUCCESS:
              return{...state, status: fetchState.success,...action.generation};

          default:
              return {state};

      }
}

export default generationReducer;