const pool = require('../../databasepool');
const DragonTraitTable = require('../dragonTrait/table');

class DragonTable{

    static storeDragon (dragon) {
            
        const {birthday,nickname,generationId,isPublic,saleValue,sireValue} = dragon;

        //console.log('birthday', birthday);

        return new Promise( (resolve,reject) =>{

              pool.query(

                  `INSERT INTO dragon(birthday,nickname,"generationId","isPublic","saleValue","sireValue")
                   VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,
                   [birthday,nickname,generationId,isPublic,saleValue,sireValue],

                   (error,response) =>{
                    if(error)  return reject(error);
                    const dragonId = response.rows[0].id;


                    // resolve inter promise sychronizly?
                    Promise.all(dragon.traits.map(({traitType,traitValue}) => {
                                   
                        return DragonTraitTable.storeDraonTrait({
                               dragonId,traitType,traitValue
                        });
                    }))
                    .then(()=> resolve({dragonId}))
                    .catch(error => reject(error))              
                   }
              )
        });

    }

    static getDragon({dragonId}){
        return new Promise( (resolve,reject) =>{

            pool.query(

                `SELECT birthday,nickname,"generationId","isPublic","saleValue","sireValue"
                 FROM dragon 
                 WHERE dragon.id = $1`,
                 [dragonId],

                 (error,response) =>{
                      if (error) return reject(error);
                      if(response.rows.length === 0) return reject(new Error('no dragons'));
                      resolve(response.rows[0]);
                 }
            )
      });
    }

    static updateDragon({dragonId,nickname,isPublic,saleValue,sireValue}){

        const settingMap = { nickname,saleValue,isPublic,sireValue};

        const validQueries = Object.entries(settingMap).filter(([settingKey,settingVlaue])=>{
        
            if(settingVlaue!==undefined){
                return new Promise( (resolve,reject) =>{
                    pool.query(

                        `UPDATE dragon SET "${settingKey}"  = $1 WHERE id = $2  `,
                        [settingVlaue,dragonId],
                        (error,response) =>{
                             if (error) return reject(error);                   
                             resolve();
                        }
                      
                    );
                });
            }
        });

        return Promise.all(validQueries);
    }
}


module.exports = DragonTable;