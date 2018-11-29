const request = require('request-promise-native');
const jsdom = require('jsdom');

class Talks
{
    constructor(e)
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
}

module.exports = class Service {
    
    constructor()
    {
        this.talks = [];
        this.speakers = [];
    }

    init() {
        //RAZ talks data
        this.talks = [];
        // Requêtes HTTP permettant de récupérer les données du BreizhCamp
        return new Promise((resolve, reject) => {
            // Envoie de la requête http
            request('http://2018.breizhcamp.org/json/others.json',{ json: true }, (err,res,body) =>{
                if (!err) {
                    body.forEach(e => this.talks.push(new Talks(e)));

                    request('http://2018.breizhcamp.org/json/talks.json',{ json: true }, (err,res,body) => {
                            
                            if (!err) {
                                body.forEach(e => this.talks.push(new Talks(e)));
                                resolve(this.talks.length);
                            }
                            else {
                                reject('Erreur', err);
                            }
                    });
                }
                else {
                    reject('Erreur', err);
                }
            });
        });
    }

    listerSessions() {
        return new Promise((resolve, reject) => {
            if(this.talks != 0) {
                resolve(this.talks);
            }
            else {
                reject("Sessions data empty !");
            }
        });
    }

    listerPresentateurs() {
        this.speakers = [];
        return new Promise ((resolve, reject) => {
            request('http://2018.breizhcamp.org/conference/speakers/', {}, (err, res, body) => {
                if(!err) {
                    const dom = new jsdom.JSDOM(body);
                    const langs = dom.window.document.querySelectorAll(".media-heading");
                    langs.forEach(lg => this.speakers.push(lg.innerHTML));
                    resolve(this.speakers);
                }
                else {
                    reject('Erreur', err);
                }           
            
            });
        });
    }
}