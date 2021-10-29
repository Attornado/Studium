function getMoreStudentsPaging(startingIndex, searchData = "", isFirstSearch = false) {
    $.ajax("get-more-students?studentsPerRequest=4&startingIndex="+startingIndex+"&search="+searchData,{
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on student page " + startingIndex/4 + " failed."),
        success: responseObject => {
            let newStudents = responseObject.newStudents, $targetPage = $(".students-table-body");
            $targetPage.empty();
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPages;
                for (let i = newMaxPage+1; i <= maxPageStudents; i++){
                    $("#pageStudents"+i).remove();
                }
                for (let i = maxPageStudents+1; i <= newMaxPage; i++){
                    if (i == 1)
                        $("#pageStudents"+(i-1)).after("<span class='current visible pageNumBtnStudentAdmin' id='pageStudents"+i+"'> "+i+" </span>");
                    else if(i <= 4)
                        $("#pageStudents"+(i-1)).after("<span class='pageNumBtnStudentAdmin visible' id='pageStudents"+i+"'> "+i+" </span>");
                    else
                        $("#pageStudents"+(i-1)).after("<span class='pageNumBtnStudentAdmin' id='pageStudents"+i+"'> "+i+" </span>");
                    $("#pageStudents"+i).on("click", paginationStudentsListener);
                }
                maxPageStudents = newMaxPage;
            }
            else{
                //se la pagina è vuota, a meno che non sia la prima, cancelliamola e ritorniamo alla prima pagina
                if(newStudents.length == 0 && startingIndex != 0){
                    $(".paginationStudents #pageStudents" + maxPageStudents).remove();
                    maxPageStudents--;
                    $("#pageStudents1").click();
                }
                for(let student of newStudents){
                    $targetPage.append("<tr id='"+student.username+"UserRow' class='students-table-body-row'>\n" +
                        "                            <td>"+  student.username +" </td>\n" +
                        "                            <td>" + student.mail +" </td>\n" +
                        "                            <td> "+ student.name +" </td>\n" +
                        "                            <td> "+ student.surname +" </td>\n" +
                        "                            <td> "+ student.CF +" </td>\n" +
                        "                            <td class='form-container'>\n" +
                        "                                <form name='removeStudentForm' class='removeStudentForm' method='post' action='removeUser-servlet'>\n" +
                        "                                    <input type='hidden' value='"+student.username+"' name='removeUser' class='usernameForRemove'>\n" +
                        "                                    <input type='submit' value='✗' class='removeStudentAdminButton'>\n" +
                        "                                </form>\n" +
                        "                            </td>\n" +
                        "                        </tr>"
                    )
                }
                //async student removal
                $(".removeStudentForm").on("submit", ev => ev.preventDefault());
                $(".removeStudentAdminButton").on("click", removeUserListener);
            }
        }
        });
}

var paginationStudentsListener = ev => {
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationStudents span.current"), $pageBtn,
        $targetPageBtn;

    if($target.prop("id") == "ellipseSxStudents")
        $target = $(".pageNumBtnStudentAdmin.visible").first().prev();
    if($target.prop("id") == "ellipseDxStudents")
        $target = $(".pageNumBtnStudentAdmin.visible").last().next();
    if($target.prop("id") == "previousPageStudents"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.prev("span.pageNumBtnStudentAdmin");
    }
    else if($target.prop("id") == "nextPageStudents"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPageStudents)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.next("span.pageNumBtnStudentAdmin");
    }

    targetIdNum = parseInt($target.text());
    $targetPageBtn = $("#pageStudents"+targetIdNum);
    $currentPage.removeClass("current");
    $targetPageBtn.addClass("current");

    $(".paginationStudents .pageNumBtnStudentAdmin.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPageStudents <= 4){
        for(let i = 1; i <= 4; i++){
            $pageBtn = $("#pageStudents"+i);
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else if(targetIdNum == maxPageStudents || targetIdNum == maxPageStudents-1){
        for(let i = 0; i <= 3; i++){
            $pageBtn = $("#pageStudents"+(maxPageStudents-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageStudents"+(targetIdNum-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageStudents"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }

    if(parseInt($(".pageNumBtnStudentAdmin.visible").first().text()) != 1)
        $("#ellipseSxStudents").addClass("visible");
    else{
        $("#ellipseSxStudents").removeClass("visible");
    }
    if(parseInt($(".pageNumBtnStudentAdmin.visible").last().text()) != maxPageStudents)
        $("#ellipseDxStudents").addClass("visible");
    else
        $("#ellipseDxStudents").removeClass("visible");

    getMoreStudentsPaging((targetIdNum-1)*4, $(".searchBarStudentAdmin input[type=text]").val().trim());
};

var removeUserListener = ev => {
    ev.preventDefault();
    let $targetRow = $(ev.target).closest("tr"), username;
    username = $targetRow.find(".usernameForRemove").val();
    $.ajax("remove-user?removeUser=" + username, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request of user " + username + " removal failed."),
        success: responseObject => {
            let removedUsername = responseObject.removedUsername, type= responseObject.type,
                msg = responseObject.msg;
            if(removedUsername != null && removedUsername != undefined)
                $(document.getElementById(removedUsername + "UserRow")).remove();
            //$("#pageStudents" + maxPageStudents).click();
            //triggeriamo la ricerca per cancellare eventuali pagine vuote
            $("#searchBarContainerStudentAdmin button[type=submit]").click();
            showPopupMessage(type, msg, 8);
        }
    });
};

$(document).ready(function () {

    //pagination
    $(".paginationStudents span").on("click", paginationStudentsListener);
    $(".searchBarStudentAdmin button").on("click", ev =>{
        ev.preventDefault();
        if($(".searchBarStudentAdmin input[type=text]").val().trim().match(new RegExp("^[a-zA-Z0-9]*$"))){
            getMoreStudentsPaging(0, $(".searchBarStudentAdmin input[type=text]").val().trim(), true);
            $("#pageStudents1").click();
        }
        else
            alert("You must enter a valid name (numbers or letters)");
    });

    //async student removal
    $(".removeStudentForm").on("submit", ev => ev.preventDefault());
    $(".removeStudentAdminButton").on("click", removeUserListener);
})