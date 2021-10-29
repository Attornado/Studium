function getMoreTeachersPaging(startingIndex, searchData = "", isFirstSearch = false) {
    $.ajax("get-more-teachers?teachersPerRequest=4&startingIndex="+startingIndex+"&search="+searchData,{
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on teacher page " + startingIndex/4 + " failed."),
        success: responseObject =>{
            let newTeachers = responseObject.newTeachers, $targetPage = $(".teachers-table-body");
            $targetPage.empty();
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPages;
                for(let i = newMaxPage+1; i <= maxPageTeachers; i++){
                    $("#pageTeachers"+i).remove();
                }
                for(let i = maxPageTeachers+1; i <= newMaxPage; i++){
                    if(i == 1)
                        $("#pageTeachers"+(i-1)).after("<span class='current visible pageNumBtnTeacherAdmin' id='pageTeachers"+i+"'> "+i+" </span>");
                    else if(i <= 4)
                        $("#pageTeachers"+(i-1)).after("<span class='pageNumBtnTeacherAdmin visible' id='pageTeachers"+i+"'> "+i+" </span>");
                    else
                        $("#pageTeachers"+(i-1)).after("<span class='pageNumBtnTeacherAdmin' id='pageTeachers"+i+"'> "+i+" </span>");
                    $("#pageTeachers"+i).on("click", paginationTeachersListener);
                }
                maxPageTeachers = newMaxPage;
            }
            else{
                //se la pagina è vuota, a meno che non sia la prima, cancelliamola e ritorniamo alla prima pagina
                if(newTeachers.length == 0 && startingIndex != 0){
                    $(".paginationTeachers #pageTeachers" + maxPageTeachers).remove();
                    maxPageTeachers--;
                    $("#pageTeachers1").click();
                }
                for(let teacher of newTeachers){
                    $targetPage.append("<tr id='" + teacher.username + "TeacherRow' class='teachers-table-body-row'>\n" +
                        "                            <td> "+ teacher.username +" </td>\n" +
                        "                            <td> "+ teacher.curriculum +"</td>\n" +
                        "                            <td class='form-container'>\n" +
                        "                                <form name='removeTeacherForm' class='removeTeacherForm' method='post' action='removeTeacher-servlet'>\n" +
                        "                                    <input type='hidden' value='"+teacher.username+"' name='removeTeacher' class='teacherNameForRemove'>\n" +
                        "                                    <input type='submit' value='✗' class='removeTeacherAdminButton'>\n" +
                        "                                </form>\n" +
                        "                            </td>\n" +
                        "                        </tr>")
                }
                //async teacher removal
                $(".removeTeacherForm").on("submit", ev => ev.preventDefault());
                $(".removeTeacherAdminButton").on("click", removeTeacherListener);
            }
        }
    });
}

var paginationTeachersListener = ev =>{
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationTeachers span.current"), $pageBtn,
        $targetPageBtn;

    if($target.prop("id") == "ellipseSxTeachers")
        $target = $(".pageNumBtnTeacherAdmin.visible").first().prev();
    if($target.prop("id") == "ellipseDxTeachers")
        $target = $(".pageNumBtnTeacherAdmin.visible").last().next();
    if($target.prop("id") == "previousPageTeachers"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.prev("span.pageNumBtnTeacherAdmin");
    }
    else if($target.prop("id") == "nextPageTeachers"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPageTeachers)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.next("span.pageNumBtnTeacherAdmin");
    }

    targetIdNum = parseInt($target.text());
    $targetPageBtn = $("#pageTeachers"+targetIdNum);
    $currentPage.removeClass("current");
    $targetPageBtn.addClass("current");

    $(".paginationTeachers .pageNumBtnTeacherAdmin.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPageTeachers <= 4){
        for(let i = 1; i <= 4; i++){
            $pageBtn = $("#pageTeachers"+i);
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else if(targetIdNum == maxPageTeachers || targetIdNum == maxPageTeachers){
        for(let i = 0; i <= 3; i++){
            $pageBtn = $("#pageTeachers"+(maxPageTeachers-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageTeachers"+(targetIdNum-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageTeachers"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }

    if(parseInt($(".pageNumBtnTeacherAdmin.visible").first().text()) != 1)
        $("#ellipseSxTeachers").addClass("visible");
    else{
        $("#ellipseSxTeachers").removeClass("visible");
    }
    if(parseInt($(".pageNumBtnTeacherAdmin.visible").last().text()) != maxPageTeachers)
        $("#ellipseDxTeachers").addClass("visible");
    else
        $("#ellipseDxTeachers").removeClass("visible");

    getMoreTeachersPaging((targetIdNum-1)*4, $(".searchBarTeacherAdmin input[type=text]").val().trim());
};

var removeTeacherListener = ev => {
    ev.preventDefault();
    let $targetRow = $(ev.target).closest("tr"), teacherName;
    teacherName = $targetRow.find(".teacherNameForRemove").val();
    $.ajax("remove-teacher?removeTeacher=" + teacherName, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request of teacher " + teacherName + " removal failed."),
        success: responseObject => {
            let removedTeacherName = responseObject.removedTeacherName, type= responseObject.type,
                msg = responseObject.msg;
            if(removedTeacherName != null && removedTeacherName != undefined)
                $(document.getElementById(removedTeacherName + "TeacherRow")).remove();
            //spostiamoci sull'ultima pagina per eliminare eventualemente delle pagine vuotex
            //$("#pageTeachers" + maxPageTeachers).click();
            //triggeriamo la ricerca per cancellare eventuali pagine vuote eventuali nuove pages
            $("#searchBarContainerTeacherAdmin button[type=submit]").click();
            showPopupMessage(type, msg, 8);
        }
    });
};

$(document).ready(function () {

    //paginazione
    $(".paginationTeachers span").on("click", paginationTeachersListener);
    $(".searchBarTeacherAdmin button").on("click", ev =>{
       ev.preventDefault();
       if($(".searchBarTeacherAdmin input[type=text]").val().trim().match(new RegExp("^[a-zA-Z0-9]*$"))){
           getMoreTeachersPaging(0, $(".searchBarTeacherAdmin input[type=text]").val().trim(), true);
           $("#pageTeachers1").click();
       }
       else
           alert("You must enter a valid name (numbers or letters)");
    });

    //async teacher removal
    $(".removeTeacherForm").on("submit", ev => ev.preventDefault());
    $(".removeTeacherAdminButton").on("click", removeTeacherListener);

    //async teacher add
    $("#addTeacherForm").on("submit", ev => ev.preventDefault());

    $("#submitAdminButtonContainerAddTeacher input[type=submit]").on("click", ev => {
        ev.preventDefault();
        let fd = new FormData(document.getElementById("addTeacherForm"));
        $.ajax("add-teacher", {
            method: "POST",
            dataType: "json",
            enctype : 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: ev => alert("Request on teacher adding failed."),
            success: responseObject => {
                //triggeriamo la ricerca per generare eventuali nuove pages
                $("#searchBarContainerTeacherAdmin button[type=submit]").click();
                showPopupMessage(responseObject.type, responseObject.msg, 8);
            }
        });
    });
})