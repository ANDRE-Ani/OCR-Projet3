// Modal pour réservation
var modalIndispo = document.getElementById('modalIndispo');
var val = document.getElementById("close");
var span = document.getElementsByClassName("close")[0];

val.onclick = function () {
    modalIndispo.style.display = "block";
}

span.onclick = function () {
    modalIndispo.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modalIndispo) {
        modalIndispo.style.display = "none";
    }
}