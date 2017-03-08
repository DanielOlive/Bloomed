var _ = require('lodash');
var r = require('rethinkdb');

//Middleware and helpers
var parse = require('co-body');
/*
// delete a vegetable
 * main vegatable list
*/

// let Directory = directory;

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

module.exports.getItem = function * (next){}

// create a new vegatable or if it exists update it
module.exports.create = function * (next){
     console.log(this);

    try{        
        var list = yield parse(this);
        
        list.created_on = r.now();
        list.updated_on = r.now();

        var result = yield r.table('directory').insert(list, conflict="replace", {returnChanges: true}).run(this._rdbConn);
        list = result.changes[0].new_val;
        this.body = JSON.stringify(list);
        
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

// update and existing vegatable
module.exports.edit = function * (next){
    try{
        var item = yield parse(this);
        
        if(item.id === undefined){
            throw new Error("The item must have a field `id`.");
        }

        item.updated_on = r.now();
        var result = yield r.table('directory').get(item.id).update(item, {returnChanges: true}).run(this._rdbConn);
        item = result.changes[0].new_val;
        this.body = JSON.stringify(item);
        
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}

module.exports.remove = function * (next){
    try{
        var item = yield parse(this);
        console.log();

        if(item.id === undefined){
            throw new Error("The item must have a field `id` to delete.");
        }

        var result = yield r.table('directory').get(item.id).delete({returnChanges: true}).run(this._rdbConn);
        item = result.changes[0];
        
        this.body = JSON.stringify(item);
    }
    catch(e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
}




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
