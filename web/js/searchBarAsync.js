var resultsNumber = 0;

$(document).ready(function () {
    //ricerca asincrona
    $(".searchBar input[type=text]").on("input click", ev => {
        let searchString = $(ev.target).val();
        $(".async-results-list").empty();
        resultsNumber = 0;
        $(".async-results-container").removeClass("visible");
        if(searchString != "") {
            $.ajax("get-more-courses?coursesPerRequest=4&startingIndex=0&search=" + searchString, {
                method: "GET",
                dataType: "json",
                error: ev => alert("Search bar async search failed."),
                success: responseObject => {
                    let courseList = responseObject.newCourses, $searchResultDiv = $(".async-results-list");
                    //creiamo la lista dei risultati
                    for(let course of courseList) {
                        $searchResultDiv.append(
                            "<p class='async-result'>" +
                            "   <a class='async-results-link' href='course.html?courseId=" + course.id + "'>"
                            + course.name +
                            "   </a>" +
                            "</p>");
                    }
                    resultsNumber += courseList.length; //aggiorniamo il numero di risultati
                    //rendiamo il div visibile
                    if(courseList.length > 0)
                        $(".async-results-container").addClass("visible");

                    $('body').on("click", ev => { //quando clicco sul body,
                        $searchResultDiv = $(".async-results-container");
                        if($(ev.target).hasClass("async-results-container")) //se clicco sul div
                            return;
                        if($(ev.target).closest('.async-results-container').length > 0) //o uno dei suoi discendenti, non facciamo nulla
                            return;
                        if($searchResultDiv.hasClass("visible")) {
                            ev.preventDefault(); //preveniamo l'apertura di un link, se esso è stato cliccato
                            $(".async-results-list").empty(); //svuotiamo i risultati
                            $searchResultDiv.removeClass("visible"); //altrimenti rimuoviamo la classe visible, se ce l'ha
                            $(this).off(ev); //e rimuoviamo il listener
                        }
                    });
                }
            });
        }
    });

    //bottone per caricare più risultati
    $(".moreResultsButton").on("click", ev => {
        let searchString = $(".searchBar input[type=text]").val();
        $.ajax("get-more-courses?coursesPerRequest=4&startingIndex=" + resultsNumber + "&search=" + searchString, {
            method: "GET",
            dataType: "json",
            error: ev => alert("Request on get more results on search bar async failed."),
            success: responseObject => {
                let $searchResultDiv = $(".async-results-list"), courseList = responseObject.newCourses;
                resultsNumber += courseList.length;
                for(let course of courseList){
                    $searchResultDiv.append(
                        "<p class='async-result'>" +
                        "   <a class='async-results-link' href='course.html?courseId=" + course.id + "'>"
                                + course.name +
                        "   </a>" +
                        "</p>");
                }
                $searchResultDiv.animate({scrollTop: $searchResultDiv.prop('scrollHeight')}, "300");
            }
        });
    });
});