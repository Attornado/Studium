function getMoreCoursesPaging(startingIndex, searchData = "", isFirstSearch = false){
    $.ajax("get-more-courses?coursesPerRequest=4&startingIndex=" + startingIndex+"&search="+searchData, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on course page " + startingIndex/4 + " failed."),
        success: responseObject => {
            let newCourses = responseObject.newCourses, $targetPage = $(".courses-table-body");

            $targetPage.empty();
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPages;
                for(let i = newMaxPage+1; i <= maxPageCourses; i++){
                    $("#pageCourses"+i).remove();
                }
                for(let i = maxPageCourses+1; i <= newMaxPage; i++){
                    if(i == 1)
                        $("#pageCourses"+(i-1)).after("<span class='current visible pageNumBtnCourseAdmin' id='pageCourses"+i+"'> "+i+" </span>");
                    else if(i <= 4)
                        $("#pageCourses"+(i-1)).after("<span class='pageNumBtnCourseAdmin visible' id='pageCourses"+i+"'> "+i+" </span>");
                    else
                        $("#pageCourses"+(i-1)).after("<span class='pageNumBtnCourseAdmin' id='pageCourses"+i+"'> "+i+" </span>");
                    $("#pageCourses"+i).on("click", paginationCoursesListener);
                }
                maxPageCourses = newMaxPage;
            }
            else{
                //se la pagina è vuota, a meno che non sia la prima, cancelliamola e ritorniamo alla prima pagina
                if(newCourses.length == 0 && startingIndex != 0){
                    $(".paginationCourses #pageCourses" + maxPageCourses).remove();
                    maxPageCourses--;
                    $("#pageCourses1").click();
                }

                for (let course of newCourses){
                    let imagePath = '/studium/resources/images/courseImages/' + course.imagePath;
                    $targetPage.append("<tr id='" + course.name + "CourseRow' class='courses-table-body-row'>\n" +
                        "                            <td class='can-be-editable editable-name'>  " + course.name +"  </td>\n" +
                        "                            <td class='can-be-editable editable-category'>  " + course.category + "</td>\n" +
                        "                            <td class='can-be-editable editable-year'>  " + course.year + " </td>\n" +
                        "                            <td class='can-be-editable editable-startDate'>" + course.startDate +" </td>\n" +
                        "                            <td class='can-be-editable editable-endDate'> " + course.endDate + "</td>\n" +
                        "                            <td class='can-be-editable editable-price'> "+ course.price +" </td>\n" +
                        "                            <td class='can-be-editable editable-numEnrolled'>" + course.numEnrolled +" </td>\n" +
                        "                            <td class='can-be-editable editable-teacherUsername'> "+ course.teacher.username +" </td>\n" +
                        "                            <td class='can-be-editable editable-description'> "+ course.description +"</td>\n"+
                        "                            <td class='can-be-editable editable-imagePath'>" +
                        "                                    <input type='file' name='fileCourse' style='display: none'>\n" +
                        "                                    <span>"+ course.imagePath +"</span>" +
                        "                            </td>\n"+
                        "                            <td class=\"can-be-editable editable-certificate\">\n" +
                        "                               <input type='file' name='certificateCourse' style='display: none'>\n" +
                        "                               <span>"+ course.certificate + "</span>\n" +
                        "                            </td>" +
                        "                            <td class='form-container'>\n" +
                        "                                <form class='changeCourseForm' name='changeCourseForm' method='post' action='changeCourse'>\n" +
                        "                                    <input type='hidden' value='"+course.name+"' name='changeCourse' class='changeCourseOldName'>\n" +
                        "                                    <input type='submit' value='📝' class='changeCourseAdminButton'>\n" +
                        "                                    <span class=\"errorCourseMessage\" style=\"color: #c75450; display: none\"></span>" +
                        "                                </form>\n" +
                        "                            </td>\n" +
                        "                            <td class='form-container'>\n" +
                        "                                <form name='removeCourseForm' class='removeCourseForm' method='post' action='removeCourse-servlet'>\n" +
                        "                                    <input type='hidden' value='"+course.name+"' name='removeCourse' class='removeCourseOldName'>\n" +
                        "                                    <input type='submit' value='✗' class='removeCourseAdminButton' class='removeCourseOldName'>\n" +
                        "                                </form>\n" +
                        "                            </td>\n" +
                        "                        </tr>");
                }
            }
            $(".changeCourseAdminButton").on("click", changeCourseListener);
            $(".removeCourseForm").on("submit", ev => ev.preventDefault());
            $(".removeCourseAdminButton").on("click", removeCourseListener);
        }
    });
}

var changeCourseListener = ev => {
    ev.preventDefault();
    var $target = $(ev.target);
    var $editableContent = $target.closest(".courses-table-body-row").find(".can-be-editable");
    var $updateContent = $target.closest(".courses-table-body-row").find(".form-container");
    var fd = new FormData();
    if($target.val() == "📝"){
        //rendiamo il contenuto della riga editabile
        $editableContent.prop("contenteditable", true);
        //nascondiamo il nome del file immagine e del certificato e mostriamo gli input[type=file]
        $editableContent.filter(".editable-imagePath").find(".imageContainer").css("display", "none");
        $editableContent.filter(".editable-imagePath").find("span").css("display", "none");
        $editableContent.filter(".editable-imagePath").find("input[type=file]").css("display", "unset");
        $editableContent.filter(".editable-certificate").find("span").css("display", "none");
        $editableContent.filter(".editable-certificate").find(".imageContainer").css("display", "none");
        $editableContent.filter(".editable-certificate").find("input[type=file]").css("display", "unset");
        //cambiamo il bottone da change a submit
        $target.val("Submit");
        //aggiungiamo il controllo dell'input
        $(".courses-table-body-row .can-be-editable:not(.editable-certificate, .editable-imagePath)").on("input",
            validateCourseTableRowInputsListener);
    }
    else{
        $editableContent.removeAttr("contenteditable"); //rendiamo il contenuto non editabile
        $target.val("📝"); //cambiamo il valore nuovamente a change

        //prendiamo il valore di input dei campi file, la nuova immagine e il nuovo certificato, ed inseriamoli nel form data, se esistono
        let newImageFile = $editableContent.filter(".editable-imagePath").find("input[type=file]")[0].files[0];
        if(newImageFile != null && newImageFile != undefined)
            fd.append("course-image", newImageFile, "course-image.jpg");
        let newCertificateFile = $editableContent.filter(".editable-certificate").find("input[type=file]")[0].files[0];
        if(newCertificateFile != null && newCertificateFile != undefined)
            fd.append("certificate", newCertificateFile, "certificate.txt");

        //prendiamo gli altri campi di input ed inseriamoli nel form data
        fd.append("courseName", $editableContent.filter(".editable-name").text().trim());
        fd.append("category", $editableContent.filter(".editable-category").text().trim());
        fd.append("year", $editableContent.filter(".editable-year").text().trim());
        fd.append("price", $editableContent.filter(".editable-price").text().trim());
        fd.append("teacherUsername", $editableContent.filter(".editable-teacherUsername").text().trim());
        fd.append("oldName", $updateContent.find(".changeCourseOldName").val());
        fd.append("startDate", $editableContent.filter(".editable-startDate").text().trim());
        fd.append("endDate", $editableContent.filter(".editable-endDate").text().trim());
        fd.append("description", $editableContent.filter(".editable-description").text().trim());

        //inviamo la richiesta asincrona
        $.ajax("changeCourse", {
            method: "POST",
            dataType: "json",
            enctype : 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: ev => alert("Change course request failed."),
            success: responseObject => {
                let msg, type, updatedCourse, oldName, $editedRow;

                //leggiamo la risposta json
                updatedCourse = responseObject.updatedCourse;
                oldName = responseObject.oldName;
                $editedRow = $(document.getElementById(oldName + "CourseRow"));
                msg = responseObject.message;
                type = responseObject.type;

                //aggiorniamo gli input type=hidden con il courseName apposito, e aggiorniamo la riga della tabella
                $editedRow.find(".changeCourseOldName").val(updatedCourse.name);
                $editedRow.find(".removeCourseOldName").val(updatedCourse.name);
                //eventuale codice per visualizzare l'immagine
                $editedRow.find(".editable-imagePath span").text(updatedCourse.imagePath);
                $editedRow.find(".editable-description").text(updatedCourse.description);
                $editedRow.find(".editable-name").text(updatedCourse.name);
                $editedRow.find(".editable-certificate span").text(updatedCourse.certificate);
                $editedRow.find(".editable-price").text(updatedCourse.price);
                $editedRow.find(".editable-startDate").text(updatedCourse.startDate);
                $editedRow.find(".editable-endDate").text(updatedCourse.endDate);
                $editedRow.find(".editable-category").text(updatedCourse.category);
                $editedRow.find(".editable-year").text(updatedCourse.year);
                $editedRow.find(".editable-teacherUsername").text(updatedCourse.teacher.username);
                $editedRow.find(".numEnrolled").text(updatedCourse.numEnrolled);
                $editedRow.prop("id", updatedCourse.name + "CourseRow");

                //mostriamo il messaggio di popup
                showPopupMessage(type, msg, 8);
            }
        });
        $editableContent.filter(".editable-imagePath").find("input[type=file]").css("display", "none");
        $editableContent.filter(".editable-imagePath").find(".imageContainer").css("display", "block");
        $editableContent.filter(".editable-imagePath").find("span").css("display", "block");
        $editableContent.filter(".editable-certificate").find("input[type=file]").css("display", "none");
        $editableContent.filter(".editable-certificate").find(".imageContainer").css("display", "block");
        $editableContent.filter(".editable-certificate").find("span").css("display", "block");
        /*$updateContent.find(".changeCourseOldName").val($updateContent.filter(".editable-name").text());
        $updateContent.find(".removeCourseOldName").val($updateContent.filter(".editable-name").text());*/
    }
};

//validazione dell'input
var validateCourseTableRowInputsListener = ev => {
    let $targetRow, namePattern = new RegExp("^(([A-Za-z][a-z0-9]*([-'\\s\\.]))*([A-Za-z0-9][A-Za-z0-9]*))$"),
        yearPattern = new RegExp("^\\d{4}$"),
        datePattern = new RegExp("^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$"),
        pricePattern = new RegExp("^\\d+([\\.,]\\d{1,2})?$"),
        teacherUsernamePattern = new RegExp("^[A-Za-z0-9]{6,20}$"),
        nameText, descriptionText, yearText, startDateText, endDateText, priceText,
        teacherUsernameText, $errorMessage;

    $targetRow = $(ev.target).closest("tr");
    descriptionText = $targetRow.find(".editable-description").text().trim();
    nameText = $targetRow.find(".editable-name").text().trim();
    yearText = $targetRow.find(".editable-year").text().trim();
    startDateText = $targetRow.find(".editable-startDate").text().trim();
    endDateText = $targetRow.find(".editable-endDate").text().trim();
    priceText = $targetRow.find(".editable-price").text().trim();
    teacherUsernameText = $targetRow.find(".editable-teacherUsername").text().trim();
    $errorMessage = $targetRow.find(".errorCourseMessage");

    if(nameText.length > 50 || nameText.length < 3 || !namePattern.test(nameText)){
        $targetRow.find(".changeCourseAdminButton").hide();
        $errorMessage.css("display", "unset");
        $errorMessage.text("Error: course name must contain from 3 to 50 characters, " +
            "including letters, numbers and separators.");
    }
    else if(descriptionText.length > 1000 || descriptionText.length < 10){
        $targetRow.find(".changeCourseAdminButton").hide();
        $errorMessage.css("display", "unset");
        $errorMessage.text("Error: course description must contain from 10 to 1000 characters!");
    }
    else if(!yearPattern.test(yearText)){
        $targetRow.find(".changeCourseAdminButton").hide();
        $errorMessage.css("display", "unset");
        $errorMessage.text("Error: course year has to be in the format 'YYYY'!");
    }
    else if(!datePattern.test(startDateText) || !datePattern.test(endDateText)){
        $targetRow.find(".changeCourseAdminButton").hide();
        $errorMessage.css("display", "unset");
        $errorMessage.text("Error: course start/end date have to be in the format 'YYYY-MM-DD'!");
    }
    else if(!pricePattern.test(priceText) || priceText.length > 20){
        $targetRow.find(".changeCourseAdminButton").hide();
        $errorMessage.css("display", "unset");
        $errorMessage.text("Error: course price have to be in the format 'digits.digits' or 'digits,digits'!");
    }
    else if(!teacherUsernamePattern.test(teacherUsernameText)){
        $targetRow.find(".changeCourseAdminButton").hide();
        $errorMessage.css("display", "unset");
        $errorMessage.text("Error: course teacher username must contain from 6 to 20 characters, including letters" +
            " and digits!");
    }
    else{
        $targetRow.find(".changeCourseAdminButton").show();
        $errorMessage.css("display", "none");
        $errorMessage.text("");
    }
};

var paginationCoursesListener = ev =>{
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationCourses span.current"), $pageBtn,
        $targetPageBtn;

    if($target.prop("id") == "ellipseSxCourses")
        $target = $(".pageNumBtnCourseAdmin.visible").first().prev();
    if($target.prop("id") == "ellipseDxCourses")
        $target = $(".pageNumBtnCourseAdmin.visible").last().next();
    if($target.prop("id") == "previousPageCourses"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.prev("span.pageNumBtnCourseAdmin");
    }
    else if($target.prop("id") == "nextPageCourses"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPageCourses)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.next("span.pageNumBtnCourseAdmin");
    }

    targetIdNum = parseInt($target.text());
    $targetPageBtn = $("#pageCourses"+targetIdNum);
    $currentPage.removeClass("current");
    $targetPageBtn.addClass("current");

    $(".paginationCourses .pageNumBtnCourseAdmin.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPageCourses <= 4){
        for(let i = 1; i <= 4; i++){
            $pageBtn = $("#pageCourses"+i);
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else if(targetIdNum == maxPageCourses || targetIdNum == maxPageCourses-1){
        for(let i = 0; i <= 3; i++){
            $pageBtn = $("#pageCourses"+(maxPageCourses-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageCourses"+(targetIdNum-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageCourses"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }

    if(parseInt($(".pageNumBtnCourseAdmin.visible").first().text()) != 1)
        $("#ellipseSxCourses").addClass("visible");
    else{
        $("#ellipseSxCourses").removeClass("visible");
    }
    if(parseInt($(".pageNumBtnCourseAdmin.visible").last().text()) != maxPageCourses)
        $("#ellipseDxCourses").addClass("visible");
    else
        $("#ellipseDxCourses").removeClass("visible");

    getMoreCoursesPaging((targetIdNum-1)*4, $(".searchBarCourseAdmin input[type=text]").val().trim());
}

var removeCourseListener = ev => {
    ev.preventDefault();
    let $targetRow = $(ev.target).closest("tr"), courseName;
    courseName = $targetRow.find(".removeCourseOldName").val();
    $.ajax("remove-course?removeCourse=" + courseName, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request of course " + courseName + " removal failed."),
        success: responseObject => {
            let removedCourseName = responseObject.removedCourseName, type= responseObject.type,
                msg = responseObject.msg;
            if(removedCourseName != null && removedCourseName != undefined)
                $(document.getElementById(removedCourseName + "CourseRow")).remove();
            //$("#pageCourses" + maxPageCourses).click();
            //triggeriamo la ricerca per cancellare eventuali pagine vuote
            $("#searchBarContainerCourseAdmin button[type=submit]").click();
            showPopupMessage(type, msg, 8);
        }
    });
};

$(document).ready(function () {
    //async course change
    $(".changeCourseAdminButton").on("click", changeCourseListener);

    //pagination
    $(".paginationCourses span").on("click", paginationCoursesListener);

    //research
    $(".searchBarCourseAdmin button").on("click", ev => {
       ev.preventDefault();
       let $searchInput = $(".searchBarCourseAdmin input[type=text]");
       if($searchInput.val().trim().match(new RegExp("^[a-zA-Z0-9]*$"))){
           getMoreCoursesPaging(0, $searchInput.val().trim(), true);
           $("#pageCourses1").click();
       }
       else
           alert("You must enter a valid name (numbers or letters)");
    });

    //async course registration
    $("#addCourseForm").on("submit", ev => ev.preventDefault());

    $("#submitAdminButtonContainerAddCourse input[type=submit]").on("click", ev => {
        ev.preventDefault();
        let fd = new FormData(document.getElementById("addCourseForm"));
        $.ajax("add-course", {
            method: "POST",
            dataType: "json",
            enctype : 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: ev => alert("Request on course adding failed."),
            success: responseObject => {
                let newCourse = responseObject.newCourse;
                if (newCourse != null && newCourse != undefined){
                    $(".courses-table-body").append("<tr id='" + newCourse.name + "CourseRow' class='courses-table-body-row'>\n" +
                        "                                <td class='can-be-editable editable-name'>" + newCourse.name + "</td>\n" +
                        "                                <td class='can-be-editable editable-category'>" + newCourse.category + "</td>\n" +
                        "                                <td class='can-be-editable editable-year'>" + newCourse.year + "</td>\n" +
                        "                                <td class='can-be-editable editable-startDate'>" + newCourse.startDate + "</td>\n" +
                        "                                <td class='can-be-editable editable-endDate'>" + newCourse.endDate + "</td>\n" +
                        "                                <td class='can-be-editable editable-price'>" + newCourse.price + "</td>\n" +
                        "                                <td class='can-be-editable editable-numEnrolled'>" + newCourse.numEnrolled + "</td>\n" +
                        "                                <td class='can-be-editable editable-teacherUsername'>" + newCourse.teacher.username + "</td>\n" +
                        "                                <td class='can-be-editable editable-description'>" + newCourse.description + "</td>\n" +
                        "                                <td class='can-be-editable editable-imagePath'>\n" +
                        "                                    <input type='file' name='fileCourse' style='display: none'>\n" +
                        "                                    <span>" + newCourse.imagePath + "</span>\n" +
                        "                                </td>\n" +
                        "                                <td class=\"can-be-editable editable-certificate\">\n" +
                        "                                    <input type='file' name='certificateCourse' style='display: none'>\n" +
                        "                                    <span>" + newCourse.certificate + "</span>\n" +
                        "                                </td>\n" +
                        "                                <td class='form-container'>\n" +
                        "                                    <form class='changeCourseForm' name='changeCourseForm' method='post' action='changeCourse'>\n" +
                        "                                        <input type='hidden' value='" + newCourse.name + "' name='changeCourse' class='changeCourseOldName'>\n" +
                        "                                        <input type='submit' value='Change' class='changeCourseAdminButton'>\n" +
                        "                                        <span class=\"errorCourseMessage\" style=\"color: #c75450; display: none\"></span>\n" +
                        "                                    </form>\n" +
                        "                                </td>\n" +
                        "                                <td class='form-container'>\n" +
                        "                                    <form name='removeCourseForm' class='removeCourseForm' method='post' action='removeCourse-servlet'>\n" +
                        "                                        <input type='hidden' value='" + newCourse.name + "' name='removeCourse'>\n" +
                        "                                        <input type='submit' value='Remove' class='removeCourseAdminButton'>\n" +
                        "                                    </form>\n" +
                        "                                </td>\n" +
                        "                            </tr>");
                    $(".changeCourseAdminButton").on("click", changeCourseListener);
                }
                //triggeriamo la ricerca per generare eventuali nuove pagine
                $("#searchBarContainerCourseAdmin button[type=submit]").click();
                showPopupMessage(responseObject.type, responseObject.message, 8);
            }
        });
    });

    //async course removal
    $(".removeCourseForm").on("submit", ev => ev.preventDefault());
    $(".removeCourseAdminButton").on("click", removeCourseListener);
});