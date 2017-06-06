var express     =   require('express');
var bodyParser  =   require("body-parser");
var app         =    express();

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

//app.use(session({ secret: '$#%!@#@@#SSDASASDVV@@@@', key: 'sid'}));
app.use(express.static(__dirname + '/public'));

var server     =    app.listen(3001,function(){
console.log("Express is running on port 3001");
});
