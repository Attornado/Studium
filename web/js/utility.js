//showPasswordButton
/*
    //INPUT: Un password field con all'interno un elemento con classe showPasswordBtn
    //OUTPUT: Il passwword btn, con type cambiato, quindi se type=password => type'=text ed icona del bottone sbarrata,
              se type=text => type'=password ed icona del bottone non sbarrata
*/
function setPasswordVisible(passwordField) {
    let showPasswordBtn = Array.from(passwordField.parentNode.children).filter((child) =>
        child.classList.contains("showPasswordBtn"))[0]; //seleziono il bottone password, tra i fratelli del password field
    if(passwordField.getAttribute("type") == "password"){
        showPasswordBtn.classList.remove("fa-eye");
        showPasswordBtn.classList.add("fa-eye-slash");
        passwordField.setAttribute("type", "text");
    }
    else{
        showPasswordBtn.classList.remove("fa-eye-slash");
        showPasswordBtn.classList.add("fa-eye");
        passwordField.setAttribute("type", "password");
    }
}

/*
    //INPUT: Il nome di un form f, formName
    //OUTPUT: Un form f' t.c. f'.name=formName e per ogni campo di password del form, aggiungiamo un listener che
              sul bottone che controlla la visibilità della password.
*/
function setShowPasswordBtnListeners(formName){
    let elements = document.forms[formName].elements, showPasswordBtn;
    for(let i=0; i < elements.length; i++){
        if(elements[i].getAttribute("type") != null &&
            elements[i].getAttribute("type") !== undefined &&
            elements[i].getAttribute("type") == "password") {
           showPasswordBtn = Array.from(elements[i].parentNode.children).filter((child) =>
                child.classList.contains("showPasswordBtn"))[0]; //seleziono il bottone password, tra i fratelli del password field
            showPasswordBtn.addEventListener("click", ev => setPasswordVisible(elements[i]));
        }
    }
}

/*
     //INPUT: Un campo di testo o di data.9
    //OUTPUT: Se type=text allora si campia type=date, altrimenti si fa l'opposto, quindi type=text
*/
function changeTypeDateText(x) {
    if(x.getAttribute("type") == "text")
        x.setAttribute("type", "date");
    else if(x.getAttribute("type") == "date")
        x.setAttribute("type", "text");
}

/*
     //INPUT: Un elemento HTML element
    //OUTPUT: Se element possiede la classe toShow, la rimuoviamo, altrimenti la aggiungiamo
*/

function setToShowClass(element) {
    if(element.classList.contains("toShow"))
        element.classList.remove("toShow");
    else
        element.classList.add("toShow");
}

/*
    //INPUT: type: tipo di messaggio da mostrare, msg: messaggio da mostrare, timeoutSec: tempo di scadenza del messaggio
    //OUTPUT: Mostra un messaggio pop-up di tipo type a fondo pagina, con messaggio msg, che viene nascosto dopo
              timeoutSec secondi. Non viene nascosto mai se timeoutSec=0.
*/
function showPopupMessage(type= "notice", msg= "", timeoutSec= 0){
    let $popupMessageBox = $(".popupBox");
    $popupMessageBox.removeClass((index, classListString) => {
        //splittiamo la classList in più stringhe
        let classList = classListString.split(" ");
        //filtriamole in modo da avere solo quelle che matchano con la regex ^.+(-popup)$
        classList = classList.filter(value => new RegExp("^.+(-popup)$").test(value));
        //riunifichiamo l'array in modo da ottenere la stringa delle classi da rimovere
        return classList.join(" ");
    });
    $popupMessageBox.addClass(type + "-popup"); //impostiamo la classe corrispondente al tipo di messaggio
    $popupMessageBox.find($popupMessageBox.prop("id") + " .msgContent").text(msg); //impostiamone il contenuto
    $popupMessageBox.addClass("visible"); //rendiamolo visibile
    if(timeoutSec !== 0)
        setTimeout(() => $(".popupBox").removeClass("visible"), timeoutSec*1000);
}

/*
    //INPUT: N/A
    //OUTPUT: Inizializza il listener onclick del close button del popup box
*/
function initPopups(){
    $(".popupBox .closeButton").on("click", ev => $(".popupBox").removeClass("visible"));
}

//init features function
$(document).ready(function () {
    //init popup close button listener
    initPopups();
})