var maxPage = 1;
var $allCourses = undefined; //per controlli

function changeSearchSpace(checked = "courses") {
    let $resultListBox =  $(".result-list-box"), $resultsContainer = $(".resultsContainer");

    //nascondiamo/mostriamo il filter-box
    if(checked == "courses")
        $(".filter-bar").addClass("visible");
    else {
        $(".edit-filter-modal").addClass("hidden");
        $("#errorMessage").text("");
        $(".filter-bar").removeClass("visible");
    }

    //svuotiamo i risultati
    $resultListBox.empty();

    //cambiamo il titolo
    $("#pageTitle .bold").text(checked);

    //aggiungiamo e rimuoviamo le classi di controllo dello stile della lista dei risultati
    $resultsContainer.removeClass("courseList");
    $resultsContainer.removeClass("catList");
    $resultsContainer.removeClass("teacherList");

    if(checked == "categories")
        $resultsContainer.addClass("catList");
    else if(checked == "courses")
        $resultsContainer.addClass("courseList");
    else
        $resultsContainer.addClass("teacherList");

    //cambiamo i risultati
    getMoreResults(0, true);
}

function getMoreCourses(startingIndex = 0, searchString = "", maxPrice = 0,
                        orderType = "asc", searchDesc = false, isFirstSearch = false){
    if(searchString == "")
        return;

    $.ajax("get-more-courses?coursesPerRequest=5&startingIndex=" + startingIndex + "&search=" + searchString +
        "&maxPrice=" + maxPrice + "&orderType=" + orderType + "&searchDesc=" + searchDesc, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request on get more courses in search results failed."),
        success: responseObject => {
            for(let course of responseObject.newCourses) {
                let imagePath = '/studium/resources/images/courseImages/' + course.imagePath;
                $(".result-list-box").append(
                    "<div class='result-box course-result-box'>" +
                    "   <form action=\"show-course\" style=\"background-image: url("+imagePath+");\" class=\"buttonform\">\n" +
                    "       <button type=\"submit\">\n" +
                    "           <span class=\"courseName\">" + course.name + "</span>\n" +
                    "       </button>\n" +
                    "       <input type=\"hidden\" name=\"courseId\" value=\"" + course.id + "\">\n" +
                    "   </form>\n" +
                    "   <div class=\"courseInfo\">\n" +
                    "       <p class=\"courseDescription\">" + course.description + "</p>\n" +
                    "       <div class=\"addToCartAndTeacherBtnContainer\">\n" +
                    "           <span class=\"teacherName\">\n" +
                    "               <i class=\"fa fa-graduation-cap\"></i>\n" +
                    "               <a href=\"showTeacher.html?teacherUsername=" + course.teacher.username + "\">\n" +
                    "                   " + course.teacher.name + " <br>"+ course.teacher.surname + "\n" +
                    "               </a>\n" +
                    "           </span>\n" +
                    "           <span class=\"addToCartBtn\" id=\"addCourse" + course.id + "\">\n" +
                    "               <i class=\"fa fa-cart-plus\"></i>\n" +
                    "           </span>\n" +
                    "           <span class=\"price\">" + course.price+ "$</span>\n" +
                    "       </div>\n" +
                    "    </div>\n" +
                    " </div>"
                );
            }

            //click sull'immagine fa sì che si clicchi sul link
            $(".category-result-box").on("click", ev => $(ev.target).children("button[type=submit]").trigger("click"));

            //aggiunta asincrona al carrello
            setAddToCartButtonListeners();

            //se è una prima ricerca creiamo o eliminiamo coerentemente le pagine, e ritornaimo alla pagina 1
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPages;
                createOrDeletePages(newMaxPage);
                $("#page1").click();
            }
        }
    });
}

function getMoreCategories(startingIndex = 0, searchString = "", isFirstSearch = false){
    if(searchString == "")
        return;

    $.ajax("get-more-categories?categoriesPerRequest=5&startingIndex=" + startingIndex + "&search=" + searchString, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request on get more categories in search results failed."),
        success: responseObject => {
            //aggiungiamo le categorie alla target page
            for(let category of responseObject.newCategories) {
                let imagePath = '/studium/resources/images/categoryImages/' + category.imagePath; //eventualmente sostituire
                $(".result-list-box").append(
                    "<div class='result-box category-result-box'>\n" +
                    "   <form action=\"show-category-courses\" style=\"background-image: url("+imagePath+");\" class=\"buttonform\">\n" +
                    "       <button type=\"submit\">\n" +
                    "           <span>" + category.name + "</span>\n" +
                    "       </button>\n" +
                    "       <input type=\"hidden\" name=\"categoryName\" value=\"" + category.name + "\">\n" +
                    "   </form>\n" +
                    "   <div class=\"categoryInfo\">\n" +
                    "       <p>" + category.description + "</p>\n" +
                    "   </div>\n" +
                    "</div>"
                );
            }
            //click sull'immagine fa sì che si clicchi sul link
            $(".category-result-box").on("click", ev => $(ev.target).children("button[type=submit]").trigger("click"));

            //se è una prima ricerca creiamo o eliminiamo coerentemente le pagine, e ritornaimo alla pagina 1
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPages;
                createOrDeletePages(newMaxPage);
                $("#page1").click();
            }
        }
    });
}

function getMoreTeachers(startingIndex = 0, searchString = "", isFirstSearch = false){
    if(searchString == "")
        return;

    $.ajax("get-more-teachers?teachersPerRequest=5&startingIndex=" + startingIndex + "&search=" + searchString +
        "&searchFirstAndLastName=true", {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request on get more teachers in search results failed."),
        success: responseObject => {
            for(let teacher of responseObject.newTeachers) {
                let imagePath = '/studium/resources/images/teacherImage.jpg';
                $(".result-list-box").append(
                    "<div class='result-box teacher-result-box'>\n" +
                    "   <form action=\"showTeacher.html\" style=\"background-image: url("+imagePath+");\" class=\"buttonform\">\n" +
                    "       <button type=\"submit\">\n" +
                    "           <span>" + teacher.name + " " + teacher.surname + "</span>\n" +
                    "       </button>\n" +
                    "       <input type=\"hidden\" name=\"teacherUsername\" value=\"" + teacher.username + "\">\n" +
                    "   </form>\n" +
                    "   <div class=\"teacherCurriculum\">\n" +
                    "       <p>" + teacher.curriculum + "</p>\n" +
                    "   </div>\n" +
                    "</div>"
                );
            }

            //click sull'immagine fa sì che si clicchi sul link
            $(".teacher-result-box").on("click", ev => $(ev.target).children("button[type=submit]").trigger("click"));

            //se è una prima ricerca creiamo o eliminiamo coerentemente le pagine, e ritornaimo alla pagina 1
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPages;
                createOrDeletePages(newMaxPage);
                $("#page1").click();
            }
        }
    });
}

function getMoreResults(startingIndex, isFirstSearch = false){
    let maxPrice = $("#maxPrice").val();

    //svuotiamo i risultati
    $(".result-list-box").empty();

    //richiediamo in maniera asyncrona i risultati al server
    if($("#courses-search-space").prop("checked")){
        getMoreCourses(
            startingIndex, $(".searchBar input[type=text]").val(),
            (maxPrice != "") ? (maxPrice) : (0),
            $("#sortByPriceAscending").prop("checked") ? "asc" : "desc",
            $("#searchInDescription").prop("checked"), isFirstSearch
        );
    }
    else if($("#categories-search-space").prop("checked")){
        getMoreCategories(startingIndex, $(".searchBar input[type=text]").val(), isFirstSearch);
    }
    else if($("#teachers-search-space").prop("checked")){
        getMoreTeachers(startingIndex, $(".searchBar input[type=text]").val(), isFirstSearch);
    }
}

function createOrDeletePages(newMaxPage) {
    for (let i = newMaxPage + 1; i <= maxPage; i++){
        $("#page"+i).remove();
    }
    for (let i = maxPage + 1; i <= newMaxPage; i++){
        if (i == 1)
            $("#page"+(i-1)).after("<span class='current visible pageNumBtn' id='page"+i+"'> "+i+" </span>");
        else if(i <= 4)
            $("#page"+(i-1)).after("<span class='pageNumBtn visible' id='page"+i+"'> "+i+" </span>");
        else
            $("#page"+(i-1)).after("<span class='pageNumBtn' id='page"+i+"'> "+i+" </span>");

        $("#page"+i).on("click", paginationListener);
    }
    maxPage = newMaxPage;
}

function setCurrentPageTo(targetPageNum = 1){

}

var paginationListener = ev => {
    let $target = $(ev.target), targetIdNum, $currentPage = $(".pagination span.current"), $pageBtn,
        $targetPageBtn;

    if($target.prop("id") == "ellipseSx")
        $target = $(".pageNumBtn.visible").first().prev();
    if($target.prop("id") == "ellipseDx")
        $target = $(".pageNumBtn.visible").last().next();
    if($target.prop("id") == "previousPage"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.prev("span.pageNumBtn");
    }
    else if($target.prop("id") == "nextPage"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPage)
            return;
        $currentPage.removeClass("current");
        $target = $currentPage.next("span.pageNumBtn");
    }

    targetIdNum = parseInt($target.text());
    $targetPageBtn = $("#page"+targetIdNum);
    $currentPage.removeClass("current");
    $targetPageBtn.addClass("current");

    $(".pagination .pageNumBtn.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPage <= 4){
        for(let i = 1; i <= 4; i++){
            $pageBtn = $("#page"+i);
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else if(targetIdNum == maxPage || targetIdNum == maxPage-1){
        for(let i = 0; i <= 3; i++){
            $pageBtn = $("#page"+(maxPage-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#page"+(targetIdNum-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#page"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }

    if(parseInt($(".pageNumBtn.visible").first().text()) != 1)
        $("#ellipseSx").addClass("visible");
    else{
        $("#ellipseSx").removeClass("visible");
    }
    if(parseInt($(".pageNumBtn.visible").last().text()) != maxPage)
        $("#ellipseDx").addClass("visible");
    else
        $("#ellipseDx").removeClass("visible");

    //richiesdiamo i risultati al server
    getMoreResults((targetIdNum-1)*5, false);

    $('html, body').animate({scrollTop:0}, '300'); //ci spostiamo sulla parte superiore della pagina con animazione
};

$(document).ready(function () {
    let $paginationSpan = $(".pagination span");

    //gestione del search-space
    $(".search-space .filter-textbox input[type=checkbox]").on("click", ev => {
        let $target = $(ev.target), targetSearchSpace = $target.prop("id").replace("-search-space", "").toLowerCase();
        //uncheckiamo tutti gli altri
        $(".search-space .filter-textbox input[type=checkbox]:not(#" + $target.prop("id") + ")").prop("checked", false);
        //cambiamo ambito di ricerca
        changeSearchSpace(targetSearchSpace);
    });

    //clicchiamo sul bottone checkbox delle categorie
    $("#courses-search-space").click();

    //ricerca asincrona
    $(".searchBar button").on("click", ev => {
        ev.preventDefault();
        getMoreResults(0, true);
    });

    //filtraggio
    $(".filterButton.apply-button").on("click", ev => {
        if(checkTeacherNameAndMaxPrice(undefined, $("#maxPrice").val())) {
            getMoreResults(0, true);
        }
        else
            $("#errorMessage").text("");
    });

    //rimuoviamo i listener della paginazione della pagina dei corsi ed aggiungiamo quelli corretti
    $paginationSpan.off("click", coursesPaginationBtnClickListener);
    $paginationSpan.on("click", paginationListener);
});