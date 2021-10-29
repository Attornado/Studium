//listener di gestione della paginazione
var coursesPaginationBtnClickListener = ev => {
    let target = $(ev.target), targetIdNum, $currentPage = $(".pagination span.current"), $pageBtn, $targetPageBtn;

    $('html, body').animate({scrollTop:0}, '300'); //ci spostiamo sulla parte superiore della pagina con animazione

    //se abbiamo cliccato il bottone "avanti" o "indietro" o uno dei "..." calcoliamo la targetPage
    if(target.prop("id") == "ellipseSx")
        target = $(".pageNumBtn.visible").first().prev();
    if(target.prop("id") == "ellipseDx")
        target = $(".pageNumBtn.visible").last().next();
    if(target.prop("id") == "previousPage"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current");
        target = $currentPage.prev("span.pageNumBtn");
    }
    else if(target.prop("id") == "nextPage") {
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPage)
            return;
        $currentPage.removeClass("current");
        target = $currentPage.next("span.pageNumBtn");
    }

    //calcoliamo il target page id e impostiamo il bottone corrente
    //la stringa è del tipo "pageI" quindi consideriamo il secondo elemento dell'array, ovvero "I"
    targetIdNum = parseInt(target.text());
    $targetPageBtn = $("#page" + targetIdNum);
    $(".coursePage.visible").removeClass("visible");
    $("#coursePage" + targetIdNum).addClass("visible");
    $currentPage.removeClass("current");
    $targetPageBtn.addClass("current");

    //rendiamo visibili un range di 5 bottoni, a partire da quello corrente, e nascondiamo gli altri
    $(".pagination .pageNumBtn.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPage <= 5) {
        for(let i = 1; i <= 5; i++) {
            $pageBtn = $("#page" + i);
            if ($pageBtn.length > 0)
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

    //se ci sono pagine prima o dopo l'ultima visibile, rendiamo visible "..." in corrispondenza, altrimenti lo nascondiamo
    if(parseInt($(".pageNumBtn.visible").first().text()) != 1)
        $("#ellipseSx").addClass("visible");
    else
        $("#ellipseSx").removeClass("visible");
    if(parseInt($(".pageNumBtn.visible").last().text()) != maxPage)
        $("#ellipseDx").addClass("visible");
    else
        $("#ellipseDx").removeClass("visible");
};

//funzione per l'aggiunta dei listener per la rimozione asincrona dal carrello
function setAddToCartButtonListeners(){
    //aggiunta asincrona al carrello
    $(".addToCartAndTeacherBtnContainer .addToCartBtn").on("click", ev => {
        let courseToAddId;
        //rimuoviamo dall'id del bottone tutti i caratteri non numeri
        courseToAddId = $(ev.target).closest("span.addToCartBtn").prop("id").replace(/[^0-9]/g, "");
        //gestiamo la risposta con AJAX
        $.ajax("add-cart-async?async=true&addCart=true&courseId=" + courseToAddId, {
            method: "GET",
            error: ev => alert("Request failed."),
            success: responseText => {
                let responseObject = JSON.parse(responseText), msg, type;
                msg = responseObject.message;
                type = responseObject.type;
                showPopupMessage(type, msg, 8);
            }
        });
    });
}

$(document).ready(ev => {
    //il click sulle immagini fa sì che si clicchi sul bottone
    $(".buttonform").on("click", ev => {
        $(ev.target).children("button[type=submit]").trigger("click");
    });

    //pagination control
    $(".pagination span").on("click", coursesPaginationBtnClickListener);

    //aggiunta asincrona al carrello
    setAddToCartButtonListeners();
});

