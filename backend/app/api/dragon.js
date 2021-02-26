// get request

const { Router} = require('express');
const AccountTable = require('../account/table');
const AccountDragonTable = require('../accountDragon/table');
const { getPublicDragons,getDragonWithTrait } = require('../dragon/helper');
const DragonTable = require('../dragon/table');
const {autenticatedAccount} = require('./helper');
const Breeder = require('../dragon/breeder');

const router = new Router();

// http get request
router.get('/new', (req,res, next)=> {

    let accountId, dragon;

    autenticatedAccount({sessionString: req.cookies.sessionString})
    .then(({account}) => {
        accountId = account.id;
        // call dragon generation
        dragon = req.app.locals.engine.generation.newDrag();
        return  DragonTable.storeDragon(dragon)

    })
    .then(({dragonId})=>{
         dragon.dragonId = dragonId;
         return AccountDragonTable.storeAccountDragon({accountId,dragonId});
    })
    .then(()=>{
        res.json({dragon});
    })
    .catch( error => next(error));
    
});

router.put('/update',(req,res,next)=>{
    const {dragonId, nickname,isPublic,saleValue,sireValue} = req.body;
    DragonTable.updateDragon({dragonId,nickname,isPublic,saleValue,sireValue})
    .then(()=>res.json({message:'update success'}))
    .catch(error => next(error));
});

router.get('/public-dragons', (req,res, next)=> {
     getPublicDragons()
     .then(({dragons})=>{
         res.json({dragons});
     })
     .catch(error =>next(error));
});



router.post('/buy',(req,res,next) =>{

    const{ dragonId, saleValue } = req.body;

    let buyerId;

    DragonTable.getDragon({dragonId})
    .then(dragon =>{

        //console.log("checking salevalue");

        if(dragon.saleValue !== saleValue){
            throw new Error('Value invalid');
        }
        if(!dragon.isPublic){
            throw new Erro('invalid Dragon');
        }  
        
        return autenticatedAccount({sessionString:req.cookies.sessionString});
    })

    .then(({account,authenticated})=>{
        if(!authenticated){
            throw Error('invalid session');
        }

        if(saleValue > account.balance){
            throw Error('Not enough money');
        }

        buyerId = account.id;

        return AccountDragonTable.getDragonAccount({dragonId});

    })

    .then(({accountId}) => {
        if(accountId == buyerId){
            throw Error('Cannot buy you own dragon :3');
        }

        const salerID = accountId;

        return Promise.all([
            AccountTable.updateBallance({
                accountId:buyerId, value: -saleValue
            }),
            AccountTable.updateBallance({
                accountId:salerID, value: saleValue
            }),
            AccountDragonTable.updateDragonAccount({
                dragonId, accountId:buyerId
            }),
            DragonTable.updateDragon({
                dragonId,isPublic:false
            })
        ])
    })
    .then(()=>res.json({message: 'success!'}))
    .catch(error => next(error));
});


router.post('/mate', (req, res, next) => {
    const { matronDragonId, patronDragonId } = req.body;


  
    if (matronDragonId === patronDragonId) {
      throw new Error('Cannot breed with the same dragon!');
    }
  
    let matronDragon, patronDragon, patronSireValue;
    let matronAccountId, patronAccountId;
  
    getDragonWithTrait({ dragonId: patronDragonId })
      .then(dragon => {
        if (!dragon.isPublic) {
          throw new Error('Dragon must be public');
        }
  
        patronDragon = dragon;
        patronSireValue = dragon.sireValue;
  
        return getDragonWithTrait({ dragonId: matronDragonId })
      })
      .then(dragon => {
        matronDragon = dragon;
  
        

        return autenticatedAccount({ sessionString: req.cookies.sessionString });
      })
      .then(({ account, authenticated }) => {
      

        if (!authenticated) throw new Error('Unauthenticated');
  
        if (patronSireValue > account.balance) {
          throw new Error('Sire value exceeds balance');
        }
  
        matronAccountId = account.id;
  
        return AccountDragonTable.getDragonAccount({ dragonId: patronDragonId });
      })
      .then(({ accountId }) => {

        patronAccountId = accountId;
  
        if (matronAccountId === patronAccountId) {
          throw new Error('Cannot breed your own dragons!');
        }
  
        const dragon = Breeder.breedDragon({ matron: matronDragon, patron: patronDragon });
  
        return DragonTable.storeDragon(dragon);
      })
      .then(({ dragonId }) => {

        Promise.all([
          AccountTable.updateBallance({
            accountId: matronAccountId, value: -patronSireValue
          }),
          AccountTable.updateBallance({
            accountId: patronAccountId, value: patronSireValue
          }),
          AccountDragonTable.storeAccountDragon({
            dragonId, accountId: matronAccountId
          })
        ]).then(() => res.json({ message: 'success!' }))
          .catch(error => next(error));
      });
  });



module.exports = router;