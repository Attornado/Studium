function getMoreCategoriesPaging(startingIndex){
    $.ajax("get-more-categories?categoriesPerRequest=5&startingIndex=" + startingIndex, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on category page " + startingIndex/5+ " failed."),
        success: responseObject => {
            let newCategories = responseObject.newCategories, $targetPage, targetPageNumber;

            //calcoliamo la pagina target
            targetPageNumber = parseInt($(".pagination .current").text())
            $targetPage = $("#categoryPage" + targetPageNumber);

            //impostiamola come "loaded", in quanto le sue categorie sono state caricate
            $targetPage.addClass("loaded");

            //aggiungiamo le categorie alla target page
            for(let category of newCategories) {
                let imagePath = '/studium/resources/images/categoryImages/' + category.imagePath; //eventualmente sostituire
                $targetPage.append(" <li>\n" +
                    "                   <form action=\"show-category-courses\" style=\"background-image: url("+imagePath+");\" class=\"buttonform\">\n" +
                    "                       <button type=\"submit\">\n" +
                    "                           <span>" + category.name + "</span>\n" +
                    "                       </button>\n" +
                    "                       <input type=\"hidden\" name=\"categoryName\" value=\"" + category.name + "\">\n" +
                    "                   </form>\n" +
                    "                   <div class=\"categoryInfo\">\n" +
                    "                       <p>" + category.description + "</p>\n" +
                    "                   </div>\n" +
                    "                 </li>");
            }

            //click sulle immagini fa sì che si clicchi sul bottone
            $("#categoryPage" + targetPageNumber + " .buttonform").on("click", ev => {
                $(ev.target).children("button[type=submit]").trigger("click");
            });
        }
    });
}

$(document).ready(ev => {
    //click sulle immagini fa sì che si clicchi sul bottone
    $(".buttonform").on("click", ev => {
        $(ev.target).children("button[type=submit]").trigger("click");
    });

    //pagination control
    $(".pagination span").on("click", ev => {
        let $target = $(ev.target), targetIdNum, $currentPage = $(".pagination span.current"), $pageBtn, $targetPageBtn,
            $targetPage;

        $('html, body').animate({scrollTop:0}, '300'); //ci spostiamo sulla parte superiore della pagina con animazione

        //se abbiamo cliccato il bottone "avanti" o "indietro" o uno dei "..." calcoliamo la targetPage
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
        else if($target.prop("id") == "nextPage") {
            let currentPageNum;
            currentPageNum = parseInt($currentPage.text());
            if(currentPageNum == maxPage)
                return;
            $currentPage.removeClass("current");
            $target = $currentPage.next("span.pageNumBtn");
        }

        //calcoliamo il target page id number e impostiamo il bottone corrente
        targetIdNum = parseInt($target.text());
        $targetPageBtn = $("#page" + targetIdNum);
        $targetPage = $("#categoryPage" + targetIdNum);
        $(".categoryPage.visible").removeClass("visible");
        $targetPage.addClass("visible");
        $currentPage.removeClass("current");
        $targetPageBtn.addClass("current");

        //carichiamo la pagina dal server, partendo dalla prima categoria della pagina target
        if(!$targetPage.hasClass("loaded"))
            getMoreCategoriesPaging((targetIdNum - 1)*5);

        //rendiamo visibili un range di 5 bottoni, a partire da quello corrente, e nascondiamo gli altri
        $(".pagination .pageNumBtn.visible").removeClass("visible");
        if(targetIdNum == 1 || targetIdNum == 2 || maxPage <= 5) {
            for(let i = 1; i <= 5; i++) {
                $pageBtn = $("#page" + i);
                if($pageBtn.length > 0)
                    $pageBtn.addClass("visible");
            }
        }
        else if(targetIdNum == maxPage || targetIdNum == maxPage - 1){
            for(let i = 0; i <= 4; i++) {
                $pageBtn = $("#page" + (maxPage - i));
                if($pageBtn.length > 0)
                    $pageBtn.addClass("visible");
            }
        }
        else {
            $targetPageBtn.addClass("visible");
            for(let i = 1; i <= 2; i++){
                $pageBtn = $("#page" + (targetIdNum - i));
                if($pageBtn.length > 0)
                    $pageBtn.addClass("visible");
                $pageBtn = $("#page" + (targetIdNum + i));
                if($pageBtn.length > 0)
                    $pageBtn.addClass("visible");
            }
        }

        //se ci sono pagine prima o dopo l'ultima visibile, rendiamo visible "..." in corrispondenza, altrimenti lo rimuoviamo
        if(parseInt($(".pageNumBtn.visible").first().text()) != 1)
            $("#ellipseSx").addClass("visible");
        else
            $("#ellipseSx").removeClass("visible");
        if(parseInt($(".pageNumBtn.visible").last().text()) != maxPage)
            $("#ellipseDx").addClass("visible");
        else
            $("#ellipseDx").removeClass("visible");
    });
});
