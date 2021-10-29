let addCourseForm = document.getElementById("addCourseForm"),
    submitAdminButtonContainerAddCourse = document.getElementById("submitAdminButtonContainerAddCourse");

addEmptyCheckToTextFieldsAdmin("addCourseForm");
submitAdminButtonContainerAddCourse.addEventListener("click", setErrorListenerAdminAddCourse);
$(addCourseForm).on("input", ev => {
    let nameField = document.getElementById("courseName");
    let categoryField = document.getElementById("category");
    let yearField = document.getElementById("year");
    let startDateField = document.getElementById("startDate");
    let endDateField = document.getElementById("endDate");
    let priceField = document.getElementById("price");
    let teacherField = document.getElementById("teacher");
    let certificateField = document.getElementById("certificate");
    let imageField = document.getElementById("course-image");
    let descriptionField = document.getElementById("description");
    let errorMessage = document.getElementById("errorMessageAddCourse");
    let flag = true;

    if(!checkCourseName(nameField)){
        errorMessage.textContent = "Errore sul nome del corso";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkCategoryName(categoryField)){
        errorMessage.textContent = "Errore sul nome della categoria";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkYear(yearField)){
        errorMessage.textContent = "Errore sull'anno";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkDate(startDateField) || !checkDate(endDateField)){
        errorMessage.textContent = "Errore sulla data di inizio e/o fine";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkPrice(priceField)){
        errorMessage.textContent = "Errore sul prezzo";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkTeacher(teacherField)){
        errorMessage.textContent = "Errore sul professore";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkCertificate(certificateField)){
        errorMessage.textContent = "Errore sul certificato";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkImage(imageField)){
        errorMessage.textContent = "Errore sull'immagine";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkDescription(descriptionField)){
        errorMessage.textContent = "Errore sulla descrizione";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(flag) {
        errorMessage.classList.remove("toShow");
        $(".submitBtn").removeAttr("disabled");
    }
});
addCourseForm.onsubmit = ev =>{
    let nameField = document.getElementById("courseName");
    let categoryField = document.getElementById("category");
    let yearField = document.getElementById("year");
    let startDateField = document.getElementById("startDate");
    let endDateField = document.getElementById("endDate");
    let priceField = document.getElementById("price");
    let teacherField = document.getElementById("teacher");
    let certificateField = document.getElementById("certificate");
    let imageField = document.getElementById("course-image");
    let descriptionField = document.getElementById("description");
    let errorMessage = document.getElementById("errorMessageAddCourse");

    if(!checkCourseName(nameField)){
            errorMessage.textContent = "Errore sul nome del corso";
            errorMessage.classList.add("toShow");
            return false;
    }
    if(!checkCategoryName(categoryField)){
        errorMessage.textContent = "Errore sul nome della categoria";
        errorMessage.classList.add("toShow");
        return false;
    }
    if(!checkYear(yearField)){
        errorMessage.textContent = "Errore sull'anno";
        errorMessage.classList.add("toShow");
        return false;
    }
    if(!checkDate(startDateField) || !checkDate(endDateField)){
        errorMessage.textContent = "Errore sulla data di inizio e/o fine";
        errorMessage.classList.add("toShow");
        return false;
    }
    if(!checkPrice(priceField)){
        errorMessage.textContent = "Errore sul prezzo";
        errorMessage.classList.add("toShow");
        return false;
    }
    if(!checkTeacher(teacherField)){
        errorMessage.textContent = "Errore sul professore";
        errorMessage.classList.add("toShow");
        return false;
    }
    if(!checkCertificate(certificateField)){
        errorMessage.textContent = "Errore sul certificato";
        errorMessage.classList.add("toShow");
        return false;
    }
    if(!checkImage(imageField)){
        errorMessage.textContent = "Errore sull'immagine";
        errorMessage.classList.add("toShow");
        return false;
    }
    if(!checkDescription(descriptionField)){
        errorMessage.textContent = "Errore sulla descrizione";
        errorMessage.classList.add("toShow");
        return false;
    }
    errorMessage.classList.remove("toShow");
    return true;
};

let addCategoryForm = document.getElementById("addCategoryForm"),
    submitAdminButtonContainerAddCategory = document.getElementById("submitAdminButtonContainerAddCategory");

addEmptyCheckToTextFieldsAdmin("addCategoryForm");
submitAdminButtonContainerAddCategory.addEventListener("click", setErrorListenerAdminAddCategory);
$(addCategoryForm).on("input", ev => {
    let nameField = document.getElementById("categoryName");
    let imageField = document.getElementById("image_path");
    let descriptionField = document.getElementById("description_category");
    let errorMessage = document.getElementById("errorMessageAddCategory");
    let flag = true;

    if(!checkCategoryName(nameField)){
        errorMessage.textContent = "Errore: nome categoria";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkImage(imageField)){
        errorMessage.textContent = "Errore: immagine";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkDescription(descriptionField)){
        errorMessage.textContent = "Errore: descrizione";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(flag) {
        errorMessage.classList.remove("toShow");
        $(".submitBtn").removeAttr("disabled");
    }
});
addCategoryForm.onsubmit = ev =>{
    let nameField = document.getElementById("categoryName");
    let imageField = document.getElementById("image_path");
    let descriptionField = document.getElementById("description_category");
    let errorMessage = document.getElementById("errorMessageAddCategory");
    let flag = true;

    if(!checkCategoryName(nameField)){
        errorMessage.textContent = "Errore: nome categoria";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    else if(!checkImage(imageField)){
        errorMessage.textContent = "Errore: immagine";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    else if(!checkDescription(descriptionField)){
        errorMessage.textContent = "Errore: descrizione";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(flag)
        errorMessage.classList.remove("toShow");
    return flag;
};

/*let removeCategoryForm = document.getElementById("removeCategoryForm");
    //submitAdminButtonContainerRemoveCategory = document.getElementById("submitAdminButtonContainerRemoveCategory");

addEmptyCheckToTextFieldsAdmin("removeCategoryForm");
//submitAdminButtonContainerRemoveCategory.addEventListener("click", setErrorListenerAdminRemoveCategory);
removeCategoryForm.onsubmit = ev =>{
    let nameField = document.getElementById("removeCategory");
    let errorMessage = document.getElementById("errorMessageRemoveCategory");
};*/

let addTeacherForm = document.getElementById("addTeacherForm"),
    submitAdminButtonContainerAddTeacher = document.getElementById("submitAdminButtonContainerAddTeacher");

addEmptyCheckToTextFieldsAdmin("addTeacherForm");
submitAdminButtonContainerAddTeacher.addEventListener("click", setErrorListenerAdminAddTeacher);
$(addTeacherForm).on("input", ev => {
    let usernameField = document.getElementById("userName");
    let curriculumField = document.getElementById("curriculum");
    let errorMessage = document.getElementById("errorMessageAddTeacher");
    let flag = true;

    if(!checkTeacher(usernameField)){
        errorMessage.textContent = "Errore: username";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(!checkCurriculum(curriculumField)){
        errorMessage.textContent = "Errore: curriculum";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(flag) {
        errorMessage.classList.remove("toShow");
        $(".submitBtn").removeAttr("disabled");
    }
});
addTeacherForm.onsubmit = ev =>{
    let usernameField = document.getElementById("userName");
    let curriculumField = document.getElementById("curriculum");
    let errorMessage = document.getElementById("errorMessageAddTeacher");

    if(!checkTeacher(usernameField)){
        errorMessage.textContent = "Errore: username";
        errorMessage.classList.add("toShow");
        return false;
    }
    else if(!checkCurriculum(curriculumField)){
        errorMessage.textContent = "Errore: curriculum";
        errorMessage.classList.add("toShow");
        return false;
    }
    else{
        errorMessage.classList.remove("toShow");
    }
    return true;
};

let addAdminForm = document.getElementById("addAdminForm"),
    submitAdminButtonContainerAddAdmin = document.getElementById("submitAdminButtonContainerAddAdmin");

addEmptyCheckToTextFieldsAdmin("addAdminForm");
submitAdminButtonContainerAddAdmin.addEventListener("click", setErrorListenerAdminAddAdmin);
$(addAdminForm).on("click", ev => {
    let usernameField = document.getElementById("addAdmin");
    let errorMessage = document.getElementById("errorMessageAddAdmin");
    let flag = true;

    if(!checkUsername(usernameField)){
        errorMessage.textContent = "Errore: username";
        errorMessage.classList.add("toShow");
        flag = false;
    }
    if(flag) {
        errorMessage.classList.remove("toShow");
        $(".submitBtn").removeAttr("disabled");
    }
});
addAdminForm.onsubmit = ev => {
    let usernameField = document.getElementById("addAdmin");
    let errorMessage = document.getElementById("errorMessageAddAdmin");

    if(!checkUsername(usernameField)){
        errorMessage.textContent = "Errore: username";
        errorMessage.classList.add("toShow");
        return false;
    }
    else{
        errorMessage.classList.remove("toShow");
    }
    return true;
};

/*let removeAdminForm = document.getElementById("removeAdminForm");
    //submitAdminButtonContainerRemoveAdmin = document.getElementById("submitAdminButtonContainerRemoveAdmin");

addEmptyCheckToTextFieldsAdmin("removeAdminForm");
//submitAdminButtonContainerRemoveAdmin.addEventListener("click", setErrorListenerAdminRemoveAdmin);
removeAdminForm = ev =>{
    let usernameField = document.getElementById("removeAdmin");
    let errorMessage = document.getElementById("removeAdmin");
};*/

/*$(".removeAdminButton").on("click", ev =>{
    let $target = $(ev.target);
    let teacherName = $target.siblings("input[type = hidden]").val();
    $.ajax("removeTeacher-servlet?removeTeacher="+teacherName, {
        method:"GET",
        dataType:"text",
        success: function (responseText) {
            alert(responseText);
        },
        error: function () {
            alert("Gigino");
        }
    });
})*/