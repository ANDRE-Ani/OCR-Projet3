// compte à rebours
var Compteur = {
    secondes : 1200,
    timer : "",
    text : "",

    // Converti secondes en minutes et secondes
    chrono : function(){
            
            if (Compteur.secondes > 0) {
                var minutes = Math.floor(Compteur.secondes / 60);
                var heures = Math.floor(Compteur.minutes / 60);
                Compteur.secondes -= minutes * 60;
                if (heures > 0) {
                    minutes -= heures * 60;
                    if (minutes > 0) {
                        Compteur.text = "<strong>" + "Temps de réservation : " + "</strong>" + heures + ' h ' + minutes + ' min ' + secondes + ' sec';
                    } else {
                        Compteur.text = "<strong>" + "Temps de réservation : " + "</strong>" + heures + ' h ' + Compteur.secondes + ' sec';
                    }
                    minutes = minutes + (heures * 60);
                    Compteur.secondes = Compteur.secondes + (minutes * 60) - 1;
                } else if (minutes > 0) {
                    Compteur.text = "<strong>" + "Temps de réservation : " + "</strong>" + minutes + ' min ' + Compteur.secondes + ' sec';
                    Compteur.secondes = Compteur.secondes + (minutes * 60) - 1;
                } else {
                    Compteur.text = "<strong>" + "Temps de réservation : " + "</strong>" + Compteur.secondes + ' sec';
                    Compteur.secondes = Compteur.secondes + (minutes * 60) - 1;
                }
            } else {
                clearInterval(Compteur.timer);
                Compteur.text = "La location est " + "<strong>" + "terminée" + "</strong>";
            }

            document.getElementById('compteur').innerHTML = Compteur.text;
            
            sessionStorage.setItem('Compteur', Compteur.text);
            sessionStorage.setItem('Compteur 2', Compteur.secondes);
            
    },

    // Quand on clic sur le bouton de réservation, lance le compteur
    demarrerChron : function(){
        clearInterval(Compteur.timer);
        Compteur.secondes = 1200;
        Compteur.timer = setInterval(Compteur.chrono, 1000);
    },

    // Relance le compteur après un reload
    demarrerChron2 : function(){
        clearInterval(Compteur.timer);
        sesC22 = sessionStorage.getItem('Compteur 2');
        Compteur.secondes = sesC22;
        Compteur.timer = setInterval(Compteur.chrono, 1000);
    }

}

