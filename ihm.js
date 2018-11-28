var readline = require('readline');
var service = require('./service')

module.exports.start = function() {

    //Initialisation des données
    service.init(function(nb) {
        console.log('[init]', nb, 'sessions trouvées.')
    });

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('*************************\n\t'+
                '1. Rafraichir les données\n\t'+
                '2. Lister les sessions\n\t'+
                '99. Quitter\n', function(saisie) {
        choixMenu(saisie);

        rl.close();
    });
    
    
};

function choixMenu(saisie)
{
    switch(saisie)
    {
        case "1":
            service.init(function(nb) {
                console.log('[maj]', nb, 'sessions trouvées.')
            });
            console.log("...Données mises à jour.");
            break;
        case "2":
            service.listerSessions(function(sessions) {
                sessions.forEach(session => { console.log(session.name, "("+session.speakers+")")});
            });
            break;
        case "99":
            console.log("...fin du programme.");
            break;
        default:
            console.log(`Option : ${saisie}, non possible !`);
            break;
    }

    return saisie
}