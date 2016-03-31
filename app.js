var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var sqlite = require('sqlite3');
var db = new sqlite.Database('db/mydb.sqlite');

app.use(express.static(__dirname + '/resource'));

app.get('/', function(req, res) {
    db.all('select * from mydata', function(error, data){
        res.render('index', {
            data: data
        });
    });
});

app.listen(3000, function(){
    console.log('listening on port 3000');
});