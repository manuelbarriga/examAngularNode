var express = require('express');
var bodyParser = require('body-parser');
var dbProcess = require('./appmodules/dataretriever');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/views'));
// app.use(bodyParser.json());

//routes
app.get('/', function (req, res) {
	console.log("Listening from: " + req.url);
	res.sendFile('views/index.html');
});

app.get('/list', function (req, res) {
	console.log("Retrieving from: " + req.url);
	var reqQuery = req.query;
	dbProcess.retrieveGet(function(error, results){
		res.json(results);
	}, reqQuery);
});

app.get('/total', function (req, res) {
	console.log("Getting total from: " + req.url);
	dbProcess.retrieveTotalList(function(error, results){
		res.json(results);
	});
});

app.post('/submit', jsonParser ,function (req, res) {
	var bodyObj = req.body;
	dbProcess.submitData(bodyObj);
});


app.listen(3000);
console.log("server running...");