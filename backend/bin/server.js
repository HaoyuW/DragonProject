const app = require('../app/index');

const port = 3000;


// use port 3000, listen the request
app.listen(port, ()=> console.log(`listening on port ${port}`));