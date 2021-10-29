//showPasswordButton
setShowPasswordBtnListeners("loginForm");

//loginFormValidation
let loginForm = document.getElementById("loginForm"),
    submitLoginButtonContainer = document.getElementById("submitLoginButtonContainer");

addEmptyCheckToTextFields("loginForm");
submitLoginButtonContainer.addEventListener("click", ev => {
    let flag = checkFormTextFieldsLength("loginForm"),
        errorMessage = document.getElementById("errorMessage");
    if(flag === 1)
        errorMessage.textContent = "Errore: username e password non possono essere vuoti!";
    else if(flag === 2)
        errorMessage.textContent = "Errore: il testo che hai inserito è troppo lungo! Il massimo è 30 caratteri.";
    if(flag > 0)
        errorMessage.classList.add("toShow");
});
loginForm.onsubmit =  ev => {
    let passField = document.getElementById("passwordField"),
        errorMessage = document.getElementById("errorMessage"),
        usernameField = document.getElementById("usernameField");
    if(!checkPassword(passField) || !checkUsername(usernameField)){
        errorMessage.classList.add("toShow");
        return false;
    }
    return true;
};




