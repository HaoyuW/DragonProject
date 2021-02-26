import React, {Component }from 'react';
import {connect} from 'react-redux'
import {fetchGeneration} from '../actions/generation'
import  fetchState from '../reducers/fetchState'

const MIN_DELAY  = 3000;

class Generation extends Component{


    timer = null;

    componentDidMount(){
        this.fetchNextGeneration();
    }

     // perfrom clean up 
    componentWillUnmount(){
        // clear setTIme out
        clearTimeout(this.timer);
    }


    fetchNextGeneration = () =>{
        this.props.fetchGeneration();
     
        let delay = new Date(this.props.generation.expiration).getTime() - new Date().getTime(); //get the actual delay into ms. 
        if(delay < MIN_DELAY){
            delay = MIN_DELAY;
        }

        // this. timer refers the next pending settime out call
        this.timer = setTimeout(()=>this.fetchNextGeneration(),delay);
    }

    render(){
         
       //console.log('this.props', this.props);

       const{ generation } = this.props;


       if(generation.status === fetchState.error){
        return <div>{generation.message}</div>;
       }

        return(
           <div>
               <h3>Generation {generation.generationId}. Expires on:   </h3>
               <h4> {new Date(generation.expiration).toString()}</h4>
           </div>
        )
    }
}



const mapStateToProps = state =>{

    const generation = state.generation;
    return {  generation };

};




const componentConnector = connect(
    mapStateToProps,
    {fetchGeneration}
    );

export default componentConnector(Generation);

