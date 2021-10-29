//global variables
var provinceList = ["AG", "AL", "AN", "AO", "AQ", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO",
    "BZ", "BS", "BR", "CA", "CL", "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR", "CN", "EN", "FM","FE",
    "FI", "FG", "FC", "FR", "GE", "GO", "GR", "IM", "IS", "SP", "LT", "LE", "LC", "LI", "LO", "LU", "MC", "MN","MS",
    "MT", "VS", "ME", "MI", "MO", "MB", "NA", "NO", "NU", "OG", "OT", "OR", "PD", "PA", "PR", "PV", "PG", "PU","PE",
    "PC", "PI", "PT", "PN", "PZ", "PO", "RG", "RA", "RC", "RE", "RI", "RN", "RM", "RO", "SA", "SS", "SV", "SI","SR",
    "SO", "TA", "TE", "TR", "TO", "TP", "TN", "TV", "TS", "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT"];

//generic form validation functions
/*
    //INPUT:  Un elemento HTML element
    //OUTPUT: Valore di verità dell'espressione element.text.lenght > 50
*/
function shortTextIsTooLong(element) {
    let text = element.value;
    return text.length > 50;
}

/*
    //INPUT:  Un elemento HTML element
    //OUTPUT: Valore di verità dell'espressione text.length === 0 || text.length == 0 || text === "" || text == "" || text == null
*/
function hasEmptyText(element){
    let text = element.value;
    return text.length === 0 || text.length == 0 || text === "" || text == "" || text == null;
}

/*
    //INPUT: Il nome di un form f, formName
    //OUTPUT: 1 se f contiene almeno un elemento input con type=text con testo vuoto, 2 se f contiene almeno un elemento
              con type=text con un testo di più di 50 caratteri, 0 altrimenti.
*/
function checkFormTextFieldsLength(formName){
    let form = document.forms[formName], elements = form.elements;
    for(let i=0; i < elements.length; i++){
        if(elements[i].getAttribute("type") != null &&
            elements[i].getAttribute("type") !== undefined &&
            (elements[i].getAttribute("type") == "text" ||
                elements[i].getAttribute("type") == "password")) {
            if (hasEmptyText(elements[i]))
                return 1;
            else if (shortTextIsTooLong(elements[i]))
                return 2;
        }
    }
    return 0;
}


/*
    //INPUT: Un form f in cui è stato generato un evento di tipo input, in uno dei campi.
    //OUTPUT: se checkFormTextFields(f.name) > 0, allora disabilitiamo il bottone di submit, lo abilitiamo altrimenti
*/
var checkFieldChangeListener = ev => {
    let submitBtn = document.getElementById("submitBtn");
    let form = document.getElementById(ev.target.form.id);
    if(checkFormTextFieldsLength(form.name) > 0) { //l'evento è sempre generato da un input del form
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
    }
    else {
        $("#submitBtn").removeAttr("disabled");
        $(".submitBtn").removeAttr("disabled");
    }
};

/*
    //INPUT: Il nome formName di un form f
    //OUTPUT: Per ogni campo di testo o password del form f, aggiungiamo ad esso il listener
              checkEmptyFieldChangeListener sull'evento input
*/
function addEmptyCheckToTextFields(formName){
    let form = document.forms[formName], elements = form.elements;
    for(let i=0; i < elements.length; i++){
        if(elements[i].getAttribute("type") != null &&
            elements[i].getAttribute("type") !== undefined &&
            (elements[i].getAttribute("type") == "text" ||
                elements[i].getAttribute("type") == "password")){
            elements[i].addEventListener("input", checkFieldChangeListener);
        }
    }
}

/*
     //INPUT:  Un elemento di input type=password element
    //OUTPUT: True se element.text matcha l'espressione regolare ^([^\s]){8,30}$, false altrimenti, disabilitiamo il
              submitBtn e impostiamo un messaggio d'errore.
*/
function checkPassword(element){
    let password = element.value, pattern = new RegExp("^([^\\s]){8,30}$"),
        errorMessage = document.getElementById("errorMessage");;
    if(!pattern.test(password)){
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        errorMessage.textContent =
            "Errore: il la password deve contenere tra 8 e 30 caratteri, " +
            "che possono includere lettere e numeri e caratteri speciali, eccetto gli spazi!";
        return false;
    }
    return true;
}

/*
     //INPUT: Un campo username usernameField in un form f
    //OUTPUT: Se usernameField.value non matcha ^[A-Za-z0-9]$ o ^.{6,20}$, disabilitiamo il bottone submit del form e
              mostriamo un messaggio d'errore.
*/
function checkUsername(usernameField) {
    let username = usernameField.value, pattern = new RegExp("^[A-Za-z0-9]{6,20}$"),
        errorMessage = document.getElementById("errorMessage");
    if(pattern.test(username) && username.length >= 6 && username.length <= 20)
       return true;
    else{
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        errorMessage.textContent =
            "Errore: il nome utente deve contenere tra i 6 ed i 20 caratteri, che possono includere lettere e numeri!";
        return false;
    }
}

/*
     //INPUT: Un campo username usernameField in un form f
    //OUTPUT: Se usernameField.value non matcha ^[A-Za-z0-9]$ o ^.{6,20}$ o l'utente è già registrato, disabilitiamo il
              bottone submit del form e mostriamo un messaggio d'errore.
*/
function checkNewUsername(usernameField) {
    let username = usernameField.value, pattern = new RegExp("^[A-Za-z0-9]{6,20}$"),
        errorMessage = document.getElementById("errorMessage");
    if(pattern.test(username) && username.length < 20){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200 && !this.responseText.includes("<ok/>")) {
                $("#submitBtn").prop("disabled", true);
                $(".submitBtn").prop("disabled", true);
                errorMessage.textContent = "Errore: lo ursername " + username + " è già in uso.";
                errorMessage.classList.add("toShow");
            }
        };
        xhr.open("GET", "check-username?username=" + username, true);
        xhr.send();
    }
    else{
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        errorMessage.textContent =
            "Errore: il nome utente deve contenere tra i 6 ed i 20 caratteri, che possono includere lettere e numeri!";
        errorMessage.classList.add("toShow");
    }
}

/*
     //INPUT: Un campo email mailField in un form f
    //OUTPUT: Se mailField.value non matcha ^[a-zA-Z]\w+@([a-zA-Z]\w+\.)+[a-z]{2,5}$ o la mail è già in uso,
              disabilitiamo il bottone submit del form e mostriamo un messaggio d'errore.
*/
function checkEmail(emailField) {
    let mail = emailField.value, pattern = new RegExp("^[a-zA-Z][\\w\\.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z]\\w+\\.)+[a-z]{2,5}$"),
        errorMessage = document.getElementById("errorMessage");;
    if(pattern.test(mail) && mail.length < 50){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200 && !this.responseText.includes("<ok/>")) {
                $("#submitBtn").prop("disabled", true);
                $(".submitBtn").prop("disabled", true);
                errorMessage.textContent = "Errore: la mail " + mail + " è già utilizzata!";
                errorMessage.classList.add("toShow");
            }
        };
        xhr.open("GET", "check-mail?mail=" + mail, true);
        xhr.send();
    }
    else{
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        errorMessage.textContent = "Errore: inserisci una email valida.";
        errorMessage.classList.add("toShow");
    }
}

/*
     //INPUT: Un campo codice fiscale fiscalCodeField in un form f
    //OUTPUT: Se fiscalCodeField.value non matcha ^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$ o il CF è già in uso,
              disabilitiamo il bottone submit del form e mostriamo un messaggio d'errore.
*/
function checkFiscalCode(fiscalCodeField) {
    let cf = fiscalCodeField.value, pattern = new RegExp("^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$"),
        errorMessage = document.getElementById("errorMessage");
    if(pattern.test(cf)){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200 && !this.responseText.includes("<ok/>")) {
                $("#submitBtn").prop("disabled", true);
                $(".submitBtn").prop("disabled", true);
                errorMessage.textContent = "Errore: il codice fiscale " + cf + " è già utilizzato!";
                errorMessage.classList.add("toShow");
            }
        };
        xhr.open("GET", "check-fiscal-code?cf=" + cf, true);
        xhr.send();
    }
    else{
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        errorMessage.textContent = "Errore: inserisci un codice fiscale valido.";
        errorMessage.classList.add("toShow");
        return false;
    }
}

/*
     //INPUT: Un campo firstName fn in un form f
    //OUTPUT: Se fn.value non matcha ^(([A-Z][a-z]*([-'\.\s]?))*([A-Z][a-z]*))$ e ^.{2,30}$,
              disabilitiamo il bottone submit del form e mostriamo un messaggio d'errore.
*/
function checkFirstNameOrLastName(element){
    let name = element.value, pattern = new RegExp("^(([A-Z][a-z]*([-'\\s\\.]))*([A-Z][a-z]*))$"),
        lengthPattern = new RegExp("^.{2,30}$");
    if(!lengthPattern.test(name) || !pattern.test(name)){
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        document.getElementById("errorMessage").textContent =
            "Errore: il nome ed il cognome possono contenere dai 2 ai 30 caratteri(lettere e separatori come \"'\")!";
        return false;
    }
    return true;
}

/*
     //INPUT: Un campo street streetField in un form f
    //OUTPUT: Se streetField.value non matcha la regex
              ^(((Via|Contrada|Piazza|Vicolo|Corso|Viale|Piazzale)\s)?(([A-Z]?[a-z0-9]*([-'\.\s]))*([A-Z]?[a-z0-9]+)))$
              o ^.{4,50}$,
              disabilitiamo il bottone submit del form e mostriamo un messaggio d'errore.
*/
function checkStreet(element){
    let street = element.value, patternLength = new RegExp("^.{4,50}$"),
        pattern = new RegExp(
            "^(((Via|Contrada|Piazza|Vicolo|Corso|Viale|Piazzale)\\s)?(([A-Z]?[a-z0-9]*([-'\\.\\s]))*([A-Z]?[a-z0-9]+)))$");
    if(!patternLength.test(street) || !pattern.test(street)){
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        document.getElementById("errorMessage").textContent =
            "Errore: l'indirizzo deve contenere dai 3 ai 50 caratteri (lettere e separatori come \"'\")!";
        return false;
    }
    return true;
}

/*
     //INPUT: Un campo number nb in un form f
    //OUTPUT: Se nb.value non matcha la regex ^([0-9]+[a-zA-Z]*)$ e ^.{1,5}$, disabilitiamo il bottone submit del form e
              mostriamo un messaggio d'errore.
*/
function checkNumber(element){
    let number = element.value, pattern = new RegExp("^([0-9]+[a-zA-Z]*)$"),
        lengthPattern = new RegExp("^.{1,5}$");
    if(!pattern.test(number) || !lengthPattern.test(number)){
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        document.getElementById("errorMessage").textContent =
            "Errore: il numero civico deve contenere da 1 a 5 caratteri, " +
            "di cui il primo dev'essere un numero ed i restanti lettere o numeri!";
        return false;
    }
    return true;
}

/*
     //INPUT: Un campo city ct in un form f
    //OUTPUT: Se ct.value non matcha le regex ^(([A-Z][a-z]*([-'.s]))*([A-Z]?[a-z]+))$ o ^.{2,25}$, disabilitiamo il
              bottone submit del form e mostriamo un messaggio d'errore.
*/

function checkCity(element){
    let city = element.value, pattern = new RegExp("^(([A-Z][a-z]*([-'\\.\\s]))*([A-Z]?[a-z]+))$");
    if(!pattern.test(city) || city.length < 2 || city.length > 25){
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        document.getElementById("errorMessage").textContent =
            "Errore: il nome della città deve contenere dai 2 ai 25 caratteri(lettere e separatori come \"'\")";
        return false;
    }
    return true;
}

/*
     //INPUT: Un campo CAP cap in un form f
    //OUTPUT: Se cap.value non matcha la regex ^([0-9]){5}$, disabilitiamo il
              bottone submit del form e mostriamo un messaggio d'errore.
*/
function checkCAP(element){
    let  cap = element.value, pattern = new RegExp("^([0-9]){5}$");
    if(!pattern.test(cap)){
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        document.getElementById("errorMessage").textContent =
            "Errore: il CAP deve conenere esattamente 5 cifre!";
        return false;
    }
    return true;
}

/*
     //INPUT: Un campo telephone tl in un form f
    //OUTPUT: Se tl.value non matcha la regex ^(([+]|00)39)?((3[0-9]{2}))(\d{7})$, disabilitiamo il
              bottone submit del form e mostriamo un messaggio d'errore.
*/
function checkTelephone(element){
    let  tel = element.value, pattern = new RegExp("^(([+]|00)39)?((3[0-9]{2})(\\d{7}))$");
    if(!pattern.test(tel)){
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        document.getElementById("errorMessage").textContent =
            "Errore: il telefono deve avere 10 cifre, iniziare per \"3\" ed avere eventualmente il prefisso +39 o 0039!";
        return false;
    }
    return true;
}

/*
     //INPUT: Un campo province pr in un form f
    //OUTPUT: Se pr.value non matcha la regex ^[A-Z]{2}$ o la provincia non è tra quelle italiane valide,
              disabilitiamo il bottone submit del form e mostriamo un messaggio d'errore.
*/
function checkProvince(element){
    let  province = element.value, pattern = new RegExp("^[A-Z]{2}$");
    if(!pattern.test(province) || provinceList.indexOf(province) === -1){
        $("#submitBtn").prop("disabled", true);
        $(".submitBtn").prop("disabled", true);
        document.getElementById("errorMessage").textContent =
            "Errore: inserire la sigla di una provincia valida(2 caratteri maiuscoli)!";
        return false;
    }
    return true;
}

/*
     //INPUT: Una stringa testuale teacherName ed una numerica maxPrice
    //OUTPUT: Se teacherName non è vuota e non matcha ^(([A-Z][a-z]*([-'\.\s]?))*([A-Z][a-z]*))$ e ^.{2,30}$, oppure
              maxPrice non è vuota e non matcha ^(\d)+(\.(\d)+)?$, allora mostriamo un messaggio d'errore
              e ritorniamo false, altrimenti ritorniamo true.
*/
function checkTeacherNameAndMaxPrice(teacherName= undefined, maxPrice){
    let nameRegex = new RegExp("^(([A-Z][a-z]*([-'\\s\\.]))*([A-Z][a-z]*))$"),
        priceRegex = new RegExp("^(\\d)+([\\.,](\\d)+)?$"); //regex per un numero double
    if(teacherName != undefined) {
        if(teacherName != "" && (teacherName.length < 2 || teacherName.length > 30 || !nameRegex.test(teacherName))) {
            $("#errorMessage").text("Error: teacher name must be from 2 to 30 characters (letters e separators)");
            return false;
        }
    }
    if(maxPrice != "" && !priceRegex.test(maxPrice)) {
        $("#errorMessage").text("Error: max price must be a valid number.");
        return false;
    }
    return true;
}



