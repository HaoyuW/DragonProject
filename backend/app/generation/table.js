// interact with the generation table

// ../ means one directory back
const pool =  require('../../databasepool');

class GenerationTable {
    // store incoming generation   
    //static can be direclty used without making instance
    static storeGeneration(generation) {

        // JS promise helps to retrun the feneration id got from the sql table
        return new Promise((resolve,reject)=>{

            pool.query(

                //$1 means insert the fisrt value of the following array []    
                // retruned id is in the response obj      
                'INSERT INTO generation(expiration) VALUES($1) RETURNING id',
                [generation.expiration],
                (error,response) => {
                        if(error)  return reject(error);
                        const generationId = response.rows[0].id;
                        resolve({generationId})
                }
    
            );

        })
    }
}


module.exports = GenerationTable;
