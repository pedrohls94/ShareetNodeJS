module.exports = function(app)
{
    app.get('/',function(req,res){
        res.render('index.ejs')
     });
    app.get('/about',function(req,res){
        res.render('about.html');
    });
    app.get('/indexptbr',function(req,res){
       res.render('indexptbr.ejs');
    });
    app.get('/test',function(req,res){
       res.render('test/index.html');
    });

    var userController = require("../controllers/userController");

    app.post('/signup',function(req,res) {
        userController.save(req.body.name, req.body.username, req.body.email, req.body.psw);
        res.redirect('/');
    });

    app.post('/login', function (req, res) {
        userController.authenticate(req.body.username, req.body.psw, function callback(user){
            if (user != null) {
                req.session.user_id = user.id;
                res.redirect('/dashboard');
            } else {
                res.send('Bad user/pass');
            }
        });
    });

    app.get('/logout', function (req, res) {
      delete req.session.user_id;
      res.redirect('/');
    });

    app.get('/dashboard', checkAuth, function(req,res){
        userController.find(req.session.user_id, function callback(user){
            res.render('dashboard.ejs', {
                userName:user.name,
                test:'<a href="#" class="og-sidebar-item og-red-l3"><i class="fa fa-bell-o"></i> Notifications</a>'
            });
        });
    });
}

function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.send('You are not authorized to view this page');
    } else {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
    }
}
