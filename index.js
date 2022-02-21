var pg = require('pg');
var fs = require('fs');

var sql_schema = fs.readFileSync('project/hello/world_schema.sql').toString();
var sql_data = fs.readFileSync('project/hello/world_data.sql').toString();
var sql_query = fs.readFileSync('project/hello/world_query.sql').toString();

var sql_file = sql_schema + sql_data + sql_query;

/*
var arr_sql = sql_file.replace(/(\r\n|\n|\r)/gm," ") // remove newlines
    .replace(/\s+/g, ' ') // excess white space
    .split(";") // split into all statements
    .map(Function.prototype.call, String.prototype.trim)
    .filter(function(el) {return el.length != 0}); 
*/

var arr_sql = sql_file
	.replace(/(--[^.].*)/gm,'')
	.replace(/(\r\n|\n|\r)/gm,' ')
    .split(';'); // split into all statements

arr_sql.forEach(function(statement){
	console.log('line: ' + statement);
});

// 'postgres://test:test@localhost/test'
const pg_url = process.env.PG_URL;

console.log('prepare to connect');
var pg_pool = new pg.Pool({
  connectionString: pg_url,
})
console.log('connect');
pg_pool.connect(function(err, client, done){
	console.log('enter pool');
    if(err){
        console.log('error: ', err);
        process.exit(1);
    }

	var do_query = function(statement, callback){
		client.query(statement, function(err, result){
			if(err){
				console.log('error: ', err);
				process.exit(1);
			}
			else {
				// console.log('ok');
				// console.log('result: ' + JSON.stringify(result.rows));
				callback(result);
			}
			//process.exit(0);
		});
	};

	console.log('query');
	// arr_sql.forEach(function(statement) {
	var do_query_array = function(arr_statements) {
		if(arr_statements.length) {
			statement = arr_statements.shift();
			console.log(statement);
			do_query(statement, function(result){
				result.rows.length
					? console.log('result: ' + JSON.stringify(result.rows))
					: console.log('result: empty');
				
				do_query_array(arr_statements);
			})
		}
		else {
			done();
		}
	};
	do_query_array(arr_sql);
});
console.log('connected');

/*
if (err) {
	console.log("not able to get connection " + err);
	res.status(400).send(err);
}
client.query("SELECT * FROM Users where id= $1", [1], function(err, result) {
	done();
	if (err) {
		console.log(err);
		res.status(400).send(err);
	}
	res.status(200).send(result.rows);
});
*/

// pool shutdown
//pg_pool.end()


// https://api.elephantsql.com/

// https://stackoverflow.com/questions/22636388/import-sql-file-in-node-js-and-execute-against-postgresql
// https://stackoverflow.com/questions/55127223/pendingitem-callback-is-not-a-function