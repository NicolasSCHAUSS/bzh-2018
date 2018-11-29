var request = require('request');
var jsdom = require('jsdom');
// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

var Talks = function (e)
{
    this.description = e.description;
    this.event_end = e.event_end;
    this.event_start = e.event_start;
    this.event_type = e.event_type;
    this.files_url = e.files_url;
    this.format = e.format;
    this.id = e.id;
    this.name = e.name;
    this.slides_url = e.slides_url;
    this.speakers = e.speakers;
    this.venue = e.venue;
    this.venue_id = e.venue_id;
    this.video_url = e.video_url;
}


module.exports.init = function (callback) {

    talks = [];
    // effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp
    // Envoie de la requête http
    request('http://2018.breizhcamp.org/json/talks.json',{ json: true }, function(err,res,body) {
        if (!err)
        {
            // => une fois les données récupérées, alimenter la variable talks
            body.forEach(e => talks.push(new Talks(e)));

            request('http://2018.breizhcamp.org/json/others.json',{ json: true }, function(err,res,body) {
                if (!err)
                {
                    // => re-alimenter la variable talks
                    body.forEach(e => talks.push(new Talks(e)));
                    // => invoquer la callback avec le nombre de sessions récupérées
                    callback(talks.length);
                }
            });
        }
    });
};

module.exports.listerSessions = function(callback) {
    callback(talks);
}

module.exports.listerPresentateurs = function(callback) {
    speakers = [];
    request('http://2018.breizhcamp.org/conference/speakers/', {}, (err, res, body) => {
        if (err) { return console.log('Erreur', err); }
        
        var dom = new jsdom.JSDOM(body);
        var langs = dom.window.document.querySelectorAll(".media-heading");
        langs.forEach(lg => speakers.push(lg.innerHTML));
        callback(speakers);
    });
}
