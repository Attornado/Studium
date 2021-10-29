//Icon menu button arrow changer
function changeArrowIcon(){
    let icon = document.getElementById("AdminIcon");
    if(icon.getAttribute("class") == "fa fa-arrow-right"){
        icon.setAttribute("class", "fa fa-arrow-left");
    }
    else{
        icon.setAttribute("class", "fa fa-arrow-right");
    }
}

var stickySideMenuListener = ev => {
    let $header = $("#header");

    //se l'altezza dello scroll della finestra è maggiore di quella dell'header, allora impostiamo il menu in alto
    if(window.scrollY > $header.height()){
        $("#left").css("top", 0);
    }
    else{
        //altrimenti impostiamolo esattamente sotto l'header
        $("#left").css("top", $header.height() - window.scrollY + "px");
    }
};

$(document).ready(function () {
    let mobileAdminButton = document.getElementById("mobileAdminButton");

    mobileAdminButton.addEventListener("click", ev =>
        setToShowClass(document.getElementById("adminPage")));
    mobileAdminButton.addEventListener("click", ev => changeArrowIcon());

    //posizione "sticky" del bottone
    window.onscroll = stickySideMenuListener;

    //spostiamo il bottone sotto l'header al click sul mobileMenuButton
    $("#mobileMenuButton").on("click", stickySideMenuListener);

    //spostiamo il left sotto l'header, al caricamento della pagina
    $("#left").css("top", $("#header").height() + "px");
});


