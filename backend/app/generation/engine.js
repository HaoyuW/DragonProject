const Generation  = require('./index.js');
const GenerationTable = require('./table');

class  GenerationEngine{
    
  constructor(){
    this.generation = null;
    this.timer = null;
  } 

  start(){
    this.buildGeneration();
  }

  stop(){
   clearTimeout(this.timer);
  }

  buildGeneration(){

    const generation = new Generation();
    // store the current gen to the gentable
    // then handler handles resovles value from the promises
    GenerationTable.storeGeneration(generation)

    .then(({generationId})=>{
      
        this.generation = generation; // in case the store generation process fail
        this.generation.generationId = generationId;

        //console.log('new Gen',this.generation);
        
        this.timer = setTimeout( 
            () => this.buildGeneration(), 
            this.generation.expiration.getTime() - Date.now()
        );

    })
    
    .catch(error => console.error(error));    

  }

}


module.exports = GenerationEngine;