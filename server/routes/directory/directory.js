//Middleware and helpers
var config = require('../../config');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk(config.mongodb.host);
var parse = require('co-body');
var http = require('http');
var directory = wrap(db.get('directory'));

// get main directory list
module.exports.getList = function* (next) {
    // console.log(this);
    try {
        this.body = yield directory.find({});
    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

/* Returns a vegetable using an id*/
module.exports.getItemById = function* (next) {
    try {

        this.body = yield directory.findOne({_id: this.params.id});

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

/* Returns a vegetable using a name*/
module.exports.getItemByName = function* (next) {
    try {
        this.body = yield directory.findOne({name: this.params.name});

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

// create a new vegetable or if it exists update it
module.exports.create = function * (next) {

    try {
        let list = yield parse(this);
        list.created_on = list.updated_on = new Date();

        this.body = yield directory.update({name: list.name}, list, {upsert: true});

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

// update an existing vegetable
module.exports.edit = function* (next) {
    try {

        let item = yield parse(this);
        let id = item._id.$oid;

        item.updated_on = new Date();
        delete item._id; //remove the id as _id cannot be overridden
        console.log(id);
        this.body = yield directory.findOneAndUpdate({_id: id}, item);

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

module.exports.remove = function* (next) {
    console.log(this.params);
    try {
        this.body = yield directory.remove({_id: this.params.id});

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};





/*
 * vegetable sub varieties
 */

// get all varieties
function* getVarietyList(next) {}

// create and append a new variety
function* createVarietyItem(next) {}

// update a variety
function* editVarietyItem(next) {}

// delete a variety
function* removeVarietyItem(next) {}
