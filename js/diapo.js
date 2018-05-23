// Diaporama

var Diapo = {
    slideIndex: 1,
    btnD: '',
    btnG: '',

    plusDivs: function (n) {
        Diapo.showDivs(Diapo.slideIndex);
        Diapo.showDivs(Diapo.slideIndex += n);
    },

    showDivs: function (n) {
        var i;
        var x = document.getElementsByClassName("diapo");
        if (n > x.length) {
            Diapo.slideIndex = 1;
        }
        if (n < 1) {
            Diapo.slideIndex = x.length;
        };
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[Diapo.slideIndex - 1].style.display = "block";
    },

    // Recule dans l'affichage
    btnD: function () {
        Diapo.plusDivs(-1);
    },

    // Avance dans l'affichage
    btnG: function () {
        Diapo.plusDivs(+1);
    },

    // Gestion des flêches du clavier
    flecheC: function (event) {
        console.log(event);
        e = event || window.event;

        if (e.keyCode == '37') {
            Diapo.plusDivs(+1);
        } else if (e.keyCode == '39') {
            Diapo.plusDivs(-1);
        }
    }

}

// Démarre le slider
Diapo.showDivs(Diapo.slideIndex);
document.getElementById('button-left').onclick = Diapo.btnD;
document.getElementById('button-right').onclick = Diapo.btnG;
document.onkeydown = Diapo.flecheC;