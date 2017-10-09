var express             =   require('express');
var bodyParser          =   require("body-parser");
var mongoose            =   require('mongoose');
var i18n                =   require("i18n-express");
var cookieParser        =   require('cookie-parser');
var session             =   require('express-session');
var expressValidator    =   require('express-validator');

var app =   express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(cookieParser("config.cookieSecret"))

app.use(session({secret:'secretKey'}));

app.use(expressValidator());

app.use(i18n({
  translationsPath: __dirname + '/i18n',
  defaultLang: "en",
  siteLangs: ["en","pt-br"],
  textsVarName: 'strings'
}));

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var server     =    app.listen(3001,function(){
console.log("Express is running on port 3001");
});
