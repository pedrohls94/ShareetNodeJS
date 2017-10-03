module.exports = function(app)
{

    /*
     * Default routes
     */
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



    /*
     * User related routes
     */
    var userController = require("../controllers/userController");

    app.post('/signup',function(req, res) {
        userController.save(req);
        res.redirect('/');
    });

    app.post('/login', function (req, res) {
        userController.authenticate(req, res);
    });

    app.get('/dashboard', checkAuth, function(req, res){
        userController.startSession(req, res);
    });

    app.get('/logout', function (req, res) {
      delete req.session.user_id;
      res.redirect('/');
    });

    app.get('/addfriend', function (req, res) {
      userController.requestFriendship("59cd183a4064e37698fc12cf", "59cd18c74c058376cf3d2e0a");
      res.redirect('/dashboard');
    });

    app.get('/addfriend2', function (req, res) {
      userController.acceptFriend("59cd18c74c058376cf3d2e0a", "59cd183a4064e37698fc12cf");
      res.redirect('/dashboard');
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
