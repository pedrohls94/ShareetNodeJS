module.exports = function(app)
{
    app.get('/',function(req,res){
        res.render('index.ejs')
     });
    app.get('/about',function(req,res){
        res.render('about.html');
    });
    app.get('/dashboard',function(req,res){
       res.render('dashboard.ejs');
    });
    app.get('/indexptbr',function(req,res){
       res.render('indexptbr.ejs');
    });
    app.get('/test',function(req,res){
       res.render('test/index.html');
    });
    app.post('/signup',function(req,res) {
        var userController = require("../controllers/userController")
        userController.save(req.body.name, req.body.username, req.body.email, req.body.psw)
        res.redirect("/")
    });
}
