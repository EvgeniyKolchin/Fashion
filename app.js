var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var sqlite = require('sqlite3');
var db = new sqlite.Database('db/mydb.sqlite');

app.use(express.static(__dirname + '/resource'));

/*-----------------------------------------------------------------------------------------------------*/
app.get('/', function(req, res) {
    db.all('select * from mydata', function(error, data){
        res.render('index', {
            data: data
        });
    });
});

app.post('/delete', function(req, res){
    db.run("delete from mydata where id = "+req.query.id, function(){
        res.send("ok");
    })
});

app.post('/new', function(req, res){
    db.run("insert into mydata (img_path, price, watch1) values('"+req.query.img_path+"','"+req.query.price+"','"+req.query.watch1+"')", function(){
        res.send("ok");
    })
});

/*-----------------------------------------------------------------------------------------------------*/
var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT + '!');
});