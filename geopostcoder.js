var csv = require('csv');
var app = require('express').createServer();
var POSTCODES = {};

csv()
	.fromPath(__dirname+'/postcodes.csv',{
		columns: true
	}).transform(function(data, index) {
		POSTCODES[data.postcode] = data.longitude + "," + data.latitude;
	});

app.get('/:postcode',function(req,res){
		var postcode = POSTCODES[req.params.postcode.split(' ')[0].toUpperCase()];
		if (postcode) {
		  res.send(postcode);
		} else {
		  res.send('Not found', 404);
		}
});

app.listen(80);
