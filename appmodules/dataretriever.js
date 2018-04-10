// This module will retrieve data from data base and will create database if it not existed
var mysql = require('mysql');

//establish a connection with credentials
var conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "website"
});

//connect to the database
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Retrieving all data from database via GET Method
var retrieveGet = function (callback, obj) {
	var sql;
	if (obj.page && obj.limit) {
		sql = "SELECT * FROM blogs ORDER BY id DESC LIMIT " + obj.limit + " OFFSET " + obj.page;
	} else {
		sql = "SELECT * FROM blogs ORDER BY id DESC LIMIT 3 OFFSET 0";
	}
	conn.query(sql, function (err, result, fields) {
		if (err) throw err;
		var obj = [];
		for (var i = 0; i < result.length; i++) {
			obj.push({'id': result[i].id, 'title': result[i].title, 'body': result[i].body, 'category': result[i].category, 'url': result[i].url});
		}
		callback(null,obj);
		console.log(obj);
	});
};

// retrieve the total number of items
var retrieveTotalList = function (callback) {
	conn.query("SELECT COUNT(*) FROM blogs", function (err, result, fields) {
		if (err) throw err;
		var num = result[0]['COUNT(*)'];
		callback(null,num);
		console.log("total item: " + num);
	});
};

//submit data to database via POST Method
var submitData = function (obj) {
	console.log(obj);
	var sql = "INSERT INTO blogs (title, body, category, url) VALUES ('" + obj.title + "', '" + obj.body + "', '" + obj.category + "', '" + obj.url + "')";
	conn.query(sql, function (err, result) {
		if (err) throw err;
		console.log('New Data Added.');
	});
};

module.exports = {
	retrieveGet: retrieveGet,
	submitData: submitData,
	retrieveTotalList: retrieveTotalList
};