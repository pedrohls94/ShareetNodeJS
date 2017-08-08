var express       = require('express');
var bodyParser    = require("body-parser");
var app           = express();
var port          = process.env.PORT || 3001;
var passport      = require('passport');
var flash         = require('connect-flash');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var configDB      = require('./config/database.js');
var mongoose = require('mongoose');

mongoose.connect(configDB.url, {
  useMongoClient: true
});
require('./config/passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./router/main.js')(app, passport);
//app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

/*var server     =    app.listen(3001,function(){
console.log("Express is running on port 3001");
});*/

app.listen(port);
console.log('Shareet is running on port ' + port + '.');
