const pool =  require('../../databasepool');


class AccountDragonTable {
    // store incoming generation   
    //static can be direclty used without making instance
    static storeAccountDragon({accountId, dragonId}) {

        // JS promise helps to retrun the feneration id got from the sql table
        return new Promise((resolve,reject)=>{


            //console.log(accountId,dragonId);

            pool.query(

                'INSERT INTO accountDragon("accountId","dragonId") VALUES($1,$2)',
                [accountId,dragonId],
                (error,response) => {
                        if(error)  return reject(error);             
                        resolve()
                }
    
            );

        })
    }


    static getAccountDragon ({accountId}) {

        return new Promise((resolve,reject)=>{
            pool.query(
                'SELECT "dragonId"  FROM accountDragon WHERE "accountId" = $1',
                [accountId],
                (error,response) => {
                    if(error)  return reject(error);             
                    resolve({accountDragons:response.rows});
                }
            );
        });
    }

    static getDragonAccount({dragonId}){

        return new Promise((resolve,reject)=>{
            pool.query(
                'SELECT "accountId"  FROM accountDragon WHERE "dragonId" = $1',
                [dragonId],
                (error,response) => {
                    if(error)  return reject(error);             
                    resolve({accountId:response.rows[0].accountId});
                }
            );
        });

    }

    static updateDragonAccount({dragonId,accountId}){

        return new Promise((resolve,reject)=>{
            pool.query(
                'UPDATE accountDragon SET "accountId" =$1 where "dragonId" = $2',
                [accountId,dragonId],
                (error,response) => {
                    if(error)  return reject(error);             
                    resolve();
                }
            );
        });

    }

}





module.exports = AccountDragonTable;
