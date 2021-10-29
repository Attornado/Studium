function getMoreAdminPaging(startingIndex, searchData = "", isFirstSearch = false) {
    $.ajax("get-more-admins?adminsPerRequest=4&startingIndex="+startingIndex+"&search="+searchData,{
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on admin page "+ startingIndex/4 + " failed"),
        success: responseObject =>{
            let newAdmins = responseObject.newAdmins, $targetPage = $(".admins-table-body");
            $targetPage.empty();
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPages;
                for(let i = newMaxPage+1; i <= maxPageAdmins; i++){
                    $("#pageAdmins"+i).remove();
                }
                for(let i = maxPageAdmins+1; i <= newMaxPage; i++){
                    if(i == 1)
                        $("#pageAdmins"+(i-1)).after("<span class='current visible pageNumBtnAdminAdmin' id='pageAdmins"+i+"'> "+i+" </span>");
                    else if(i <= 4)
                        $("#pageAdmins"+(i-1)).after("<span class='pageNumBtnAdminAdmin visible' id='pageAdmins"+i+"'> "+i+" </span>");
                    else
                        $("#pageAdmins"+(i-1)).after("<span class='pageNumBtnAdminAdmin' id='pageAdmins"+i+"'> "+i+" </span>");
                    $("#pageAdmins"+i).on("click", paginationAdminsListener);
                }
                maxPageAdmins = newMaxPage;
            }
            else{
                //se la pagina è vuota, a meno che non sia la prima, cancelliamola e ritorniamo alla prima pagina
                if(newAdmins.length == 0 && startingIndex != 0){
                    $(".paginationAdmins #pageAdmins" + maxPageAdmins).remove();
                    maxPageAdmins--;
                    $("#pageAdmins1").click();
                }
                for(let admin of newAdmins){
                    $targetPage.append("<tr id='" + admin.username + "AdminRow' class='admins-table-body-row'>\n" +
                        "                            <td> "+ admin.username +" </td>\n" +
                        "                            <td> "+ admin.mail +" </td>\n" +
                        "                            <td> "+ admin.name +" </td>\n" +
                        "                            <td> "+ admin.surname +" </td>\n" +
                        "                            <td> "+ admin.CF +" </td>\n" +
                        "                            <td class='form-container'>\n" +
                        "                                <form name='removeAdminForm' class='removeAdminForm' method='post' action='removeAdmin-servlet'>\n" +
                        "                                    <input type='hidden' value='"+admin.username+"' name='removeAdmin' class='adminNameForRemove'>\n" +
                        "                                    <input type='submit' value='✗' class='removeAdminAdminButton'>\n" +
                        "                                </form>\n" +
                        "                            </td>\n" +
                        "                        </tr>"
                    )
                }
                //async admin removal
                $(".removeAdminForm").on("submit", ev => ev.preventDefault());
                $(".removeAdminAdminButton").on("click", removeAdminListener);
            }
        }
    });
}

var paginationAdminsListener = ev =>{
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationAdmins span.current"), $pageBtn,
        $targetPageBtn;

    if($target.prop("id") == "ellipseSxAdmins")
        $target = $(".pageNumBtnAdminAdmin.visible").first().prev();
    if($target.prop("id") == "ellipseDxAdmins")
        $target = $(".pageNumBtnAdminAdmin.visible").last().next();
    if($target.prop("id") == "previousPageAdmins"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.prev("span.pageNumBtnAdminAdmin");
    }
    else if($target.prop("id") == "nextPageAdmins"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPageAdmins)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.next("span.pageNumBtnAdminAdmin");
    }

    targetIdNum = parseInt($target.text());
    $targetPageBtn = $("#pageAdmins"+targetIdNum);
    $currentPage.removeClass("current");
    $targetPageBtn.addClass("current");

    $(".paginationAdmins .pageNumBtnAdminAdmin.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPageAdmins <= 4){
        for(let i = 1; i <= 4; i++){
            $pageBtn = $("#pageAdmins"+i);
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else if(targetIdNum == maxPageAdmins || targetIdNum == maxPageAdmins-1){
        for(let i = 0; i <= 3; i++){
            $pageBtn = $("#pageAdmins"+(maxPageAdmins-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageAdmins"+(targetIdNum-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageAdmins"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }

    if(parseInt($(".pageNumBtnAdminAdmin.visible").first().text()) != 1)
        $("#ellipseSxAdmins").addClass("visible");
    else{
        $("#ellipseSxAdmins").removeClass("visible");
    }
    if(parseInt($(".pageNumBtnAdminAdmin.visible").last().text()) != maxPageAdmins)
        $("#ellipseDxAdmins").addClass("visible");
    else
        $("#ellipseDxAdmins").removeClass("visible");

    getMoreAdminPaging((targetIdNum-1)*4, $(".searchBarAdminAdmin input[type=text]").val().trim());
};

var removeAdminListener = ev => {
    ev.preventDefault();
    let $targetRow = $(ev.target).closest("tr"), adminName;
    adminName = $targetRow.find(".adminNameForRemove").val();
    $.ajax("remove-admin?removeAdmin=" + adminName, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request of admin " + adminName + " removal failed."),
        success: responseObject => {
            let removedAdminName = responseObject.removedAdminName, type= responseObject.type,
                msg = responseObject.msg;
            if(removedAdminName != null && removedAdminName != undefined)
                $(document.getElementById(removedAdminName + "AdminRow")).remove();
            //triggeriamo la ricerca per cancellare eventuali pagine vuote eventuali nuove pages
            $("#searchBarContainerAdminAdmin button[type=submit]").click();
            showPopupMessage(type, msg, 8);
        }
    });
};

$(document).ready(function () {

    //pagination
    $(".paginationAdmins span").on("click", paginationAdminsListener);

    //search
    $(".searchBarAdminAdmin button").on("click", ev =>{
        ev.preventDefault();
        if($(".searchBarAdminAdmin input[type=text]").val().trim().match(new RegExp("^[a-zA-Z0-9]*$"))){
            getMoreAdminPaging(0, $(".searchBarAdminAdmin input[type=text]").val().trim(), true);
            $("#pageAdmins1").click();
        }
        else
            alert("You must eneter a valid name (numbers or letters)");
    });

    //async admin adding
    $("#addAdminForm").on("submit", ev => ev.preventDefault());

    $("#submitAdminButtonContainerAddAdmin input[type=submit]").on("click", ev => {
        ev.preventDefault();
        let fd = new FormData(document.getElementById("addAdminForm"));
        $.ajax("add-admin", {
            method: "POST",
            dataType: "json",
            enctype : 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: ev => alert("Request on admin adding failed."),
            success: responseObject => {
                //triggeriamo la ricerca per generare eventuali nuove pages
                $("#searchBarContainerAdminAdmin button[type=submit]").click();
                //mostriamo il messaggio di popup
                showPopupMessage(responseObject.type, responseObject.msg, 8);
            }
        });
    });

    //async admin removal
    $(".removeAdminForm").on("submit", ev => ev.preventDefault());
    $(".removeAdminAdminButton").on("click", removeAdminListener);
})