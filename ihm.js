var readline = require('readline');
var service = require('./service')

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports.start = function() {

    //Initialisation des données
    service.init(function(nb) {
        console.log('[init]', nb, 'sessions trouvées.')
    });

    afficherMenu('*************** BreizhCamp 2018 **************\n\t'+
    '1. Rafraichir les données\n\t'+
    '2. Lister les sessions\n\t'+
    '3. Lister les présentateurs\n\t'+
    '99. Quitter\n', function(saisie) {
        switch(saisie)
        {
            case "1":
                service.init(nb => {
                    console.log('[maj]', nb, 'sessions trouvées.')
                });
                console.log("...Données mises à jour.");
                break;
            case "2":
                service.listerSessions(sessions => {
                    sessions.forEach(session => { console.log(session.name, "("+session.speakers+")")});
                });
                console.log("...Données sessions listées.");
                break;
            case "3":
                service.listerPresentateurs(speakers => { 
                    speakers.forEach(speaker => console.log(speaker));
                });
                console.log("...Données présentateurs listées.");
                break;
            case "99":
                console.log("...Fin du programme.");
                return false;
            default:
                console.log(`Option : ${saisie}, non possible !`);
                break;
        }
    });
     
};

function afficherMenu(texte, callback)
{
    rl.question(texte, function(saisie) {

        //Use callback to do menu loop
        if(callback(saisie)!== false)
        {
            afficherMenu(texte, callback);
        }
        else
        {
            rl.close();
        }
    });
}