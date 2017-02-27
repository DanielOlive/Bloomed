var _ = require('lodash');
var r = require('rethinkdb');

//Middleware and helpers
var parse = require('co-body');
/*
// delete a vegetable
 * main vegatable list
*/

// get main directory list
module.exports.getList = function * (next){
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

// create a new vegatable
module.exports.add = function * (next){
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

// update and existing vegatable
function * editItem(next){}

function * removeItem(next){}


/*
 * vegatable sub varieties
*/

// get all varieties
function * getVarietyList(next){}

// create and append a new variety
function * createVarietyItem(next){}

// update a variety
function * editVarietyItem(next){}

// delete a variety
function * removeVarietyItem(next){}
