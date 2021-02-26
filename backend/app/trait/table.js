const pool = require('../../databasepool');


class TraitTable{
   static getTraitId({traitType,traitValue}){
          
       return new Promise((resolve,reject)=>{

           //console.log('check type', traitType);
           //console.log('check value', traitValue);

           pool.query(
               'SELECT id FROM trait WHERE "traitType" = $1 AND "traitValue" = $2',
               [traitType,traitValue],
               //["backgroundColor","green"],
               (error,response) =>{
                if(error)  return reject(error);
                resolve({traitId:response.rows[0].id});                
               }
           );
       });
   }
}


TraitTable.getTraitId({traitType:"backgroundColor", traitValue: "green"})
.then(({traitId})=>console.log('ID',traitId))
.catch(error => console.error(error));


module.exports = TraitTable;