function getMoreCategoriesPaging(startingIndex=0, searchData="", isFirstSearch = false){
    $.ajax("get-more-categories?categoriesPerRequest=4&startingIndex=" + startingIndex + "&search="+searchData, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on category page " + startingIndex/4+ " failed."),
        success: responseObject => {
            let newCategories = responseObject.newCategories, $targetPage = $(".categories-table-body");

            $targetPage.empty();

            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPages;
                for(let i = newMaxPage + 1; i <= maxPageCategories; i++){
                    $("#pageCategories"+i).remove();
                }
                for(let i = maxPageCategories+1; i <= newMaxPage; i++){
                    if(i == 1)
                        $("#pageCategories"+(i-1)).after("<span class='current visible pageNumBtnCategoryAdmin' id='pageCategories"+i+"'> "+i+" </span>");
                    else if(i <= 4)
                        $("#pageCategories"+(i-1)).after("<span class='pageNumBtnCategoryAdmin visible' id='pageCategories"+i+"'> "+i+" </span>");
                    else
                        $("#pageCategories"+(i-1)).after("<span class='pageNumBtnCategoryAdmin' id='pageCategories"+i+"'> "+i+" </span>");
                    $("#pageCategories"+i).on("click", paginationCategoriesListener);
                }
                maxPageCategories = newMaxPage;
            }

            //se la pagina è vuota, a meno che non sia la prima, cancelliamola e ritorniamo alla prima pagina
            if(newCategories.length == 0 && startingIndex != 0){
                $(".paginationCategories #pageCategories" + maxPageCategories).remove();
                maxPageCategories--;
                $("#pageCategories1").click();
            }


            //aggiungiamo le categorie alla target page
            for(let category of newCategories) {
                let imagePath = '/studium/resources/images/categoryImages/' + category.imagePath; //eventualmente sostituire
                $targetPage.append("<tr id='" + category.name + "CategoryRow' class='categories-table-body-row'>\n" +
                    "                   <td class='can-be-editable editable-name'>" + category.name + "</td>\n" +
                    "                   <td class='can-be-editable editable-description'>" +
                                            category.description +
                    "                   </td>\n" +
                    "                   <td class='can-be-editable editable-imagePath'>" +
                    "                       <input type='file' name='fileCategory' style=\"display: none\">" +
                    "                       <span>"+category.imagePath +"</span>" +
                    "                   </td>\n" +
                    "                   <td class='form-container'>\n" +
                    "                        <form class=\"changeCategoryForm\" name=\"changeCategoryForm\" method=\"post\" action=\"changeCategory-servlet\">\n" +
                    "                            <input type='hidden' value='"+category.name+"' name='changeCategory' class='changeCategoryOldName'>\n" +
                    "                            <input type=\"submit\" value=\"📝\" class=\"changeCategoryAdminButton\">\n" +
                    "                            <span class=\"errorCategoryMessage\" style=\"color: #c75450; display: none\"></span>" +
                    "                        </form>\n" +
                    "                   </td>" +
                    "                   <td class='form-container'>\n" +
                    "                       <form class=\"removeCategoryForm\" name=\"removeCategoryForm\" method=\"post\" action=\"removeCategory\">\n" +
                    "                           <input type=\"hidden\" value=\"" + category.name +"\" name=\"removeCategory\" class='removeCategoryOldName'>\n" +
                    "                           <input type=\"submit\" value=\"✗\" class=\"removeCategoryAdminButton\">\n" +
                    "                       </form>\n" +
                    "                   </td>\n" +
                    "              </tr>");
            }
            $(".changeCategoryAdminButton").on("click", changeCategoryListener);
            //async category removal
            $(".removeCategoryForm").on("submit", ev => ev.preventDefault());
            $(".removeCategoryAdminButton").on("click", removeCategoryListener);
        }
    });
}

var changeCategoryListener = ev =>{
    //impediamo il submit del form
    ev.preventDefault();

    var $target = $(ev.target);
    var $editableContent = $target.closest(".categories-table-body-row").find(".can-be-editable");
    var $updateContent = $target.closest(".categories-table-body-row").find(".form-container");
    var fd = new FormData();

    //se il valore è change, allora rendiamo editabili i campi e mostriamo il form di inserimento del file
    if($target.val() == "📝"){
        //rendiamo il contenuto della riga editabile
        $editableContent.prop("contenteditable", true);
        //nascondiamo il nome del file immagine e mostriamo l'input[type=file]
        $editableContent.filter(".editable-imagePath").find(".imageContainer").css("display", "none");
        $editableContent.filter(".editable-imagePath").find("input[type=file]").css("display", "unset");
        $editableContent.filter(".editable-imagePath").find("span").css("display", "none");
        //cambiamo il bottone da change a submit
        $target.val("Submit");
        //aggiungiamo il controllo dell'input
        $(".categories-table-body-row .editable-name, .categories-table-body-row .editable-description").on("input",
            validateCategoryTableRowInputsListener);
    }
    //altrimenti, mandiamo la richiesta asincrona
    else{
        $editableContent.removeAttr("contenteditable"); //rendiamo il contenuto non editabile
        $target.val("📝"); //cambiamo il valore nuovamente a change

        //prendiamo il valore di input del campo file, la nuova immagine, se esiste, ed inseriamola nel form data
        let newImageFile = $editableContent.filter(".editable-imagePath").find("input[type=file]")[0].files[0];
        if(newImageFile != null && newImageFile != undefined)
            fd.append("fileCategory", newImageFile, "fileCategory.jpg");

        //prendiamo gli altri campi di input ed inseriamoli nel form data
        fd.append("editable-name", $editableContent.filter(".editable-name").text());
        fd.append("editable-description", $editableContent.filter(".editable-description").text());
        fd.append("old-name", $updateContent.find(".changeCategoryOldName").val());

        //inviamo la richiesta asincrona
        $.ajax("changeCategory", {
            method: "POST",
            dataType: "json",
            enctype : 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: ev => alert("Request failed on category page failed."),
            success: responseObject => {
                let msg, type, updatedCategory, oldName, $editedRow, $dropdownItem;

                //leggiamo la risposta json
                updatedCategory = responseObject.updatedCategory;
                oldName = responseObject.oldName;
                $editedRow = $(document.getElementById(oldName + "CategoryRow"));
                $dropdownItem = $(".dropdown-content #" + oldName);
                msg = responseObject.message;
                type = responseObject.type;

                //aggiorniamo gli input type=hidden con il categoryName apposito, e aggiorniamo la riga della tabella
                $editedRow.find(".changeCategoryOldName").val(updatedCategory.name);
                $editedRow.find(".removeCategoryOldName").val(updatedCategory.name);
                //eventuale codice per visualizzare l'immagine
                $editedRow.find(".editable-imagePath span").text(updatedCategory.imagePath);
                $editedRow.find(".editable-description").text(updatedCategory.description);
                $editedRow.find(".editable-name").text(updatedCategory.name);
                $editedRow.prop("id", updatedCategory.name + "CategoryRow");

                //se nel category dropdown c'è una categoria con il nome di quella aggiornata, aggiorniamo il bottone
                $dropdownItem.prop("id", updatedCategory.name);
                $dropdownItem.text(updatedCategory.name);
                $dropdownItem.siblings("input[name=categoryName]").val(updatedCategory.name);

                //mostriamo il messaggio di popup
                showPopupMessage(type, msg, 8);
            }
        });

        //facciamo ritornare la riga della tabella allo stato precedente non modificabile
        $editableContent.filter(".editable-imagePath").find("span").css("display", "unset");
        $editableContent.filter(".editable-imagePath").find(".imageContainer").css("display", "unset");
        $editableContent.filter(".editable-imagePath").find("input[type=file]").css("display", "none");
    }
}

var validateCategoryTableRowInputsListener = ev => {
    let $targetRow, namePattern = new RegExp("^(([A-Za-z][a-z0-9]*([-'\\s\\.]))*([A-Za-z0-9][A-Za-z0-9]*))$"),
        nameText, descriptionText, $errorMessage;
    $targetRow = $(ev.target).closest("tr");
    descriptionText = $targetRow.find(".editable-description").text().trim();
    nameText = $targetRow.find(".editable-name").text().trim();
    $errorMessage = $targetRow.find(".errorCategoryMessage");

    if(nameText.length > 50 || nameText.length < 3 || !namePattern.test(nameText)){
        $targetRow.find(".changeCategoryAdminButton").hide();
        $errorMessage.css("display", "unset");
        $errorMessage.text("Error: category name must contain from 3 to 50 characters, " +
            "including letters, numbers and separators.");
    }
    else if(descriptionText.length > 1000 || descriptionText.length < 10){
        $targetRow.find(".changeCategoryAdminButton").hide();
        $errorMessage.css("display", "unset");
        $errorMessage.text("Error: category description must contain from 10 to 1000 characters!");
    }
    else{
        $targetRow.find(".changeCategoryAdminButton").show();
        $errorMessage.css("display", "none");
        $errorMessage.text("");
    }
};

var paginationCategoriesListener = ev => {
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationCategories span.current"), $pageBtn,
        $targetPageBtn;

    if($target.prop("id") == "ellipseSxCategories")
        $target = $(".pageNumBtnCategoryAdmin.visible").first().prev();
    if($target.prop("id") == "ellipseDxCategories")
        $target = $(".pageNumBtnCategoryAdmin.visible").last().next();
    if($target.prop("id") == "previousPageCategories"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.prev("span.pageNumBtnCategoryAdmin");
    }
    else if($target.prop("id") == "nextPageCategories"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPageCategories)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.next("span.pageNumBtnCategoryAdmin");
    }

    targetIdNum = parseInt($target.text());
    $targetPageBtn = $("#pageCategories"+targetIdNum);
    $currentPage.removeClass("current");
    $targetPageBtn.addClass("current");

    $(".paginationCategories .pageNumBtnCategoryAdmin.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPageCategories <= 4){
        for(let i = 1; i <= 4; i++){
            $pageBtn = $("#pageCategories"+i);
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else if(targetIdNum == maxPageCategories || targetIdNum == maxPageCategories-1){
        for(let i = 0; i <= 3; i++){
            $pageBtn = $("#pageCategories"+(maxPageCategories-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageCategories"+(targetIdNum-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageCategories"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }

    if(parseInt($(".pageNumBtnCategoryAdmin.visible").first().text()) != 1)
        $("#ellipseSxCategories").addClass("visible");
    else{
        $("#ellipseSxCategories").removeClass("visible");
    }
    if(parseInt($(".pageNumBtnCategoryAdmin.visible").last().text()) != maxPageCategories)
        $("#ellipseDxCategories").addClass("visible");
    else
        $("#ellipseDxCategories").removeClass("visible");

    getMoreCategoriesPaging((targetIdNum-1)*4,
        $(".searchBarCategoryAdmin input[type=text]").val(), false);
};

var removeCategoryListener =  ev => {
    ev.preventDefault();
    let $targetRow = $(ev.target).closest("tr"), categoryName;
    categoryName = $targetRow.find(".removeCategoryOldName").val();
    $.ajax("remove-category?categoryName=" + categoryName, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request of category " + categoryName + " removal failed."),
        success: responseObject => {
            let removedCategoryName = responseObject.removedCategoryName, type= responseObject.type,
                msg = responseObject.msg;
            if(removedCategoryName != null && removedCategoryName != undefined)
                $(document.getElementById(removedCategoryName + "CategoryRow")).remove();
            //$("#pageCategories" + maxPageCategories).click();
            //triggeriamo la ricerca per cancellare eventuali pagine vuote
            $("#searchBarContainerCategoryAdmin button[type=submit]").click();
            showPopupMessage(type, msg, 8);
        }
    });
};

$(document).ready(function () {
    //modifica categoria esistente
    $(".changeCategoryAdminButton").on("click", changeCategoryListener);

    //paginazione
    $(".paginationCategories span").on("click", paginationCategoriesListener);

    //controlli sull'input
    $(".categories-table-body-row .editable-name, .categories-table-body-row .editable-description").on("input",
        validateCategoryTableRowInputsListener);

    //ricerca
    $(".searchBarCategoryAdmin button").on("click", ev => {
        ev.preventDefault();
        let $searchInput = $(".searchBarCategoryAdmin input[type=text]");
        if($searchInput.val().trim().match(new RegExp("^[a-zA-Z0-9]*$"))){
            getMoreCategoriesPaging(0, $searchInput.val().trim(), true);
            $("#pageCategories1").click();
        }
        else
            alert("You must enter a valid string (numbers or letters)");
    });

    //async category removal
    $(".removeCategoryForm").on("submit", ev => ev.preventDefault());
    $(".removeCategoryAdminButton").on("click", removeCategoryListener);

    //async category adding
    $("#addCategoryForm").on("submit", ev => ev.preventDefault());

    $("#submitAdminButtonContainerAddCategory input[type=submit]").on("click", ev => {
        ev.preventDefault();
        let fd = new FormData(document.getElementById("addCategoryForm"));
        $.ajax("add-category", {
            method: "POST",
            dataType: "json",
            enctype : 'multipart/form-data',
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: ev => alert("Request on category adding failed."),
            success: responseObject => {
                //triggeriamo la ricerca per generare eventuali nuove pages
                $("#searchBarContainerCategoryAdmin button[type=submit]").click();
                showPopupMessage(responseObject.type, responseObject.msg, 8);
            }
        });
    });
});