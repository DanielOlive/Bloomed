var koa = require('koa');
var path = require('path');

//Middleware and helpers
var parse = require('co-body');
var serve = require('koa-static');
var route = require('koa-router')();
var r = require('rethinkdb');
var http = require('http');

//routes

let directoryRoutes = require('./routes').directory;


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
    // .use(route.allowedMethods());

route.get('/directory', directoryRoutes.getList);
route.get('/directory/item/:id', directoryRoutes.getItem);
route.post('/directory/create', directoryRoutes.create);
route.post('/directory/edit', directoryRoutes.edit);
route.post('/directory/remove', directoryRoutes.remove);

//close the rethinkDB connection
app.use(closeConnection);

//create a rethingDb connection and saveit in req._rdbConn
function* createConnection(next) {
    try{
        var conn = yield r.connect(config.rethinkdb);
        this._rdbConn = conn;
    }
    catch(err) {
        this.status = 500;
        this.body = err.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

function* closeConnection(next) {
    this._rdbConn.close();
}

function startKoa() {
    app.listen(config.koa.port);
    console.log('Listening on port ' + config.koa.port);
}
startKoa();