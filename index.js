var pg = require('pg');
var fs = require('fs');

var sql = fs.readFileSync('project/hello/world_schema.sql').toString();

// 'postgres://test:test@localhost/test'
const pg_url = process.env.PG_URL;

pg.connect(pg_url, function(err, client, done){
    if(err){
        console.log('error: ', err);
        process.exit(1);
    }
    client.query(sql, function(err, result){
        done();
        if(err){
            console.log('error: ', err);
            process.exit(1);
        }
        process.exit(0);
    });
});


// https://stackoverflow.com/questions/22636388/import-sql-file-in-node-js-and-execute-against-postgresql