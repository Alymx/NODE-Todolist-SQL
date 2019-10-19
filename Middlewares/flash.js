

module.exports = function flash(req, res, next){
    //Si la var de session existe
    if(req.session.flash){
        //La var locale appelee flash va rendre la var de session flash
        res.locals.flash = req.session.flash; //PS on repond a la var locale
        //Puis on la vide
        req.session.flash = undefined;
    }
    //lors de l'appel de la fonction flash (qui retourne une clef vqleur)
    req.flash = function(type, content){
        //Si la session est inexistante, retourner un objet vide
        if(req.session.flash === undefined){
            req.session.flash = {};
        }
        //Au final, retourner le type et la valeur de l'element
        req.session.flash[type] = content;
    };
    //Pour les middelwarees c'est imperatif sauf omis volontaire
    next();
};
