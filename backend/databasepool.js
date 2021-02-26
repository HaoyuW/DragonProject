const {Pool}  = require('pg');  // pool module from postgress sql
const databaseconfig = require('./secret/databaseConfig');

const pool = new Pool(databaseconfig);

module.exports = pool;

// make sure pool work properly using query method   () => {}  ===> a call back functiion
// pool.query('SELECT * FROM generation', (error,response)=>{
     
//     if(error)  return console.log('error', error);
   
//     console.log('response.rows',response.rows);

// } )


