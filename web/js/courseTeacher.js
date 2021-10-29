function getCoursesTeacher() {
    $.ajax("get-courses-teacher?startingIndex="+courseNumber,{
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed"),
        success: responseObject => {
            let $scrollDropdownContent = $(".scroll-dropdown-content"),
                newCourses = responseObject.newCourses;
            courseNumber += newCourses.length;
            for(let course of newCourses){
                $scrollDropdownContent.append("<li id='"+course.name+"' class='dropdown-content-item'>" +
                    "                           <button id='"+ course.name +"'} class='teacher-button'>" +
                                                 course.name +
                    "                           </button>" +
                    "                          </li>"
                );
                $(".dropdown-content-item").on("click", showCourseTeacherListener);
            }
            $scrollDropdownContent.animate({scrollTop: $scrollDropdownContent.height()}, "300");
        }
    });
}

var courseId;
var maxPageStudents;
var maxPageLessons;
var maxPageExams;
var showCourseTeacherListener = ev =>{
    ev.preventDefault();
    var $target = $(ev.target);
    var fd = new FormData();
    var course = $target.attr("id");

    $("#left-box-list li.current").removeClass("current");
    $(".dropdown-content-item button.current").removeClass("current");
    $("#courses-item").addClass("current");
    $target.addClass("current");
    currentCourse = course;
    fd.append("name", course)
    $("#curriculum-div").hide();
    $(".course-content").show();
    $.ajax("showCourseTeacher", {
        method: "POST",
        dataType: "json",
        mimeType: "multipart/form-data",
        data: fd,
        contentType: false,
        processData: false,
        error: ev => alert("Request failed on course page failed"),
        success: responseObject =>{
            let $targetPage = $(".course-content");
            let students = responseObject.students;
            courseId = responseObject.courseId;

            $("#examCourseAdd").val(courseId);
            $("#lessonCourseAdd").val(courseId);
            $(".course-content").show();
            $(".studentTable-body").empty();
            $("#header-course").text(course+" Students");
            $(".paginationStudents").show();
            let $targetTable = $(".studentTable-body");
            if(responseObject.studentSize == 0){
                $("#courseTable").hide();
                $("#noStudent").show();
                $(".paginationStudents").hide();
            }
            else{

                $("#noStudent").hide();
                $("#courseTable").show();
                for(let student of students){
                    $targetTable.append("<tr id='"+student.username+"UserRow' class='students-table-body-row'>\n" +
                        "                                <td> "+ student.username +"  </td>\n" +
                        "                                <td> "+ student.mail +" </td>\n" +
                        "                                <td> "+ student.name +" </td>\n" +
                        "                                <td> "+ student.surname +" </td>\n" +
                        "                                <td> "+ student.CF +"  </td>\n" +
                        "                                <td id='"+student.username+"PassedValue'> "+ student.passed +"</td>\n"+
                        "                                <td class='form-container'>\n" +
                        "                                    <form name='setPassedForm' class='setPassedForm' method='post' action='setPassed-servlet'>\n" +
                        "                                        <input type='hidden' value='"+student.username+"' name='setPassed'>\n" +
                        "                                        <input type='submit' id='"+student.username+"Passed' value='✓' class='setPassedButton' disabled>\n" +
                        "                                    </form>\n" +
                        "                                </td>\n" +
                        "                                <td class='form-container'>\n"+
                        "                                    <form name='removeStudentTeacherForm' class='removeStudentTeacherForm' method='post' action='removeUserTeacher-servlet'>\n" +
                        "                                        <input type='hidden' value='"+student.username+"' name='removeUserTeacher'>\n" +
                        "                                        <input type='submit' value='✗' class='removeStudentTeacherAdminButton'>\n" +
                        "                                    </form>\n" +
                        "                            </tr>");
                    if(!student.passed){
                        $("#"+student.username+"Passed").removeAttr("disabled");
                    }
                    $("#"+student.username+"Passed").on("click", setPassedStudentTeacherListener);
                }
                $(".removeStudentTeacherAdminButton").on("click", removeStudentTeacherListener);
                let $targetPagination = $(".paginationStudents");

                maxPageStudents = Math.ceil(responseObject.studentSize/4);
                $targetPagination.empty();
                $targetPagination.append("<span id='previousPageStudents' class='visible'>&laquo;</span>\n" +
                    "                    <span id='ellipseSxStudents'>...</span>");
                for (i = 1; i <= Math.ceil(responseObject.studentSize/4); i++){
                    if(i == 1){
                        $targetPagination.append("<span class='current-page visible pageNumBtnStudent' id='pageStudents"+i +"'>"+i+" "+"</span>");
                    }
                    if(i != 1){
                        if(i <= 4){
                            $targetPagination.append("<span class='pageNumBtnStudent visible' id='pageStudents"+i+"'>"+i+" "+"</span>");
                        }
                        if(i > 4){
                            $targetPagination.append("<span class='pageNumBtnStudent' id='pageStudents"+i+"'>"+i+" "+"</span>");
                        }
                    }
                }
                if(Math.ceil(responseObject.studentSize/4) > 4)
                    $targetPagination.append("<span id='ellipseDxStudents' class='visible'>...</span>");
                else if(Math.ceil(responseObject.studentSize/4) <= 4)
                    $targetPagination.append("<span id='ellipseDxStudents'>...</span>");
                $targetPagination.append("<span id='nextPageStudents' class='visible'>&raquo;</span>");

                $(".paginationStudents span").on("click", paginationStudentsTeacherListener);
            }

            // LESSON
            $(".lesson-table-body").empty();
            $(".paginationLessons").show();
            $("#header-lesson").text(course+" Lessons");
            if(responseObject.lessonSize == 0){
                $("#lessonTable").hide();
                $("#noLesson").show();
                $(".paginationLessons").hide();
            }
            else{
                $("#noLesson").hide();
                $("#lessonTable").show();
                let lessons = responseObject.lessons;
                $targetTable = $(".lesson-table-body");
                for(let lesson of lessons){
                    $targetTable.append("<tr id='"+(lesson.date+lesson.hour+lesson.course).split(":").join("")+"Lesson' class='lessons-table-body-row'>\n" +
                        "                                <td class='can-be-editable editable-dateLesson'> "+ lesson.date +"  </td>\n" +
                        "                                <td class='can-be-editable editable-hourLesson'> "+ lesson.hour +" </td>\n" +
                        "                                <td class='can-be-editable editable-classroomLesson'> "+ lesson.classroom +" </td>\n" +
                        "                                <td class='form-container'>\n" +
                        "                                    <form name='changeLessonForm' class='changeLessonForm' method='post' action='changeLesson-servlet'>\n" +
                        "                                        <input type='hidden' class ='dateChangeLesson ' value='"+lesson.date+"' name='date'>\n" +
                        "                                        <input type='hidden' class ='hourChangeLesson' value='"+lesson.hour+"' name='hour'>\n" +
                        "                                        <input type='hidden' class ='classroomChangeLesson' value='"+lesson.classroom+"' name='classroom'>\n" +
                        "                                        <input type='submit' class ='ChangeLesson changeLessonButton' value='📝'>\n" +
                        "                                    </form>\n" +
                        "                                </td>\n" +
                        "                                <td class='form-container'>\n"+
                        "                                    <form name='removeLessonForm' class='removeLessonForm' method='post' action='removeLesson-servlet'>\n" +
                        "                                        <input type='hidden' class ='dateRemoveLesson' value='"+lesson.date+"' name='date'>\n" +
                        "                                        <input type='hidden' class ='hourRemoveLesson' value='"+lesson.hour+"' name='hour'>\n" +
                        "                                        <input type='hidden' class = 'courseRemoveLesson' value='"+lesson.course+"'>\n"+
                        "                                        <input type='submit' value='✗' class='removeLessonButton'>\n" +
                        "                                    </form></td>\n" +
                        "                            </tr>");
                }
                $(".removeLessonButton").on("click", removeLessonListener);
                $(".changeLessonButton").on("click", changeLessonListener);
                let $targetPagination = $(".paginationLessons");

                maxPageLessons = Math.ceil(responseObject.lessonSize/4);
                $targetPagination.empty();
                $targetPagination.append("<span id='previousPageLessons' class='visible'>&laquo;</span>\n" +
                    "                    <span id='ellipseSxLessons'>...</span>");
                for(i = 1; i <= Math.ceil(responseObject.lessonSize/4); i++){
                    if(i == 1){
                        $targetPagination.append("<span class='current-page visible pageNumBtnLesson' id='pageLessons"+i+"'>"+i+" "+"</span>");
                    }
                    if(i != 1){
                        if(i <= 4){
                            $targetPagination.append("<span class='pageNumBtnLesson visible' id='pageLessons"+i+"'>"+i+" "+"</span>");
                        }
                        if(i > 4){
                            $targetPagination.append("<span class='pageNumBtnLesson' id='pageLessons"+i+"'>"+i+" "+"</span>");
                        }
                    }
                }
                if(Math.ceil(responseObject.lessonSize/4) > 4)
                    $targetPagination.append("<span id='ellipseDxLessons' class='visible'>...</span>");
                else if(Math.ceil(responseObject.lessonSize/4) <= 4)
                    $targetPagination.append("<span id='ellipseDxStudents'>...</span>");
                $targetPagination.append("<span id='nextPageLessons' class='visible'>&raquo;</span>");

                $(".paginationLessons span").on("click", paginationLessonsTeacherListener);
            }

            // EXAM
            $(".exam-table-body").empty();
            $(".paginationExams").show();
            $("#header-exam").text(course+" Exams");
            if(responseObject.examSize == 0){
                $("#examTable").hide();
                $("#noExams").show();
                $(".paginationExams").hide();
            }
            else{
                $("#noExams").hide();
                $("#examTable").show();
                let exams = responseObject.exams;
                $targetTable = $(".exam-table-body");
                for(let exam of exams){
                    $targetTable.append("<tr id='"+(exam.date+exam.hour+exam.course).split(":").join("")+"Exam' class='exams-table-body-row'>\n" +
                        "                                <td class='can-be-editable editable-dateExam'> "+ exam.date +"  </td>\n" +
                        "                                <td class='can-be-editable editable-hourExam'> "+ exam.hour +" </td>\n" +
                        "                                <td class='can-be-editable editable-classroomExam'> "+ exam.classroom +" </td>\n" +
                        "                                <td class='form-container'>\n" +
                        "                                    <form name='changeExamForm' class='changeExamForm' method='post' action='changeExam-servlet'>\n" +
                        "                                        <input type='hidden' class ='dateChangeExam' value='"+exam.date+"' name='date'>\n" +
                        "                                        <input type='hidden' class ='hourChangeExam' value='"+exam.hour+"' name='hour'>\n" +
                        "                                        <input type='hidden' class ='classroomChangeExam' value='"+exam.classroom+"' name='classroom'>\n" +
                        "                                        <input type='submit' class ='ChangeExam changeExamButton' value='📝'>\n" +
                        "                                    </form>\n" +
                        "                                </td>\n" +
                        "                                <td class='form-container'>\n"+
                        "                                    <form name='removeExamForm' class='removeExamForm' method='post' action='removeExam-servlet'>\n" +
                        "                                        <input type='hidden' class ='dateRemoveExam' value='"+exam.date+"' name='date'>\n" +
                        "                                        <input type='hidden' class ='hourRemoveExam' value='"+exam.hour+"' name='hour'>\n" +
                        "                                        <input type='hidden' class = 'courseRemoveExam' value='"+exam.course+"'>\n"+
                        "                                        <input type='submit' value='✗' class='removeExamButton'>\n" +
                        "                                    </form></td>\n" +
                        "                            </tr>");
                }
                $(".removeExamButton").on("click", removeExamListener);
                $(".changeExamButton").on("click", changeExamListener);
                let $targetPagination = $(".paginationExams");

                maxPageExams = Math.ceil(responseObject.examSize/4);

                $targetPagination.empty();
                $targetPagination.append("<span id='previousPageExams' class='visible'>&laquo;</span>\n" +
                    "                    <span id='ellipseSxExams'>...</span>");
                for(i = 1; i <= Math.ceil(responseObject.examSize/4); i++){
                    if(i == 1){
                        $targetPagination.append("<span class='current-page visible pageNumBtnExam' id='pageExams"+i+"'>"+i+" "+"</span>");
                    }
                    if(i != 1){
                        if(i <= 4){
                            $targetPagination.append("<span class='pageNumBtnExam visible' id='pageExams"+i+"'>"+i+" "+"</span>");
                        }
                        if(i > 4){
                            $targetPagination.append("<span class='pageNumBtnExam' id='pageExams"+i+"'>"+i+" "+"</span>");
                        }
                    }
                }
                if(Math.ceil(responseObject.examSize/4) > 4)
                    $targetPagination.append("<span id='ellipseDxExams' class='visible'>...</span>");
                else if(Math.ceil(responseObject.examSize/4) <= 4)
                    $targetPagination.append("<span id='ellipseDxStudents'>...</span>");
                $targetPagination.append("<span id='nextPageExams' class='visible'>&raquo;</span>");

                $(".paginationExams span").on("click", paginationExamsTeacherListener);
            }
        }
    });
}

function getMoreStudentsTeacherPaging(startingIndex, searchData="", isFirstSearch=false) {
    $.ajax("get-more-students-teacher?studentsPerRequest=4&startingIndex="+startingIndex+"&CourseId="+courseId+"&search="+searchData, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on student page "+startingIndex/4 + " failed."),
        success: responseObject =>{
            let newStudents = responseObject.newStudents, $targetPage = $(".studentTable-body");
            $targetPage.empty();
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPage;
                for(let i = newMaxPage+1; i <= maxPageStudents; i++){
                    $("#pageStudents"+i).remove();
                    for (let i = maxPageStudents+1; i <= newMaxPage; i++){
                        if (i == 1)
                            $("#pageStudents"+(i-1)).after("<span class='current-page visible pageNumBtnStudent' id='pageStudents"+i+"'> "+i+" </span>");
                        else if(i <= 4)
                            $("#pageStudents"+(i-1)).after("<span class='pageNumBtnStudent visible' id='pageStudents"+i+"'> "+i+" </span>");
                        else
                            $("#pageStudents"+(i-1)).after("<span class='pageNumBtnStudent' id='pageStudents"+i+"'> "+i+" </span>");
                        $("#pageStudents"+i).on("click", paginationStudentsTeacherListener);
                    }
                    maxPageStudents = newMaxPage;
                }
                $("#pageStudents1").click();
            }
            if(newStudents.length == 0 && startingIndex != 0){
                $(".paginationStudents #pageStudents"+maxPageStudents).remove();
                maxPageStudents--;
                $("#pageStudents1").click();
            }
            for(let student of newStudents){
                $targetPage.append("<tr id='"+student.username+"UserRow' class='students-table-body-row'>\n" +
                    "                                <td> "+ student.username +"  </td>\n" +
                    "                                <td> "+ student.mail +" </td>\n" +
                    "                                <td> "+ student.name +" </td>\n" +
                    "                                <td> "+ student.surname +" </td>\n" +
                    "                                <td> "+ student.CF +"  </td>\n" +
                    "                                <td id='"+student.username+"PassedValue'> "+ student.passed +"</td>\n"+
                    "                                <td class='form-container'>\n" +
                    "                                    <form name='setPassedForm' class='setPassedForm' method='post' action='setPassed-servlet'>\n" +
                    "                                        <input type='hidden' value='"+student.username+"' name='setPassed'>\n" +
                    "                                        <input type='submit' id='"+student.username+"Passed' value='✓' class='setPassedButton' disabled>\n" +
                    "                                    </form>\n" +
                    "                                </td>\n" +
                    "                                <td class='form-container'>\n"+
                    "                                    <form name='removeStudentTeacherForm' class='removeStudentTeacherForm' method='post' action='removeUserTeacher-servlet'>\n" +
                    "                                        <input type='hidden' value='"+student.username+"' name='removeUserTeacher'>\n" +
                    "                                        <input type='submit' value='✗' class='removeStudentTeacherAdminButton'>\n" +
                    "                                    </form>\n" +
                    "                            </tr>"
                )
                if(!student.passed){
                    $("#"+student.username+"Passed").removeAttr("disabled");
                }
                $("#"+student.username+"Passed").on("click", setPassedStudentTeacherListener);
            }
            $(".removeStudentTeacherAdminButton").on("click", removeStudentTeacherListener);
        }
    });
}

function getMoreLessonsTeacherPaging(startingIndex, searchData="", isFirstSearch=false) {
    $.ajax("get-more-lessons-teacher?lessonsPerRequest=4&startingIndex="+startingIndex+"&CourseId="+courseId+"&search="+searchData, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on lesson page "+startingIndex/4 + " failed."),
        success: responseObject =>{
            let newLessons = responseObject.newLessons, $targetPage = $(".lesson-table-body");
            $targetPage.empty();
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPage;
                for(let i = newMaxPage+1; i <= maxPageLessons; i++) {
                    $("#pageLessons" + i).remove();
                }
                for(let i = maxPageLessons+1; i <= newMaxPage; i++){
                    if(i == 1)
                        $("#pageLessons"+(i-1)).after("<span class='current-page visible pageNumBtnLesson' id='pageLessons"+i+"'>"+i+"</span>");
                    else if(i <= 4)
                        $("#pageLessons"+(i-1)).after("<span class='pageNumBtnLesson visible' id='pageLessons"+i+"'> "+i+" </span>");
                    else
                        $("#pageLessons"+(i-1)).after("<span class='pageNumBtnLesson' id='pageLessons"+i+"'> "+i+" </span>");
                    $("#pageLessons"+i).on("click", paginationLessonsTeacherListener);
                }
                maxPageLessons = newMaxPage;
                $("#pageLessons1").click();
            }
            if(newLessons.length == 0 && startingIndex != 0){
                $(".paginationLessons #pageLessons"+maxPageLessons).remove();
                maxPageLessons--;
                $("#pageLessons1").click();
            }
            for(let lesson of newLessons){
                $targetPage.append("<tr id='"+(lesson.date+lesson.hour+lesson.course).split(":").join("")+"Lesson' class='lessons-table-body-row'>\n" +
                    "                                <td class='can-be-editable editable-dateLesson'> "+ lesson.date +"  </td>\n" +
                    "                                <td class='can-be-editable editable-hourLesson'> "+ lesson.hour +" </td>\n" +
                    "                                <td class='can-be-editable editable-classroomLesson'> "+ lesson.classroom +" </td>\n" +
                    "                                <td class='form-container'>\n" +
                    "                                    <form name='changeLessonForm' class='changeLessonForm' method='post' action='changeLesson-servlet'>\n" +
                    "                                        <input type='hidden' class ='dateChangeLesson' value='"+lesson.date+"' name='date'>\n" +
                    "                                        <input type='hidden' class ='hourChangeLesson' value='"+lesson.hour+"' name='hour'>\n" +
                    "                                        <input type='hidden' class ='classroomChangeLesson' value='"+lesson.classroom+"' name='classroom'>\n" +
                    "                                        <input type='submit' class ='ChangeLesson changeLessonButton' value='📝'>\n" +
                    "                                    </form>\n" +
                    "                                </td>\n" +
                    "                                <td class='form-container'>\n"+
                    "                                    <form name='removeLessonForm' class='removeLessonForm' method='post' action='removeLesson-servlet'>\n" +
                    "                                        <input type='hidden' class ='dateRemoveLesson' value='"+lesson.date+"' name='date'>\n" +
                    "                                        <input type='hidden' class ='hourRemoveLesson' value='"+lesson.hour+"' name='hour'>\n" +
                    "                                        <input type='hidden' class = 'courseRemoveLesson' value='"+lesson.course+"'>\n"+
                    "                                        <input type='submit' value='✗' class='removeLessonButton'>\n" +
                    "                                    </form></td>\n" +
                    "                            </tr>"
                )
            }
            $(".removeLessonButton").on("click", removeLessonListener);
            $(".changeLessonButton").on("click", changeLessonListener);
        }
    });
}

function getMoreExamsTeacherPaging(startingIndex, searchData = "", isFirstSearch = false){
    $.ajax("get-more-exams-teacher?examsPerRequest=4&startingIndex="+startingIndex+"&CourseId="+courseId+"&search="+searchData, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on exam page " + startingIndex/4 + " failed."),
        success: responseObject =>{
            let newExams = responseObject.newExams, $targetPage = $(".exam-table-body");
            $targetPage.empty();
            if(isFirstSearch){
                let newMaxPage = responseObject.newMaxPage;
                for(let i = newMaxPage+1; i <= maxPageExams; i++) {
                    $("#pageExams" + i).remove();
                }
                for(let i = maxPageExams+1; i <= newMaxPage; i++){
                    if(i == 1)
                        $("#pageExams"+(i-1)).after("<span class='current-page visible pageNumBtnExam' id='pageExams"+i+"'>"+i+"</span>");
                    else if(i <= 4)
                        $("#pageExams"+(i-1)).after("<span class='pageNumBtnExam visible' id='pageExams"+i+"'> "+i+" </span>");
                    else
                        $("#pageExams"+(i-1)).after("<span class='pageNumBtnExam' id='pageExams"+i+"'> "+i+" </span>");
                    $("#pageExams"+i).on("click", paginationExamsTeacherListener);
                }
                maxPageExams = newMaxPage;
                $("#pageExams1").click();
            }
            if(newExams.length == 0 && startingIndex != 0){
                $(".paginationExams #pageExams"+maxPageExams).remove();
                maxPageExams--;
                $("#pageExams1").click();
            }
            for(let exam of newExams){
                $targetPage.append("<tr id='"+(exam.date+exam.hour+exam.course).split(":").join("")+"Exam' class='exams-table-body-row'>\n" +
                    "                                <td class='can-be-editable editable-dateExam'> "+ exam.date +"  </td>\n" +
                    "                                <td class='can-be-editable editable-hourExam'> "+ exam.hour +" </td>\n" +
                    "                                <td class='can-be-editable editable-classroomExam'> "+ exam.classroom +" </td>\n" +
                    "                                <td class='form-container'>\n" +
                    "                                    <form name='changeExamForm' class='changeExamForm' method='post' action='changeExam-servlet'>\n" +
                    "                                        <input type='hidden' class ='dateChangeExam' value='"+exam.date+"' name='date'>\n" +
                    "                                        <input type='hidden' class ='hourChangeExam' value='"+exam.hour+"' name='hour'>\n" +
                    "                                        <input type='hidden' class ='classroomChangeExam' value='"+exam.classroom+"' name='classroom'>\n" +
                    "                                        <input type='submit' class='ChangeExam changeExamButton' value='📝'>\n" +
                    "                                    </form>\n" +
                    "                                </td>\n" +
                    "                                <td class='form-container'>\n"+
                    "                                    <form name='removeExamForm' class='removeExamForm' method='post' action='removeExam-servlet'>\n" +
                    "                                        <input type='hidden' class ='dateRemoveExam' value='"+exam.date+"' name='date'>\n" +
                    "                                        <input type='hidden' class ='hourRemoveExam' value='"+exam.hour+"' name='hour'>\n" +
                    "                                        <input type='hidden' class = 'courseRemoveExam' value='"+exam.course+"'>\n"+
                    "                                        <input type='submit' value='✗' class='removeExamButton'>\n" +
                    "                                    </form></td>\n" +
                    "                            </tr>"
                )
            }
            $(".removeExamButton").on("click", removeExamListener);
            $(".changeExamButton").on("click", changeExamListener);
        }
    })
}

var paginationStudentsTeacherListener = ev =>{
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationStudents span.current-page"), $pageBtn, $targetPageBtn,
        $targetPage;

    if($target.prop("id") == "ellipseSxStudents")
        $target = $(".pageNumBtnStudent.visible").first().prev();
    if($target.prop("id") == "ellipseDxStudents")
        $target = $(".pageNumBtnStudent.visible").last().next();
    if($target.prop("id") == "previousPageStudents"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == 1)
            return;
        $currentPage.removeClass("current-page");
        $target = $currentPage.prev("span.pageNumBtnStudent");
    }
    else if($target.prop("id") == "nextPageStudents"){
        let currentPageNum;
        currentPageNum = parseInt($currentPage.text());
        if(currentPageNum == maxPageStudents)
            return;
        $currentPage.removeClass("current-page");
        $target = $currentPage.next("span.pageNumBtnStudent");
    }

    targetIdNum = parseInt($target.text());
    $targetPageBtn = $("#pageStudents"+targetIdNum);
    $currentPage.removeClass("current-page");
    $targetPageBtn.addClass("current-page");

    $(".paginationStudents .pageNumBtnStudent.visible").removeClass("visible");
    if(targetIdNum == 1 || targetIdNum == 2 || maxPageStudents <= 4){
        for(let i = 1; i <= 4; i++){
            $pageBtn = $("#pageStudents"+i);
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else if(targetIdNum == maxPageStudents || targetIdNum == maxPageStudents-1){
        for(let i = 0; i <= 3; i++){
            $pageBtn = $("#pageStudents"+(maxPageStudents-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageStudents"+(targetIdNum-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageStudents"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }

    if(parseInt($(".pageNumBtnStudent.visible").first().text()) != 1)
        $("#ellipseSxStudents").addClass("visible");
    else{
        $("#ellipseSxStudents").removeClass("visible");
    }
    if(parseInt($(".pageNumBtnStudent.visible").last().text()) != maxPageStudents)
        $("#ellipseDxStudents").addClass("visible");
    else
        $("#ellipseDxStudents").removeClass("visible");

    getMoreStudentsTeacherPaging((targetIdNum-1)*4);
};

var paginationLessonsTeacherListener = ev =>{
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationLessons span.current-page"), $pageBtn, $targetPageBtn,
        $targetPage;

    if($target.prop("id") == "ellipseSxLessons")
        $target = $(".pageNumBtnLesson.visible").first().prev();
    if($target.prop("id") == "ellipseDxLessons")
        $target = $(".pageNumBtnLesson.visible").last().next();
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
        for(let i = 1; i <= 3; i++){
            $pageBtn  = $("#pageLessons"+(maxPageLessons-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageLessons"+(targetIdNum-i));
            if($pageBtn > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageLessons"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }

    if(parseInt($(".pageNumBtnLesson.visible").first().text()) != 1)
        $("#ellipseSxLessons").addClass("visible");
    else
        $("ellipseSxLessons").removeClass("visible");
    if(parseInt($(".pageNumBtnLesson.visible").last().text()) != maxPageLessons)
        $("#ellipseDxLessons").addClass("visible");
    else
        $("#ellipseDxLessons").removeClass("visible");

    getMoreLessonsTeacherPaging((targetIdNum-1)*4);
};

var paginationExamsTeacherListener = ev =>{
    let $target = $(ev.target), targetIdNum, $currentPage = $(".paginationExams span.current-page"), $pageBtn, $targetPageBtn,
        $targetPage;

    if($target.prop("id") == "ellipseSExams")
        $target = $(".pageNumBtnExam.visible").first().prev();
    if($target.prop("id") == "ellipseDxExams")
        $target = $(".pageNumBtnExam.visible").last().next();
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
        for(let i = 1; i <= 3; i++){
            $pageBtn  = $("#pageExams"+(maxPageExams-i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }
    else{
        $targetPageBtn.addClass("visible");
        for(let i = 1; i <= 2; i++){
            $pageBtn = $("#pageExams"+(targetIdNum-i));
            if($pageBtn > 0)
                $pageBtn.addClass("visible");
            $pageBtn = $("#pageExams"+(targetIdNum+i));
            if($pageBtn.length > 0)
                $pageBtn.addClass("visible");
        }
    }

    if(parseInt($(".pageNumBtnExam.visible").first().text()) != 1)
        $("#ellipseSxExams").addClass("visible");
    else
        $("ellipseSxExams").removeClass("visible");
    if(parseInt($(".pageNumBtnExam.visible").last().text()) != maxPageExams)
        $("#ellipseDxExams").addClass("visible");
    else
        $("#ellipseDxExams").removeClass("visible");

    getMoreExamsTeacherPaging((targetIdNum-1)*4);
};

var removeLessonListener = ev =>{
    ev.preventDefault();
    let lessonDate = $(ev.target).siblings(".dateRemoveLesson").val();
    let lessonHour = $(ev.target).siblings(".hourRemoveLesson").val();
    let lessonCourse = $(ev.target).siblings(".courseRemoveLesson").val();
    $.ajax("removeLesson-servlet?lessonDate="+lessonDate+"&lessonHour="+lessonHour+"&lessonCourse="+lessonCourse, {
       method: "GET",
       dataType: "json",
       error: ev => alert("Request failed on remove"),
       success: responseObject =>{
           let targetRow = ("#"+responseObject.lessonDate+responseObject.lessonHour+responseObject.lessonCourse+"Lesson").split(":").join("");
           if(responseObject.removed){
               $(targetRow.trim()).remove();
               $("#searchBarContainerLessonsTeacher button[type=submit]").click();
           }

           if(responseObject.lessonSize == 0){
               $("#lessonTable").hide();
               $("#noLesson").show();
           }
           showPopupMessage(responseObject.type, responseObject.msg, 5);
       }
    });
}

var removeExamListener = ev =>{
    ev.preventDefault();
    let examDate = $(ev.target).siblings(".dateRemoveExam").val();
    let examHour = $(ev.target).siblings(".hourRemoveExam").val();
    let examCourse = $(ev.target).siblings(".courseRemoveExam").val();
    $.ajax("removeExam-servlet?examDate="+examDate+"&examHour="+examHour+"&examCourse="+examCourse, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on remove"),
        success: responseObject =>{
            let targetRow = ("#"+responseObject.examDate+responseObject.examHour+responseObject.examCourse+"Exam").split(":").join("");
            if(responseObject.removed){
                $(targetRow.trim()).remove();
                $("#searchBarContainerExamsTeacher button[type=submit]").click();
            }

            if(responseObject.examSize == 0){
                $("#examTable").hide();
                $("#noExams").show();
            }

            showPopupMessage(responseObject.type, responseObject.msg, 5);
        }
    });
}

var changeLessonListener = ev =>{
    ev.preventDefault();
    var $target = $(ev.target);
    var $editableContent = $target.closest(".lessons-table-body-row").find(".can-be-editable");
    var $updateContent = $target.closest(".lessons-table-body-row").find(".form-container");
    var fd = new FormData();
    var oldDateLesson = $updateContent.find(".dateChangeLesson").val();
    var oldHourLesson = $updateContent.find(".hourChangeLesson").val();
    var oldClassroomLesson = $updateContent.find(".classroomChangeLesson").val();

    if($target.val() == "📝"){
        $editableContent.prop("contenteditable", true);
        $target.val("Submit");
        $(".lessons-table-body-row .editable-dateLesson, .editable-hourLesson, .editable-classroomLesson").on("input",
            validateLessonTableRowInputsListener);

    }
    else{
        $editableContent.removeAttr("contenteditable");
        $target.val("📝");
        fd.append("editable-dateLesson", $editableContent.filter(".editable-dateLesson").text());
        fd.append("editable-hourLesson", $editableContent.filter(".editable-hourLesson").text());
        fd.append("editable-classroomLesson", $editableContent.filter(".editable-classroomLesson").text());
        fd.append("oldDateLesson", oldDateLesson);
        fd.append("oldHourLesson", oldHourLesson);
        fd.append("oldClassroomLesson", oldClassroomLesson);
        fd.append("courseId", courseId);

        $.ajax("changeLesson", {
            method: "POST",
            dataType: "json",
            enctype: "multipart/form-data",
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: ev => alert("Request failed on Lesson page failed."),
            success: responseObject =>{
                let msg, type, updatedLesson, oldDate, oldHour, oldClassroom, $editedRow, courseValue;

                updatedLesson = responseObject.updatedLesson;
                oldDate = responseObject.oldDate;
                oldHour = responseObject.oldHour;
                oldClassroom = responseObject.oldClassroom;
                courseValue = responseObject.courseValue;
                $editedRow = $(document.getElementById((oldDate+oldHour+courseValue).split(":").join("")+"Lesson"));
                msg = responseObject.message;
                type = responseObject.type;

                $editedRow.find(".dateChangeLesson").val(updatedLesson.date);
                $editedRow.find(".hourChangeLesson").val(updatedLesson.hour);
                $editedRow.find(".classroomChangeLesson").val(updatedLesson.classroom);

                $editedRow.find(".dateRemoveLesson").val(updatedLesson.date);
                $editedRow.find(".hourRemoveLesson").val(updatedLesson.hour);
                $editedRow.find(".courseRemoveLesson").val(updatedLesson.courseId);

                showPopupMessage(type, msg, 5);
            }
        });
    }
}

var changeExamListener = ev =>{
    ev.preventDefault();
    var $target = $(ev.target);
    var $editableContent = $target.closest(".exams-table-body-row").find(".can-be-editable");
    var $updateContent = $target.closest(".exams-table-body-row").find(".form-container");
    var fd = new FormData();
    var oldDateExam = $updateContent.find(".dateChangeExam").val();
    var oldHourExam = $updateContent.find(".hourChangeExam").val();
    var oldClassroomExam = $updateContent.find(".classroomChangeExam").val();

    if($target.val() == "📝"){
        $editableContent.prop("contenteditable", true);
        $target.val("Submit");
        $(".exams-table-body-row .editable-dateExam, .editable-hourExam, .editable-classroomExam").on("input",
            validateExamTableRowInputsListener);

    }
    else{
        $editableContent.removeAttr("contenteditable");
        $target.val("📝");
        fd.append("editable-dateExam", $editableContent.filter(".editable-dateExam").text());
        fd.append("editable-hourExam", $editableContent.filter(".editable-hourExam").text());
        fd.append("editable-classroomExam", $editableContent.filter(".editable-classroomExam").text());
        fd.append("oldDateExam", oldDateExam);
        fd.append("oldHourExam", oldHourExam);
        fd.append("oldClassroomExam", oldClassroomExam);
        fd.append("courseId", courseId);

        $.ajax("changeExam", {
            method: "POST",
            dataType: "json",
            enctype: "multipart/form-data",
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: ev => alert("Request failed on Exam page failed."),
            success: responseObject =>{
                let msg, type, updatedExam, oldDate, oldHour, oldClassroom, $editedRow, courseValue;

                updatedExam = responseObject.updatedExam;
                oldDate = responseObject.oldDate;
                oldHour = responseObject.oldHour;
                oldClassroom = responseObject.oldClassroom;
                courseValue = responseObject.courseValue;
                $editedRow = $(document.getElementById((oldDate+oldHour+courseValue).split(":").join("")+"Exam"));
                msg = responseObject.message;
                type = responseObject.type;

                $editedRow.find(".dateChangeExam").val(updatedExam.date);
                $editedRow.find(".hourChangeExam").val(updatedExam.hour);
                $editedRow.find(".classroomChangeExam").val(updatedExam.classroom);

                $editedRow.find(".dateRemoveExam").val(updatedExam.date);
                $editedRow.find(".hourRemoveExam").val(updatedExam.hour);
                $editedRow.find(".courseRemoveExam").val(updatedExam.courseId);

                showPopupMessage(type, msg, 5);
            }
        });
    }
}

var validateLessonTableRowInputsListener = ev =>{
    let $targetRow;
    let datePattern = new RegExp("^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$");
    let hourPattern = new RegExp("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$");
    let classroomPattern = new RegExp("^([A-Za-z][1-9][0-9]?)|-$");

    $targetRow = $(ev.target).closest("tr");
    let dateText = $targetRow.find(".editable-dateLesson").text().trim();
    let hourText = $targetRow.find(".editable-hourLesson").text().trim();
    let classroomText = $targetRow.find(".editable-classroomLesson").text().trim();

    if(!datePattern.test(dateText)){
        $targetRow.find(".changeLessonButton").hide();
        showPopupMessage("error", " invalid date");
    }
    else if(!hourPattern.test(hourText)){
        $targetRow.find(".changeLessonButton").hide();
        showPopupMessage("error", " invalid hour");
    }
    else if(!classroomPattern.test(classroomText)){
        $targetRow.find(".changeLessonButton").hide();
        showPopupMessage("error", " invalid classroom");
    }
    else{
        $targetRow.find(".changeLessonButton").show();
        showPopupMessage("success", "You can submit it");
    }
}

var validateExamTableRowInputsListener = ev =>{
    let $targetRow;
    let datePattern = new RegExp("^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$");
    let hourPattern = new RegExp("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$");
    let classroomPattern = new RegExp("^([A-Za-z][1-9][0-9]?)|-$");

    $targetRow = $(ev.target).closest("tr");
    let dateText = $targetRow.find(".editable-dateExam").text().trim();
    let hourText = $targetRow.find(".editable-hourExam").text().trim();
    let classroomText = $targetRow.find(".editable-classroomExam").text().trim();

    if(!datePattern.test(dateText)){
        $targetRow.find(".changeExamButton").hide();
        showPopupMessage("error", " invalid date");
    }
    else if(!hourPattern.test(hourText)){
        $targetRow.find(".changeExamButton").hide();
        showPopupMessage("error", " invalid hour");
    }
    else if(!classroomPattern.test(classroomText)){
        $targetRow.find(".changeExamButton").hide();
        showPopupMessage("error", " invalid classroom");
    }
    else{
        $targetRow.find(".changeExamButton").show();
        showPopupMessage("success", "You can submit it");
    }
}

var setPassedStudentTeacherListener = ev =>{
    ev.preventDefault();
    let studentName = $(ev.target).closest("tr").prop("id").replace("UserRow", "").trim();
    $.ajax("setPassedTeacher-servlet?studentName="+studentName+"&courseId="+courseId, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on set passed"),
        success: responseObject =>{
            if(responseObject.setPassed){
                $("#"+studentName+"PassedValue").text("true");
                $("#"+studentName+"Passed").prop("disabled", true);
            }

            showPopupMessage(responseObject.type, responseObject.msg, 5);
        }
    });
}

var removeStudentTeacherListener = ev =>{
    ev.preventDefault();
    let studentName = $(ev.target).closest("tr").prop("id").replace("UserRow", "").trim();
    $.ajax("removeUserTeacher-servlet?studentName="+studentName+"&courseId="+courseId, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed on remove"),
        success: responseObject =>{
            if(responseObject.removed){
                $("#"+responseObject.studentName+"UserRow").remove();
                $("#searchBarContainerStudentsTeacher button[type=submit]").click();
            }

            showPopupMessage(responseObject.type, responseObject.msg, 5);
        }
    });
}

$(document).ready(function () {
    $(".moreCoursesButton").on("click", ev => getCoursesTeacher());
    $(".teacher-button").on("click", showCourseTeacherListener);
    $(".searchBarStudentsTeacherPage button").on("click", ev =>{
       ev.preventDefault();
       if($(".searchBarStudentsTeacherPage input[type=hidden]").val().trim() == ""){
           getMoreStudentsTeacherPaging(0, "", true);
       }
    });
    $(".searchBarLessonsTeacherPage button").on("click", ev=>{
       ev.preventDefault();
       if($(".searchBarLessonsTeacherPage input[type=hidden]").val().trim() == ""){
           getMoreLessonsTeacherPaging(0, "", true);
       }
    });
    $(".searchBarExamsTeacherPage button").on("click", ev=>{
       ev.preventDefault();
       if($(".searchBarExamsTeacherPage input[type=hidden]").val().trim() == ""){
           getMoreExamsTeacherPaging(0, "", true);
       }
    });
    $("#curriculum-item").on("click", ev =>{
        ev.preventDefault();
        $("#curriculum-div").show();
        $(".course-content").hide();
        $("#courses-item").removeClass("current");
        $("#curriculum-item").addClass("current");
    });
    $("#submitTeacherButtonAddLesson input[type=submit]").on("click", ev=>{
        ev.preventDefault();
        let fd = new FormData(document.getElementById("addLessonForm"));
        $.ajax("addLesson-servlet", {
            method: "POST",
            dataType: "json",
            enctype: "multipart/form-data",
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: er => alert("Request on lesson adding failed"),
            success: responseObject =>{
                if(responseObject.added){
                    $("#searchBarContainerLessonsTeacher button[type=submit]").click();
                    $(".dropdown-content .teacher-button.current").click();
                }
                showPopupMessage(responseObject.type, responseObject.msg, 5);
            }
        });
    });

    $("#submitTeacherButtonAddExam input[type=submit]").on("click", ev=>{
        ev.preventDefault();
        let fd = new FormData(document.getElementById("addExamForm"));
        $.ajax("addExam-servlet", {
            method: "POST",
            dataType: "json",
            enctype: "multipart/form-data",
            data: fd,
            contentType: false,
            processData: false,
            cache: false,
            error: er => alert("Request on exam adding failed"),
            success: responseObject =>{
                if(responseObject.added){
                    $("#searchBarContainerExamsTeacher button[type=submit]").click();
                    $(".dropdown-content .teacher-button.current").click();
                }
                showPopupMessage(responseObject.type, responseObject.msg, 5);
            }
        });
    });
})

