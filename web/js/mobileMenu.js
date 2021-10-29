function setToShowClass(element) {
    if(element.classList.contains("toShow"))
        element.classList.remove("toShow");
    else
        element.classList.add("toShow");
}

$(document).ready(ev => {
    let mobileMenuButton = document.getElementById("mobileMenuButton"),
        coursesButton = document.getElementById("corsi"),
        reservedAreaButton = document.getElementById("reservedArea");

    //gestione del mobile menu button
    mobileMenuButton.addEventListener("click", ev =>
        setToShowClass(document.getElementById("navbarId")));

    //gestione del bottone corsi con touch screen
    coursesButton.addEventListener("click", ev => { //quando si clicca sul bottone "corsi"
        if(window.matchMedia("(hover: none) and (any-hover: none)").matches) { //se ci troviamo su un touch dove hover non è disponibile
            let $dropdownContent = $("#coursesDropdown .dropdown-content");
            if(!$dropdownContent.hasClass("toShow")) { //se il dropdown content è nascosto
                ev.preventDefault(); //impediamo di aprire il link
                $dropdownContent.addClass("toShow"); //mostriamolo e
                //aggiungiamo un listener che verrà rimosso se clicco in qualunque altro posto che non sia il dropdown menu
                $('body').on("click", ev => { //quando clicco sul body,
                    let $dropdownContent = $("#coursesDropdown .dropdown-content");
                    if(ev.target.id == "coursesDropdown") //se clicco su courseDropdown
                        return;
                    if($(ev.target).closest('#coursesDropdown').length > 0) //o uno dei suoi discendenti, non facciamo nulla
                        return;
                    if($dropdownContent.hasClass("toShow")) {
                        ev.preventDefault(); //preveniamo l'apertura di un link, se esso è stato cliccato
                        $dropdownContent.removeClass("toShow"); //altrimenti rimuoviamo la classe toShow al dropdown, se ce l'ha
                        $(this).off(ev); //e rimuoviamo il listener
                    }
                });
            }
        }
    });

    //gestione del bottone reserved area con touch screen
    if(reservedAreaButton != null && reservedAreaButton != undefined)
        reservedAreaButton.addEventListener("click", ev => { //quando si clicca sul bottone "corsi"
            if(window.matchMedia("(hover: none) and (any-hover: none)").matches) { //se ci troviamo su un touch dove hover non è disponibile
                let $dropdownContent = $("#userAreaDropdown .dropdown-content");
                if(!$dropdownContent.hasClass("toShow")) { //se il dropdown content è nascosto
                    ev.preventDefault(); //impediamo di aprire il link
                    $dropdownContent.addClass("toShow"); //mostriamolo e
                    //aggiungiamo un listener che verrà rimosso se clicco in qualunque altro posto che non sia il dropdown menu
                    $('body').on("click", ev => { //quando clicco sul body,
                        let $dropdownContent = $("#userAreaDropdown .dropdown-content");
                        if(ev.target.id == "userAreaDropdown") //se clicco su courseDropdown
                            return;
                        if($(ev.target).closest('#userAreaDropdown').length > 0) //o uno dei suoi discendenti, non facciamo nulla
                            return;
                        if($dropdownContent.hasClass("toShow")) {
                            ev.preventDefault(); //preveniamo l'apertura di un link, se esso è stato cliccato
                            $dropdownContent.removeClass("toShow"); //altrimenti rimuoviamo la classe toShow al dropdown, se ce l'ha
                            $(this).off(ev); //e rimuoviamo il listener
                        }
                    });
                }
            }
        });
});




