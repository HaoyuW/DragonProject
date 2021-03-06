// root index

const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const GenerationEngine = require('./generation/engine.js');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');
const accountRouter = require('./api/account');
const cookieParser = require('cookie-parser');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;


app.use(cors({origin:'http://localhost:1234',credentials:true})); // securtiy mesaurement : tursted froned: 'http://localhost:1234'
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/account',accountRouter);
app.use('/dragon',dragonRouter);
app.use('/generation',generationRouter);


// error handler
app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500;

    // response to the user
    res.status(statusCode).json({
        type: 'error', message: err.message
    })

} );

engine.start();

module.exports = app;