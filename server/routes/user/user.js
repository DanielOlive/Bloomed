//Middleware and helpers
let config = require('../../config');
let monk = require('monk');
let wrap = require('co-monk');
let db = monk(config.mongodb.host);
let parse = require('co-body');
let http = require('http');
let user = wrap(db.get('user'));

module.exports.getList = function* (next) {
    try {
        this.body = yield user.find({});
    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

module.exports.getItemById = function* (next) {
    try {

        this.body = yield user.findOne({_id: this.params.id});

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

module.exports.getItemByName = function* (next) {
    try {
        this.body = yield user.findOne({name: this.params.name});

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

// create a new vegetable or if it exists update it
module.exports.create = function * (next) {

    try {

        /* Code to check for a user
        var test = yield user.findOne({_id: id});
        console.log(test.email);*/

        //Todo: do not insert if user email exists
        let list = yield parse(this);
        list.created_on = list.updated_on = new Date();

        this.body = yield user.update({email: list.email}, list, {upsert: true});

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

module.exports.edit = function* (next) {
    try {


        let item = yield parse(this);
        let id = item._id;
        //console.log(item, id);
        item.updated_on = new Date();
        delete item._id; //remove the id as _id cannot be overridden

        this.body = yield user.findOneAndUpdate({_id: id}, {$set:item});

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};

module.exports.remove = function* (next) {
    try {
        this.body = yield user.remove({_id: this.params.id});

    } catch (e) {
        this.status = 500;
        this.body = e.message || http.STATUS_CODES[this.status];
    }
    yield next;
};
