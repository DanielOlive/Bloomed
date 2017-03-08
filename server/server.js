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


//define routes

// GET     /users             ->  index
// GET     /users/new         ->  new
// POST    /users             ->  create
// GET     /users/:user       ->  show
// GET     /users/:user/edit  ->  edit
// PUT     /users/:user       ->  update
// DELETE  /users/:user       ->  destroy

route.get('/directory', directoryRoutes.getList);
route.get('/directory/item/:id', directoryRoutes.getItem);
route.post('/directory/create', directoryRoutes.create);
route.post('/directory/edit', directoryRoutes.edit);
route.post('/directory/remove', directoryRoutes.remove);


// route.get('/directory/create', directoryRoutes.add);


/*router.get('/', function*(){
    this.body = 'Hello World!';
});*/

//close the rethinkDB connection
app.use(closeConnection);


// Retrieve all todos
function* getDirectory(next) {
    try{
        var cursor = yield r.table('directory').run(this._rdbConn);
        var result = yield cursor.toArray();
        this.body = JSON.stringify(result);
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

function* insertDirectory(next) {
    try{
        var list = yield parse(this);
        // list.createdAt = r.now(); // Set the field `createdAt` to the current time
        var result = yield r.table('directory').insert(list, {returnChanges: true}).run(this._rdbConn);
        list = result.new_val;
        this.body = JSON.stringify(list);
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

function * createVegetable(next){
    // console.log(this)
    var list = yield parse(this);
    console.log(list.id);
    try{
         /*var todo = yield parse(this);
        todo.createdAt = r.now(); // Set the field `createdAt` to the current time
        var result = yield r.table('directory').insert(todo, {returnChanges: true}).run(this._rdbConn);

        todo = result.changes[0].new_val; // todo now contains the previous todo + a field `id` and `createdAt`
        this.body = JSON.stringify(todo);*/

//var cursor = yield r.table('directory').get('vegetables').run(this._rdbConn);
        // var result = yield cursor.toArray();
        // this.body = JSON.stringify(result);

        //var result = cursor;
        this.body = JSON.stringify(result);

    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}



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