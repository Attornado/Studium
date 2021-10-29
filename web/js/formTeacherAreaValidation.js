var checkAddLessonTeacherAreaListener = ev =>{
    let $target;
    let datePattern = new RegExp("^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$");
    let hourPattern = new RegExp("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
    let classroomPattern = new RegExp("^([A-Za-z][1-9][0-9]?)|-$");

    $target = $(ev.target).find("#addLessonForm");
    let dateText = $("#lessonDateAdd").val().trim();
    let hourText = $("#lessonHourAdd").val().trim();
    let classroomText = $("#lessonClassroomAdd").val().trim();

    if(!datePattern.test(dateText)){
        $("#submitLessonButton").prop("disabled", "true");
        showPopupMessage("error", "Error: invalid date");
    }
    else if(!hourPattern.test(hourText)){
        $("#submitLessonButton").prop("disabled", "true");
        showPopupMessage("error", "Error: invalid hour");
    }
    else if(!classroomPattern.test(classroomText)){
        $("#submitLessonButton").prop("disabled", "true");
        showPopupMessage("error", "Error: invalid classroom");
    }
    else{
        $("#submitLessonButton").removeAttr("disabled");
        showPopupMessage("success", "You can submit it");
    }
}

var checkAddExamTeacherAreaListener = ev =>{
    let $target;
    let datePattern = new RegExp("^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$");
    let hourPattern = new RegExp("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
    let classroomPattern = new RegExp("^([A-Za-z][1-9][0-9]?)|-$");

    $target = $(ev.target).find("#addExamForm");
    let dateText = $("#examDateAdd").val().trim();
    let hourText = $("#examHourAdd").val().trim();
    let classroomText = $("#examClassroomAdd").val().trim();

    if(!datePattern.test(dateText)){
        $("#submitExamButton").prop("disabled", "true");
        showPopupMessage("error", "Error: invalid date");
    }
    else if(!hourPattern.test(hourText)){
        $("#submitExamButton").prop("disabled", "true");
        showPopupMessage("error", "Error: invalid hour");
    }
    else if(!classroomPattern.test(classroomText)){
        $("#submitExamButton").prop("disabled", "true");
        showPopupMessage("error", "Error: invalid classroom");
    }
    else{
        $("#submitExamButton").removeAttr("disabled");
        showPopupMessage("success", "You can submit it");
    }
}

$(document).ready(function () {
    $(".addLesson").on("input", checkAddLessonTeacherAreaListener);
    $(".addExam").on("input", checkAddExamTeacherAreaListener);
})