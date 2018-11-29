const readline = require('readline');
const Service = require('./service');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = class Ihm {
    
    constructor()
    {
        //Initialisation des données
        this.service = new Service();
        this.service.init()
        .then(nb => {console.log(`[Ihm:init] ${nb} sessions trouvées.`)});
    }

    afficherMenu(texte, callback)
    {
        rl.question(texte, saisie => {

            //Use callback to do menu loop
            if(callback(saisie)!== false)
            {
                this.afficherMenu(texte, callback);
            }
            else
            {
                rl.close();
            }
        });
    }

    start() {
        this.afficherMenu(`*************** BreizhCamp 2018 **************
        1. Rafraichir les données
        2. Lister les sessions
        3. Lister les présentateurs
        99. Quitter\n`, saisie => {
            switch(saisie)
            {
                case "1":
                    this.service.init()
                        .then(nb => console.log(`[Ihm:maj] ${nb} sessions trouvées.`))
                        .catch(msg => console.log(msg));
                    console.log("...Données mises à jour.");
                    break;
                case "2":
                    this.service.listerSessions()
                        .then(sessions => {sessions.forEach( session => console.log(`${session.name} "(${session.speakers})"`))})
                        .catch(msg => console.log(msg));
                    console.log("...Données sessions listées.");
                    break;
                case "3":
                    this.service.listerPresentateurs()
                        .then(speakers => speakers.forEach(speaker => console.log(speaker)))
                        .catch(msg => console.log(msg));
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
        
    }
}