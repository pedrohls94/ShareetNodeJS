module.exports = function(app, passport) {

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
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
}
