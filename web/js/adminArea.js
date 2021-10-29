//switch section
function switchSectionOfPage(x) {
    let corso = document.getElementById("corso-div");
    let studente = document.getElementById("studente-div");
    let insegnante = document.getElementById("insegnante-div");
    let admin = document.getElementById("admin-div");
    let categoria = document.getElementById("categoria-div");
    let prevoiusCurrent = document.querySelector(".left-box-item button.current");
    prevoiusCurrent.classList.remove("current");
    x.classList.add("current");
    if(x.id == "corso"){
        corso.style.display = "block";
        studente.style.display = "none";
        insegnante.style.display = "none";
        admin.style.display = "none";
        categoria.style.display = "none";
    }
    if(x.id == "studente"){
        studente.style.display = "block";
        corso.style.display = "none";
        insegnante.style.display = "none";
        admin.style.display = "none";
        categoria.style.display = "none";
    }
    if(x.id == "insegnante"){
        insegnante.style.display = "block";
        studente.style.display = "none";
        corso.style.display = "none";
        admin.style.display = "none";
        categoria.style.display = "none";
    }
    if(x.id == "admin"){
        admin.style.display = "block";
        studente.style.display = "none";
        corso.style.display = "none";
        insegnante.style.display = "none";
        categoria.style.display = "none";
    }
    if(x.id == "categoria"){
        categoria.style.display = "block";
        admin.style.display = "none";
        studente.style.display = "none";
        corso.style.display = "none";
        insegnante.style.display = "none";
    }
}

function setSwitchSectionOfPageListeners(){
    let leftBoxItemList = document.querySelectorAll(".left-box-item button");
    leftBoxItemList.forEach(leftBoxItem =>
        leftBoxItem.addEventListener("click", ev => switchSectionOfPage(leftBoxItem)));
}

setSwitchSectionOfPageListeners();

//show dateInput as date/text
function setDateTypeChangeListeners(){
    let dateInputList = document.querySelectorAll(".dateInput");
    for(let dateInput of dateInputList) {
        dateInput.addEventListener("focus", ev => changeTypeDateText(dateInput));
        dateInput.addEventListener("blur", ev => changeTypeDateText(dateInput));
    }
}

setDateTypeChangeListeners();
