const express=require('express');

const app=express();
const expressHbs=require('express-handlebars');
const bodyParser=require('body-parser');
const users=[];

app.engine('hbs',expressHbs({defaultLayout:'main-layout',extname:'hbs'}))
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{
    
    res.render('index',{pageTitle:"Add user"});//rendering index.pug
});

app.get('/users',(req,res,next)=>{
    res.render('users',{pageTitle:"Users",users:users,hasUsers:users.length>0});//rendering users.pug
    //we are adding user in the post method and getting them to arr here,to use users in template(users.pug) ,each users
});

app.post('/add-user',(req,res,next)=>{
    users.push({name:req.body.username});//for the input we need to assign a name "username" in index.pug with body parser(middleware) urlencoded
    res.redirect('/users');
});

app.listen(3000);