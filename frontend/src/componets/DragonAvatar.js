import React, {Component }from 'react';
import { skinny, slender, sporty, stocky, patchy, plain, spotted, striped } from '../assets/index';
//import '../index.css'

const propertyMap = {

  backgroundColor:{
    black: '#263238',
    white: '#cfd8dc',
    green: '#a5d6a7',
    blue:  '#0277bd'
  },

  build:{slender,stocky,sporty,skinny},
  pattern:{plain,striped,spotted,patchy},
  size:{small:100,medium:120,larger:140,enormou:160}
};

//pass dragon.js to this js 

class DragonAvatar extends Component{

  

  get DragonImage(){

    const dragonPropertyMap = {};

    this.props.dragon.traits.forEach(trait => {
      const { traitType, traitValue } = trait;
      dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
    });

    const { backgroundColor, build, pattern, size } = dragonPropertyMap;

    const sizing = { width: size, height: size };

    // return(
    //   <div className = 'dragon-wrapper'>
    //     <div className = 'dragon-b' style ={{backgroundColor, ...sizing}}></div>
    //     <img src = {pattern} className = 'dragon-p' style = {{...sizing}}/>
    //     <img src = {build} className = 'dragon-i' style = {{...sizing}}/>
    //   </div>
    // );

  }


  render(){

    // props passes the dragon data from dragon.js to this js
    const {generationId,dragonId,traits}  =this.props.dragon;

    if(!dragonId) return <div></div>;

    return(
        <div>
            <span>G{generationId}.</span> 
            <span>I{dragonId}.</span> 

            { traits.map(trait => trait.traitValue).join(', ') }
            {this.DragonImage}
        </div>
    )
  }


}

export default DragonAvatar;