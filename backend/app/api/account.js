const { Router} = require('express');
const AccountTable = require('../account/table.js');
const AccountDragonTable = require('../accountDragon/table');
const {hash} = require('../account/helper');
const { sessionString } = require('../account/session');
const {setSession,autenticatedAccount} = require('./helper');
const { user } = require('../../secret/databaseConfig.js');
const Session = require('../account/session');
const {getDragonWithTrait} = require('../dragon/helper');


const router = new Router();

router.post('/signup',(req,res,next) => {
    const {username,password} = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({usernameHash})
    .then(({account})=>{
        if(!account){
            return AccountTable.storeAccount({usernameHash,passwordHash})  
        } else{
            const error = new Error('account existed');
            error.statusCode = 409;
            throw error;
        }
    })
    .then(()=>{
        return setSession({username,res});  
     })
    .then((message)=>{res.json ({message})})
    // the catch handler is able to catch any errors in any one of the then handler
    .catch( error => next(error));   
  
});



router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

  
    AccountTable.getAccount({ usernameHash: hash(username) })
      .then(({ account }) => {
        if (account && account.passwordHash === hash(password) && password!=null) {
          const { sessionId } = account;
        
          return setSession({ username, res, sessionId })
        } else {
          
          const error = new Error('Incorrect username or password');
          error.statusCode = 409;
  
          throw error;
        }
      })
      .then(({ message }) => res.json({ message }))
      .catch(error => next(error));
  });


router.get('/logout',(req,res,next) =>{
    const {username} = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({
        sessionId:null,
        usernameHash:hash(username)
    })
    .then(()=>{
        res.clearCookie('sessionString');
        res.json({message:'successful logout'});
    })
    .catch(error =>next(error));

});


router.get('/authenticated',(req,res,next) =>{
    const {sessionString} = req.cookies;

    autenticatedAccount({sessionString})
    .then(({authenticated})=>{
        res.json({authenticated});
    })
    .catch(error =>next(error));

});



router.get('/dragons',(req,res,next) =>{
  
  autenticatedAccount({sessionString: req.cookies.sessionString})
    .then(({account})=>{

        return AccountDragonTable.getAccountDragon({
            accountId: account.id
        })
    })
    .then(({accountDragons})=>{
        
        return Promise.all(
            accountDragons.map(accountDragon =>{
                return getDragonWithTrait({dragonId:accountDragon.dragonId})
            })
        )
        .then(dragons=>{
            res.json({dragons});
        })     
    })
    .catch(error =>next(error));

});


router.get('/info',(req,res,next)=>{
     autenticatedAccount({sessionString :req.cookies.sessionString})
     .then(({account,username})=>{
         res.json({info:{balance: account.balance,username}});
     })
     .catch(error =>next(error));
});





module.exports = router;