// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var lessonTable=document.getElementById("lessonFieldset");

var examTable=document.getElementById("examFieldset");

// When the user clicks the button, open the modal
function openModal(objButton) {
    if(objButton.value=="lessons"){
        examTable.style.display= "none";
        lessonTable.style.display= "block";
    }
    else if(objButton.value=="exams"){
        lessonTable.style.display= "none";
        examTable.style.display= "block";
    }
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// When the user clicks on a pagination, makes an async request to get four more lessons and exams

function getMoreLessonsPaging(startingIndex=0, searchData="", isFirstSearch = false){
    $.ajax("get-more-lessons-servlet?courseId=" + courseId + "&lessonsPerRequest=4&startingIndex=" + startingIndex + "&search="+searchData, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request on lesson page " + startingIndex/4+ " failed."),
        success: responseObject => {
            let newLessons = responseObject.newLessons, $targetPage = $(".lesson-table-body");
            $targetPage.empty();
            //se la pagina è vuota, a meno che non sia la prima, cancelliamola e ritorniamo alla prima pagina
            if(newLessons.length == 0 && startingIndex != 0){
                $(".paginationLessons #pageLessons" + maxPageLessons).remove();
                maxPageLessons--;
                $("#pageLessons1").click();
            }

            //aggiungiamo le categorie alla target page
            for(let lesson of newLessons) {
                $targetPage.append(
                    "<tr class='lessons-table-body-row'>"+
                    "<td> "+ lesson.date +"</td>"+
                    "<td> "+ lesson.hour+ "</td>"+
                    "<td> "+ lesson.classroom +" </td>"+
                    "</tr>"
                );
            }
        }
    });
}
var paginationLessonsListener = ev => {
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationLessons span.current-page"), $pageBtn,
        $targetPageBtn;
    if($target.prop("id") == "ellipseSxLessons")
        $target = $(".pageNumBtnLesson.visible").first().prev();
    if($target.prop("id") == "ellipseDxLessons")
        $target = $(".pageNumBtnLesson").last().next();
    if($target.prop("id") == "previousPageLessons"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current-page");
        $target = $currentPage.prev("span.pageNumBtnLesson");
    }
    else if($target.prop("id") == "nextPageLessons"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPageLessons)
            return;
        $currentPage.removeClass("current-page");
        $target = $currentPage.next("span.pageNumBtnLesson");
    }
    targetIdNum = parseInt($target.text());
    $targetPageBtn = $("#pageLessons"+targetIdNum);
    $currentPage.removeClass("current-page");
    $targetPageBtn.addClass("current-page");
    $(".paginationLessons .pageNumBtnLesson.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPageLessons <= 4){
        for(let i = 1; i <= 4; i++){
            $pageBtn = $("#pageLessons"+i);
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else if(targetIdNum == maxPageLessons || targetIdNum == maxPageLessons-1){
        for(let i = 0; i <= 3; i++){
            $pageBtn = $("#pageLessons"+(maxPageLessons-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageLessons"+(targetIdNum-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageLessons"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    if(parseInt($(".pageNumBtnLesson.visible").first().text()) != 1)
        $("#ellipseSxLessons").addClass("visible");
    else{
        $("#ellipseSxLessons").removeClass("visible");
    }
    if(parseInt($(".pageNumBtnLesson.visible").last().text()) != maxPageLessons)
        $("#ellipseDxLessons").addClass("visible");
    else
        $("#ellipseDxLessons").removeClass("visible");
    getMoreLessonsPaging((targetIdNum-1)*4,"",false);
};




function getMoreExamsPaging(startingIndex=0, searchData="", isFirstSearch = false){
    $.ajax("get-more-exams-servlet?courseId=" + courseId + "&examsPerRequest=4&startingIndex=" + startingIndex + "&search="+searchData, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request on exam page " + startingIndex/4+ " failed."),
        success: responseObject => {
            let newExams = responseObject.newExams, $targetPage = $(".exam-table-body");
            $targetPage.empty();
            //se la pagina è vuota, a meno che non sia la prima, cancelliamola e ritorniamo alla prima pagina
            if(newExams.length == 0 && startingIndex != 0){
                $(".paginationExams #pageExams" + maxPageExams).remove();
                maxPageExams--;
                $("#pageExams1").click();
            }

            //aggiungiamo le categorie alla target page
            for(let exam of newExams) {
                $targetPage.append(
                    "<tr class='exams-table-body-row'>"+
                    "<td> "+ exam.date +"</td>"+
                    "<td> "+ exam.hour+ "</td>"+
                    "<td> "+ exam.classroom +" </td>"+
                    "</tr>"
                );
            }
        }
    });
}
var paginationExamsListener = ev => {
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationExams span.current-page"), $pageBtn,
        $targetPageBtn;
    if($target.prop("id") == "ellipseSxExams")
        $target = $(".pageNumBtnExam.visible").first().prev();
    if($target.prop("id") == "ellipseDxExams")
        $target = $(".pageNumBtnExam").last().next();
    if($target.prop("id") == "previousPageExams"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current-page");
        $target = $currentPage.prev("span.pageNumBtnExam");
    }
    else if($target.prop("id") == "nextPageExams"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPageExams)
            return;
        $currentPage.removeClass("current-page");
        $target = $currentPage.next("span.pageNumBtnExam");
    }
    targetIdNum = parseInt($target.text());
    $targetPageBtn = $("#pageExams"+targetIdNum);
    $currentPage.removeClass("current-page");
    $targetPageBtn.addClass("current-page");
    $(".paginationExams .pageNumBtnExam.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPageExams <= 4){
        for(let i = 1; i <= 4; i++){
            $pageBtn = $("#pageExams"+i);
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else if(targetIdNum == maxPageExams || targetIdNum == maxPageExams-1){
        for(let i = 0; i <= 3; i++){
            $pageBtn = $("#pageExams"+(maxPageExams-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageExams"+(targetIdNum-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageExams"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    if(parseInt($(".pageNumBtnExam.visible").first().text()) != 1)
        $("#ellipseSxExams").addClass("visible");
    else{
        $("#ellipseSxExams").removeClass("visible");
    }
    if(parseInt($(".pageNumBtnExam.visible").last().text()) != maxPageExams)
        $("#ellipseDxExams").addClass("visible");
    else
        $("#ellipseDxExams").removeClass("visible");
    getMoreExamsPaging((targetIdNum-1)*4,"",false);
};


$(document).ready(function () {
    //paginazione
    $(".paginationLessons span").on("click", paginationLessonsListener);
    $(".paginationExams span").on("click", paginationExamsListener);
});