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
    app.get('/test',function(req,res){
       res.render('test/index.html');
    });
}
