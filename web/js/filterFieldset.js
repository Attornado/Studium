//funzione che rimpiazza la lista dei corsi con la lista dei corsi passata
function replaceCourseList($newCourseList){
    let count = 0, $coursesList = $(".courseList ul"), lastPageDiv, $paginationDiv = $(".pagination"),
        newMaxPage =  Math.max(Math.ceil($newCourseList.length/5), 1),
        $currentPage = $(".pagination .pageNumBtn .current");
    $coursesList.empty(); //svuota la lista
    //creiamo la nuova lista
    for(let courseListItem of $newCourseList){
        if(count % 5 == 0){
            //ogni 5 elementi aggiungiamo un nuovo div
            $coursesList.append("<div class='coursePage visible' id='coursePage" + Math.round(count/5 + 1) + "'>");
            //impostiamo l'utlimo div a quello appena creatp
            lastPageDiv = $coursesList.find("#coursePage" + Math.round(count/5 + 1));
        }
        //aggiungiamo l'elemento ed incrementiamo il contatore
        lastPageDiv.append(courseListItem);
        count++;
    }
    //creiamo il nuovo menu delle pagine
    if(maxPage < newMaxPage) {
        for(let i = maxPage + 1; i <= newMaxPage; i++) {
            if(i <= 5)
                $paginationDiv.find("#page"+(i-1)).after("<span class='pageNumBtn visible' id='page"+i+"'>"+i+"</span>");
            else
                $paginationDiv.find("#page"+(i-1)).after("<span class=\"pageNumBtn\" id=\"page"+i+"\">"+i+"</span>");
            //aggiungiamo il listener del controllo della paginazione
            $("#page" + i).on("click", coursesPaginationBtnClickListener);
        }
    }
    else if(maxPage > newMaxPage) {
        for(let i = newMaxPage + 1; i <= maxPage; i++) {
            $paginationDiv.find("#page" + i).remove();
        }
    }
    //aggiorniamo maxPage
    maxPage = newMaxPage;

    //impostiamo la pagina corrente ad 1
    $currentPage.removeClass("current");
    $currentPage = $("#page1");
    $currentPage.addClass("current");

    //impostiamo nuovamente i listener sui bottoni di aggiunta
    setAddToCartButtonListeners();

    //clicchiamo sul bottone corrente per triggerare il ricalcolo delle pagine visibili e dei bottoni ellissi("...")
    $currentPage.trigger("click");
}

$(document).ready(function(){
    //mostriamo/nascondiamo il box dei filtri quando clicchiamo su "Filters"
    $(".filter-dropdown, .close-button").on("click", function(){
        $(".edit-filter-modal").toggleClass("hidden");
        $("#errorMessage").text("");
    });

    //checkbox del sort mutuamente esclusivi
    $(".sortCheckbox").on("change", ev => {
        let $eventTarget = $(ev.target), flag = $eventTarget.prop("checked");
        $(".sortCheckbox").prop("checked", false);
        if(flag) //se il checkbox non era attivo quando il listener è stato chiamato allora checkiamolo
            $eventTarget.prop("checked", true);
    });

    if($allCourses != undefined)
        $(".apply-button").on("click", ev => {
            let sortAscending = $("#sortByPriceAscending").prop("checked"),
                sortDescending = $("#sortByPriceDescending").prop("checked"),
                teacherName = $("#teacherField").val(), maxPrice = $("#maxPrice").val().trim(),
                $courses = $allCourses.slice();

            if(teacherName != undefined)
                teacherName = teacherName.trim();

            //testiamo la validità dell'input
            if(!checkTeacherNameAndMaxPrice(teacherName, maxPrice))
                return;
            $("#errorMessage").text(""); //se non ci sono errori cancelliamo l'eventuale messaggio d'errore

            //valutiamo se ordinare l'array
            if(sortAscending)
                $courses = $allCoursesAscending.slice();
            else if(sortDescending)
                $courses = $allCoursesDescending.slice();

            //filtriamo secondo i criteri stabiliti
            $courses = $courses.filter(index => {
                if(teacherName != "" && //rimuoviamo tutti gli accapo e gli spazi all'inizio e alla fine
                    !$($courses[index]).find(".teacherName").text().replace(/\r?\n|\r/gm, "").trim().toLowerCase().includes(teacherName.toLowerCase())) //this si riferisce all'oggetto corrente
                    return false;
                if(maxPrice != "" && parseFloat(maxPrice.replace(",", ".")) <
                    parseFloat($($courses[index]).find(".price").text().replace("$", "")))
                    return false;
                return true;
            });

            //rimpiazziamo la lista dei corsi con quella filtrata
            replaceCourseList($courses);
        });
});