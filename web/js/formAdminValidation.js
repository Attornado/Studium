function hasEmptyTextAdmin(element){
    let text = element.value;
    return text.length === 0 || text.length == 0 || text === "" || text == "" || text == null;
}

function shortTextIsTooLongAdmin(element) {
    let text = element.value;
    return text.length > 50;
}

function checkFormLengthAdmin(formName) {
    var form = document.forms[formName];
    var elements = form.elements;
    for(let i = 0; i < elements.length; i++){
        if(elements[i].getAttribute("type") != null &&
         elements[i].getAttribute("type") != undefined &&
         elements[i].getAttribute("type") == "text"){
            if(hasEmptyTextAdmin(elements[i]))
                return 1;
            else if(shortTextIsTooLongAdmin(elements[i]))
                return 2;
        }
    }
    return 0;
}

var checkFieldChangeListenerAdmin = ev => {
    let form = document.getElementById(ev.target.form.id);
    if(checkFormLengthAdmin(form.name) > 0) { //l'evento è sempre generato da un input del form
        $(".submitBtn").prop("disabled", true);
    }
    else {
        //$(".submitBtn").removeProp("disabled");
        $(".submitBtn").removeAttr("disabled");
    }
};

function addEmptyCheckToTextFieldsAdmin(formName){
    let form = document.forms[formName], elements = form.elements;
    for(let i=0; i < elements.length; i++){
        if(elements[i].getAttribute("type") != null &&
            elements[i].getAttribute("type") !== undefined &&
            (elements[i].getAttribute("type") == "text" ||
                elements[i].getAttribute("type") == "file")){
            elements[i].addEventListener("input", checkFieldChangeListenerAdmin);
        }
    }
}

var setErrorListenerAdminRemoveStudent = ev =>{
    let flag = checkFormLengthAdmin("removeStudentForm");
    let errorMessage = document.getElementById("errorMessageRemoveStudent");
    if (flag === 1)
        errorMessage.textContent = "Errore: i campi non possono essere vuoti";
    if(flag === 2)
        errorMessage.textContent = "Errore: il testo che hai inserito è troppo lungo! Max:30 caratteri";
    if(flag > 0)
        errorMessage.classList.add("toShow");
};

var setErrorListenerAdminAddCourse = ev =>{
    let flag = checkFormLengthAdmin("addCourseForm");
    let errorMessage = document.getElementById("errorMessageAddCourse");
    if (flag === 1)
        errorMessage.textContent = "Errore: i campi non possono essere vuoti";
    if(flag === 2)
        errorMessage.textContent = "Errore: il testo che hai inserito è troppo lungo! Max:30 caratteri";
    if(flag > 0)
        errorMessage.classList.add("toShow");
};

var setErrorListenerAdminRemoveCourse = ev =>{
    let flag = checkFormLengthAdmin("removeCourseForm");
    let errorMessage = document.getElementById("errorMessageRemoveCourse");
    if (flag === 1)
        errorMessage.textContent = "Errore: i campi non possono essere vuoti";
    if(flag === 2)
        errorMessage.textContent = "Errore: il testo che hai inserito è troppo lungo! Max:30 caratteri";
    if(flag > 0)
        errorMessage.classList.add("toShow");
};

var setErrorListenerAdminAddCategory = ev =>{
    let flag = checkFormLengthAdmin("addCategoryForm");
    let errorMessage = document.getElementById("errorMessageAddCategory");
    if (flag === 1)
        errorMessage.textContent = "Errore: i campi non possono essere vuoti";
    if(flag === 2)
        errorMessage.textContent = "Errore: il testo che hai inserito è troppo lungo! Max:30 caratteri";
    if(flag > 0)
        errorMessage.classList.add("toShow");
};

var setErrorListenerAdminRemoveCategory = ev =>{
    let flag = checkFormLengthAdmin("removeCategoryForm");
    let errorMessage = document.getElementById("errorMessageRemoveCategory");
    if (flag === 1)
        errorMessage.textContent = "Errore: i campi non possono essere vuoti";
    if(flag === 2)
        errorMessage.textContent = "Errore: il testo che hai inserito è troppo lungo! Max:30 caratteri";
    if(flag > 0)
        errorMessage.classList.add("toShow");
};

var setErrorListenerAdminAddTeacher = ev =>{
    let flag = checkFormLengthAdmin("addTeacherForm");
    let errorMessage = document.getElementById("errorMessageAddTeacher");
    if (flag === 1)
        errorMessage.textContent = "Errore: i campi non possono essere vuoti";
    if(flag === 2)
        errorMessage.textContent = "Errore: il testo che hai inserito è troppo lungo! Max:30 caratteri";
    if(flag > 0)
        errorMessage.classList.add("toShow");
};


var setErrorListenerAdminAddAdmin = ev =>{
    let flag = checkFormLengthAdmin("addAdminForm");
    let errorMessage = document.getElementById("errorMessageAddAdmin");
    if (flag === 1)
        errorMessage.textContent = "Errore: i campi non possono essere vuoti";
    if(flag === 2)
        errorMessage.textContent = "Errore: il testo che hai inserito è troppo lungo! Max:30 caratteri";
    if(flag > 0)
        errorMessage.classList.add("toShow");
};

var setErrorListenerAdminRemoveAdmin = ev => {
    let flag = checkFormLengthAdmin("removeAdminForm");
    let errorMessage = document.getElementById("errorMessageRemoveAdmin");
    if (flag === 1)
        errorMessage.textContent = "Errore: i campi non possono essere vuoti";
    if(flag === 2)
        errorMessage.textContent = "Errore: il testo che hai inserito è troppo lungo! Max:30 caratteri";
    if(flag > 0)
        errorMessage.classList.add("toShow");
};

function checkUsername(usernameField) {
    let username = usernameField.value, pattern = new RegExp("^[A-Za-z0-9]{6,20}$");
    if(pattern.test(username) && username.length >= 6 && username.length <= 20){
        return true;
    }
    else{
        $(".submitBtn").prop("disabled", true);
        return false;
    }
}

function checkCourseName(courseNameField) {
    let courseName = courseNameField.value;
    let pattern = new RegExp("^(([A-Za-z][a-z0-9]*([-'\\s\\.]))*([A-Za-z0-9][A-Za-z0-9]*))$");
    if(pattern.test(courseName) && courseName.length >= 3 && courseName.length <= 50)
        return true;
    else{
        $(".submitBtn").prop("disabled", true);
        return false;
    }
}

function checkCategoryName(categoryNameField){
    let categoryName = categoryNameField.value;
    let pattern = new RegExp("^(([A-Za-z][a-z0-9]*([-'\\s\\.]))*([A-Za-z0-9][a-z0-9]*))$");
    if(pattern.test(categoryName) && categoryName.length >= 3 && categoryName.length <= 50)
        return true;
    else{
        $(".submitBtn").prop("disabled", true);
        return false;
    }
}

function checkYear(yearField) {
    let year = yearField.value;
    let pattern = new RegExp("^\\d{4}$");
    if(pattern.test(year))
        return true;
    else{
        $(".submitBtn").prop("disabled", true);
        return false;
    }
}

function checkDate(dateField){
    let date = dateField.value;
    let pattern = new RegExp("^\\d{4}[\\/\\-](0?[1-9]|1[012])[\\/\\-](0?[1-9]|[12][0-9]|3[01])$");
    if(pattern.test(date) && date.length === 10)
        return true;
    else{
        $(".submitBtn").prop("disabled", true);
        return false;
    }
}

function checkPrice(priceField) {
    let price = priceField.value;
    let pattern = new RegExp("^\\d+([\\.,]\\d{1,2})?$");
    priceField.value.replace(",", ".");
    if(pattern.test(price))
        return true;
    else{
        $(".submitBtn").prop("disabled", true);
        return false;
    }
}

function checkTeacher(teacherField) {
    let teacher = teacherField.value;
    let pattern = new RegExp("^[A-Za-z0-9]{6,20}$");
    if(pattern.test(teacher) && teacher.length >= 6 && teacher.length <= 20)
        return true;
    else{
        $(".submitBtn").prop("disabled", true);
        return false;
    }
}

function checkCertificate(certificateField) {
    return true;
}

function checkImage(imageField) {
    return true;
}

function checkDescription(descriptionField){
    let description = descriptionField.value;
    if(description.length >= 10 && description.length <= 1000)
        return true;
    else{
        $(".submitBtn").prop("disabled", true);
        return false;
    }
}

function checkCurriculum(curriculumField) {
    let curriculum = curriculumField.value;
    if(curriculum.length >= 10 && curriculum.length <= 1000)
        return true;
    else{
        $(".submitBtn").prop("disabled", true);
        return false;
    }
}

