
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
//Definition d'une session pour les donnees utilisateur
let session = require("express-session");

//Application de la session
app.use(session({
    secret: 'motdepasse', //clef secrete
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}, //Mais true en HTTPS
}));



///////////////////////////////////////////////////////

process.env.NODE_ENV="production";
                // TEMPLATES //
//definition du moteur de template a utiliser
app.set('view engine', 'ejs');

                // MIDDLEWARES //
//definition du dossier de lecture de fichiers statiaues
app.use('/assets', express.static('public'));
//Annulation du format etendu
app.use(bodyParser.urlencoded({ extended: false }));
//Parser application/JSON
app.use(bodyParser.json());
//middleware appele Flash pour gerer les reponses
//TODO:: Ne pas mettre ce middleware avant celui de session car il utilise celui de session
app.use(require('./Middlewares/flash'));


///////////////////////////////////////////////////////
                // ROUTES //
app.get('/', (req, res)=>{
    console.log(process.env.NODE_ENV);
    let Message = require('./Models/message');
    Message.all((messages)=>{
        res.render('Page/index', {messages: messages});
    });
    console.log(req.session);
});

app.get('/message/:id', (req, res)=>{
    let Message = require('./Models/message');
    Message.find(req.params.id, (message)=> {//Indexe un element en particulier dans l'array (via l'ID)
        res.render('Message/show', {message: message});
    })
});

app.post('/', (req, res)=> {
    if(req.body.message === undefined || req.body.message === ''){
        console.log("POST ", req.body.message);
        // res.render('Page/index', {error: "Pas de message entre..."});
        //Variable de session: definiton d'un var error
        req.flash('error', "Pas de message envoye..."); //Redirection
        res.redirect('/');
    }else{
        let Message = require('./Models/message');
        Message.create(req.body.message, ()=>{
            req.flash("success","Message envoye !");
            //Redirection
            res.redirect('/');
        });
    }

});

///////////////////////////////////////////////////////
app.listen(5000);