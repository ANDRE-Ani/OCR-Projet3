/* Projet 3 de la formation : Javascript */
/* Application de location de vélos en ligne */

/* Fichier JS principal */

// Google Map
var map;
var markers = []

// Variables
var confirmS = '';
var confirm2 = '';
var session = '';
var statusS = '';
var totalS = '';
var ttO = 0;
var ttF = 0;
var nomS = '';
var addrS = '';


// Variables session storage
var sesN = '';
var sesA = '';
var sesV = '';
var sesC = '';

// Objet principal de l'appli
var Appli = {

  apiJCD : "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=6a0e5d7538977fe22dccafee4505b274b481e111",

  // Remplace OPEN par ouvert
  convert : function (status) {
      if (status == 'OPEN') {
        return 'Ouverte';
      } else {
        return 'Fermée';
      }
   },

  // Comptage stations ouvertes et fermées
  comptage : function () {
    if (status == 'OPEN') {
      ttO++;
    } else {
      ttF++;
    }
  },

  // Choix affichage couleur du marker des stations
  couleur : function () {
    if ((status == 'OPEN') && (available >= 1)) {
      marker.setIcon('images/marker-vert.png');
    } else {
      marker.setIcon('images/marker-rouge.png');
    }
  },


  // Création de la carte
  initMap : function () {

    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 45.764,
        lng: 4.819
      },
      zoom: 13
    })

    infowindow = new google.maps.InfoWindow();

    ajaxGet(Appli.apiJCD, function (reponse) {
      var stations = JSON.parse(reponse);

      // Récupération des variables de chaque stations
      for (var i = 0; i < (totalS = stations.length); i++) {

            name = stations[i].name;
            lieu = stations[i].position;
            status = stations[i].status;
            address = stations[i].address;
            available = stations[i].available_bike_stands;
            total = stations[i].bike_stands;

            marker = new google.maps.Marker({
              position: new google.maps.LatLng(lieu),
              map: map,
              title: name,
              icon: 'images/markers.png',
              status: status,
              addresse: address,
              total: total,
              available: available
            });

            // Fonction de comptage du nombre de stations
            Appli.comptage();

            // Affiche le nombre total de stations, ouvertes et fermées
            document.getElementById('stationsN').innerHTML = 'Nombre de stations : ' + '<strong>' + totalS +
             '</strong>' + '<br>' + 'Stations ouvertes : ' + '<strong>' + ttO + '</strong>' + '<br>' +
              ' Stations fermées : ' + '<strong>' + ttF + '</strong>';


            marker.addListener('click', function () {

                  infowindow.setContent(this.title + '<br>' + '<hr>' + '<br>' + this.addresse + '<br>' +
                   Appli.convert(status) + '<br>' + 'Vélos disponibles : ' + this.available);

                  // Si station indispo, affiche une alerte
                  if ((this.status != 'OPEN') || (this.available < 1)) {
                    modalIndispo.style.display = 'block';
                    document.getElementById('reserv').style.display = 'none';
                    document.getElementById('stationC').style.display = 'none';
                  } else {
                    document.getElementById('stationC').style.display = 'block';
                    document.getElementById('reserv').style.display = 'block';
                  }

                  infowindow.open(map, this);

                  // Ferme automatiquement l'infowindow
                  setTimeout(function () {
                    infowindow.close();
                  }, 5000);

                  // Informations sur la station sélectionnée
                  document.getElementById('stationC').innerHTML = '<p>' + '<strong>' + 'Nom : ' + '</strong>' +
                   this.title + '<br>' + '<strong>' + 'Addresse : ' + '</strong>' + this.addresse + '<br>' +
                    '<strong>' + 'Status : ' + '</strong>' + Appli.convert(status) + '<br>' + '<strong>' + 'Vélos au total : ' +
                     '</strong>' + this.total + '<strong>' + '<br>' + 'Vélos libre : ' + '</strong>' + this.available + '<br>' + '</p>';

                  nomS = this.title;
                  addrS = this.addresse;
                  confirm2 = nomS + addrS;
                  confirmS = '<strong>' + 'Nom : ' + '</strong>' + this.title + '<br>' + '<strong>' + 'Addresse : ' +
                   '</strong>' + this.addresse;

            })

            // Affiche marker vert ou rouge suivant la station
            Appli.couleur();

            marker.setMap(map);
            markers.push(marker);
      }

      var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      })
    })
  },


  closeDialog : function () {
    modal.style.display = 'none';
    modalIndispo.style.display = 'none';
  },


  // Fonction stockage des données dans navigateur
  reservation : function () {
    sessionStorage.setItem('Vélo', '1 vélo réservé');
    sessionStorage.setItem('Station', nomS);
    sessionStorage.setItem('Addresse', addrS);
  }
}

// Lancement de la map
Appli.initMap();

// Quand on clic sur le bouton confirmation, copie station
document.getElementById('valider').addEventListener('click', function () {

  // Vérifie si canvas vide pour validation
  if (mon_canvas.toDataURL() == document.getElementById('vide').toDataURL()) {
    window.alert("Vous devez signer pour valider !");
  } else {
    document.getElementById('stationClient').innerHTML = 'Votre vélo est ' + '<strong>' + 'réservé' + '</strong>' + ' à la station : ' + '<br><br>' + confirmS
  }

  // Efface le canvas après confirmation
  var canvas = document.getElementById('mon_canvas');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
})

var x = document.getElementById('valider');


if (sessionStorage.length > 0) {
  sesN = sessionStorage.getItem('Station');
  sesA = sessionStorage.getItem('Addresse');
  sesV = sessionStorage.getItem('Vélo');
  sesC = sessionStorage.getItem('Compteur');
  sesC2 = sessionStorage.getItem('Compteur 2');

  // Relance le compte à rebours si actualise la page
  document.getElementById('stationClient').innerHTML = sesV + '<br>' + '<strong>' + 'Nom : ' + '</strong>' + sesN + '<br>' + '<strong>' + 'Addresse : ' + '</strong>' + sesA + '<br>';
  Compteur.demarrerChron2();
  document.getElementById('compteur').innerHTML = Compteur.text;
}

// Evènement sur clic des boutons
document.getElementById('close').addEventListener('click', Appli.closeDialog);
document.getElementById('valider').addEventListener('click', Appli.closeDialog);
document.getElementById('valider').addEventListener('click', Appli.reservation);
document.getElementById('valider').addEventListener('click', Compteur.demarrerChron);