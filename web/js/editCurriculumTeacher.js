var changeCurriculumListener = ev =>{
    ev.preventDefault();
    //let curriculum = $(ev.target).prev().find("#curriculum").val();
    let curriculum = document.getElementById("curriculum").value;
    var fd = new FormData();
    fd.append("curriculum", curriculum);
    $.ajax("changeCurriculum-servlet", {
        method: "POST",
        dataType: "json",
        mimeType: "multipart/form-data",
        data: fd,
        contentType: false,
        processData: false,
        error: ev => alert("Request failed on curriculum page failed"),
        success: responseObject =>{
                showPopupMessage(responseObject.type, responseObject.msg, 5);
        }
    });
}

$(document).ready(function () {
    $("#submitTeacherButtonContainerEditCurriculum").on("click", changeCurriculumListener);
});