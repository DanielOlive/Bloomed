// https://github.com/rethinkdb/rethinkdb-example-nodejs/blob/master/todo-angular-koa/app.js
// https://medium.com/@fabianomonte/criando-um-crud-simples-com-koa-67d9b99a71b4#.gepl1euz9


r = require('rethinkdb')

var connection = null;

//Open a connection
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  if(err) throw err;
  connection = conn;
  
  //Create a new table
    // r.db('test').tableCreate('authors').run(connection, function(err, result) {
    //     if (err) throw err;
    //     console.log(JSON.stringify(result, null, 2));
    // })


//Insert data
/*    r.table('authors').insert([
    { name: "William Adama", tv_show: "Battlestar Galactica",
      posts: [
        {title: "Decommissioning speech", content: "The Cylon War is long over..."},
        {title: "We are at war", content: "Moments ago, this ship received word..."},
        {title: "The new Earth", content: "The discoveries of the past few days..."}
      ]
    },
    { name: "Laura Roslin", tv_show: "Battlestar Galactica",
      posts: [
        {title: "The oath of office", content: "I, Laura Roslin, ..."},
        {title: "They look like us", content: "The Cylons have the ability..."}
      ]
    },
    { name: "Jean-Luc Picard", tv_show: "Star Trek TNG",
      posts: [
        {title: "Civil rights", content: "There are some words I've known since..."}
      ]
    }
]).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
})*/


//All documents in a table
/*r.table('authors').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
});*/


//Filter documents based on a condition
//eq command returns true if two values are equal (in this case, the field name and the string William Adama)
/*r.table('authors').filter(r.row('name').eq("William Adama")).
    run(connection, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    });*/

//retrieve all authors who have more than two posts:
/*r.table('authors').filter(r.row('posts').count().gt(2)).
    run(connection, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    });*/

//Retrieve documents by primary key
/*r.table('authors').get('c6c07369-6ca4-4ee0-b94c-790dcff1de24').
    run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });*/

//Realtime feeds
/*r.table('authors').changes().run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.each(function(err, row) {
        if (err) throw err;
        console.log(JSON.stringify(row, null, 2));
    });
});*/

//Update all documents
/*r.table('authors').update({type: "fictional"}).
    run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });*/

//Update Single document
/*r.table('authors').
    filter(r.row("name").eq("William Adama")).
    update({rank: "Admiral"}).
    run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });*/

//update the posts array for a author
/*r.table('authors').filter(r.row("name").eq("Jean-Luc Picard")).
    update({posts: r.row("posts").append({
        title: "Shakespeare",
        content: "What a piece of work is man..."})
    }).run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });   */ 

//deleting documents
//delete every document with less than three posts
/*r.table('authors').
    filter(r.row('posts').count().lt(3)).
    delete().
    run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    }); */   

});

