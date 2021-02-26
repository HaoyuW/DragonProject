const { REF_RATE, SECOND } = require('../config');
const Dragon = require('../dragon/index');

const refRate = REF_RATE*SECOND;



class Generation {
    
    constructor(){        
        this.expiration = this.calculateExpiration();  
        this.generationId = undefined;
    }


    
    calculateExpiration() {
        const period = Math.floor(Math.random()*(refRate/2));
        const msUntilExpire = Math.random() < 0.5 ? refRate - period : refRate + period;
        return  new Date( Date.now() + msUntilExpire);
    }


    newDrag(){
          
        if(Date.now() > this.expiration){
            throw new Error(`gen exipred on  ${this.expiration}`);
        }

        return new Dragon({generationId:this.generationId});
    }



    
}


module.exports = Generation;