const { response } = require('express');
const pool = require('../../databasepool');
const DragonTable = require('./table');
const Dragon = require('./index');

//get dragon detail 
const getDragonWithTrait = ({dragonId}) =>{
    return Promise.all([
           DragonTable.getDragon({dragonId}),
           // get dragon traits
           new Promise((resolve,reject) => {
               pool.query(
                   `SELECT "traitType","traitValue"
                    FROM trait
                    INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
                    WHERE dragonTrait."dragonId" = $1`,
                    [dragonId],
                    (error,response) => {
                        if (error) return reject(error);
                        resolve(response.rows);
                    }
               )
           })
    ])
    .then(([dragon,dragonTraits])=>{
          return new Dragon({
              ...dragon,dragonId,traits:dragonTraits,
          })
    })
    .catch(error =>console.error(error));
};


const getPublicDragons =()=>{
    return new Promise( (resolve,reject) =>{
        pool.query(
            'SELECT id FROM dragon WHERE "isPublic" =TRUE',
            (error,response) => {
                if (error) return reject(error);
                
                const publicDragonRows = response.rows;

                Promise.all(
                    publicDragonRows.map(
                        ({ id }) => getDragonWithTrait({dragonId:id})
                    )
                ).then( dragons => resolve({dragons}))
                .catch(error =>reject(error));            
            }
        )
    });
}

// getDragonWithTrait({dragonId: 1})
// .then(dragon => console.log(dragon))
// .catch(error => console.error(error));

module.exports = {getDragonWithTrait,getPublicDragons};