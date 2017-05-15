var koa = require('koa');
var path = require('path');


//Middleware and helpers
var parse = require('co-body');
var serve = require('koa-static');
var route = require('koa-router')();

var http = require('http');

//routes
let directoryRoutes = require('./routes').directory;
let userRoutes = require('./routes').user;


//load config file here
var config = require(__dirname + '/config.js');


var app = koa();


//static content
// app.use(serve(path.join(__dirname, '../public')));

//create RethingDB connection
app.use(createConnection);

/*app
  .use(router.routes())
  .use(router.allowedMethods());*/

app.use(route.routes());
 //.use(route.allowedMethods());

app.use(function *(){
    this.set('Access-Control-Allow-Origin', '*');
    //this.set('Access-Control-Allow-Origin'. 'http://localhost:3000');
});


route.get('/directory', directoryRoutes.getList);
route.get('/directory/:id', directoryRoutes.getItemById);
route.get('/directory/name/:name', directoryRoutes.getItemByName);
route.post('/directory/create', directoryRoutes.create);
route.post('/directory/edit', directoryRoutes.edit);
route.del('/directory/remove/:id', directoryRoutes.remove);


/*USER ROUTES*/
route.get('/user', userRoutes.getList);
route.get('/user/:id', userRoutes.getItemById);
route.get('/user/name/:name', userRoutes.getItemByName);
route.post('/user/create', userRoutes.create);
route.post('/user/edit', userRoutes.edit);
route.del('/user/remove/:id', userRoutes.remove);


//close the rethinkDB connection
app.use(closeConnection);

//create a rethingDb connection and saveit in req._rdbConn
function* createConnection(next) {
    try {
        /*var conn = yield r.connect(config.rethinkdb);
        this._rdbConn = conn;*/
        
    } catch (err) {
        this.status = 500;
        this.body = err.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

function* closeConnection(next) {
    // this._rdbConn.close();
}

function startKoa() {
    app.listen(config.koa.port);
    console.log('Listening on port ' + config.koa.port);
}
startKoa();