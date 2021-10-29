function changeArrowIcon() {
    let icon = document.getElementById("TeacherIcon");
    if(icon.getAttribute("class") == "fa fa-arrow-right"){
        icon.setAttribute("class", "fa fa-arrow-left");
    }
    else{
        icon.setAttribute("class", "fa fa-arrow-right");
    }
}

var stickySideTeacherListener = ev => {
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
    let mobileTeacherButton = document.getElementById("mobileTeacherButton");

    mobileTeacherButton.addEventListener("click", ev =>
        setToShowClass(document.getElementById("teacherPage")));
    mobileTeacherButton.addEventListener("click", ev => changeArrowIcon());

    //posizione "sticky" del bottone
    window.onscroll = stickySideTeacherListener;

    //spostiamo il botton sotto l'header al click sul mobileMenuButton
    $("#mobileMenuButton").on("click", stickySideTeacherListener);

    //spostiamo il left sotto l'header, al caricamento della pagina
    $("#left").css("top", $("#header").height()+"px");
});





