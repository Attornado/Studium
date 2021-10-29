<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=windows-1256'>
        <title>Teacher Page</title>
        <meta name='viewport' content='initial-scale=1, width=device-width'>
        <link rel='stylesheet' href='${pageContext.request.contextPath}/css/teacherArea.css' type='text/css'>
    </head>
    <body class="teacher-body">
        <%@include file='header.jsp'%>
        <br>
        <div id="left" style="top: auto">
            <div id="mobileTeacherButtonContainer">
                <button id="mobileTeacherButton">
                    <i class="fa fa-arrow-right" id="TeacherIcon"></i>
                </button>
            </div>
            <div id="teacherPage" class="left-box">
                <h1 class="teacher-header">Teacher Area</h1>
                <ul id="left-box-list">
                    <c:if test="${curriculum != null}">
                        <li id="curriculum-item" class="left-box-item current">
                            <div id="curriculum-div-item">
                                Manage curriculum
                            </div>
                        </li>
                    </c:if>
                    <li id="courses-item" class="left-box-item">
                        <div class="dropdown" id="coursesDropdown">
                            <span class="dropdown" id="courses"><i class="fa fa-book dropdown"></i>Courses</span>
                            <ul class="dropdown-content">
                                <div class="scroll-dropdown-content">
                                    <c:if test="${loggedTeachings.size() == 0}">
                                        <li> You don't have courses</li>
                                    </c:if>
                                    <c:if test="${loggedTeachings.size() != 0}">
                                        <c:set var="indexTeacher" value="1"/>
                                        <c:forEach items="${loggedTeachings}" var="course" >
                                            <li class="dropdown-content-item">
                                                <button id="${course.name}" class="teacher-button">
                                                        ${course.name}
                                                </button>
                                            </li>
                                            <c:set var="indexTeacher" value="${indexTeacher+1}"/>
                                        </c:forEach>
                                    </c:if>
                                </div>
                                <span class="moreCoursesButton"><i class="fa fa-angle-down"></i></span>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <c:if test="${curriculum != null}">
            <div id="curriculum-div">
                <div class="teacher-fieldset">
                    <form id="editCurriculumForm" name="editCurriculumForm" action="editCurriculum-servlet" method="post">
                        <div class="teacher-textbox-textarea">
                            <label id="curriculum-label">Curriculum</label>
                            <textarea id="curriculum" name="curriculum">${curriculum}</textarea><br>
                        </div>
                        <div id="submitTeacherButtonContainerEditCurriculum">
                            <input type="submit" class="btnTeacher submitBtn">
                        </div>
                    </form>
                </div>
            </div>
        </c:if>
        <div class="course-content" style="display: none">
            <div id='courseFieldset' class="teacher-fieldset">
                <div class="searchBarStudentsTeacherPage" id="searchBarContainerStudentsTeacher" style="display: none">
                    <form action="search-students-teacher">
                        <input type="hidden" name="search" value="">
                        <button type="submit"></button>
                    </form>
                </div>
                <div class="table-div">
                    <table border='1' id='courseTable' class='content-table'>
                        <h1 id= "header-course" class='course'></h1>
                        <thead>
                            <tr class='table-header'>
                                <th>Username</th>
                                <th>Mail</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>CF</th>
                                <th>Passed</th>
                                <th>Set Passed</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody class='studentTable-body'>
                        </tbody>
                    </table>
                </div>
                <h1 id="noStudent" style="display:none;">Nobody bought this course</h1>
                <div class='paginationStudents'>
                </div>
            </div>

            <div id='lessonFieldset' class="teacher-fieldset">
                <h1 id='header-lesson' class='lesson'></h1>
                <h3 class="add-teacherArea">Add Lesson</h3>
                <div class="searchBarLessonsTeacherPage" id="searchBarContainerLessonsTeacher" style="display: none">
                    <form action="search-lessons-teacher">
                        <input type="hidden" name="search" value="">
                        <button type="submit"></button>
                    </form>
                </div>
                <form id="addLessonForm" name="addLessonForm" action="addLesson-servlet" method="post">
                    <div id="addLessonContainer">
                        <div class="teacher-textbox" id="dateLessonPadding">
                            <input type="date" class="addLesson" id="lessonDateAdd" name="lessonDateAdd" placeholder="Date"><br>
                        </div>
                        <div class="teacher-textbox" id="hourLessonPadding">
                            <input type="time" class="addLesson" id="lessonHourAdd" name="lessonHourAdd" placeholder="Hour"><br>
                        </div>
                        <input type="hidden" id="lessonCourseAdd" name="lessonCourseAdd" value="">
                        <div class="teacher-textbox" id="classroomLessonPadding">
                            <input type="text" class="addLesson" id="lessonClassroomAdd" name="lessonClassroomAdd" placeholder="Classroom">
                        </div>
                        <div id="submitTeacherButtonAddLesson" style="margin-top: 3%">
                            <input id="submitLessonButton" class="btnTeacher submitBtn" type="submit" disabled>
                        </div>
                    </div>
                </form>
                <div class="table-div">
                    <table border='1' id='lessonTable' class='content-table'>
                        <thead>
                            <tr class='table-header'>
                                <th>Date</th>
                                <th>Hour</th>
                                <th>Classroom</th>
                                <th>Change</th>
                                <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody class='lesson-table-body'>
                        </tbody>
                    </table>
                </div>
                <h1 id="noLesson" style="display: none;">There aren't lessons</h1>
                <div class='paginationLessons'>
                </div>
            </div>


            <div id='examFieldset' class="teacher-fieldset">
                <h1 id='header-exam' class='exam'></h1>
                <div class="searchBarExamsTeacherPage" id="searchBarContainerExamsTeacher" style="display: none">
                    <form action="search-exams-teacher">
                        <input type="hidden" name="search" value="">
                        <button type="submit"></button>
                    </form>
                </div>
                <h3 class="add-teacherArea">Add Exam</h3>
                <form id="addExamForm" name="addExamForm" action="addExam-servlet" method="post">
                    <div id="addExamContainer">
                        <div class="teacher-textbox" id="dateExamPadding">
                            <input type="date" class="addExam" id="examDateAdd" name="examDateAdd" placeholder="Date"><br>
                        </div>
                        <div class="teacher-textbox" id="hourExamPadding">
                            <input type="time" class="addExam" id="examHourAdd" name="examHourAdd" placeholder="Hour"><br>
                        </div>
                        <input type="hidden" id="examCourseAdd" name="examCourseAdd" value="">
                        <div class="teacher-textbox" id="classroomExamPadding">
                            <input type="text" class="addExam" id="examClassroomAdd" name="examClassroomAdd" placeholder="Classroom"><br>
                        </div>
                        <div id="submitTeacherButtonAddExam" style="margin-top: 3%">
                            <input id="submitExamButton" class="btnTeacher submitBtn" type="submit">
                        </div>
                    </div>
                </form>
                <div class="table-div">
                    <table border='1' id='examTable' class='content-table'>
                        <thead>
                            <tr class='table-header'>
                                <th>Date</th>
                                <th>Hour</th>
                                <th>Classroom</th>
                                <th>Change</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody class='exam-table-body'>
                        </tbody>
                    </table>
                </div>
                <h1 id="noExams" style="display: none">There aren't exams</h1>
                <div class='paginationExams'>
                </div>
            </div>

        </div>
        <script> var courseNumber = 4; </script>
        <script>var currentCourse = $("li .current").prop("id") </script>
        <script src="${pageContext.request.contextPath}/js/mobileTeacherMenu.js"></script>
        <script src="${pageContext.request.contextPath}/js/formTeacherAreaValidation.js"></script>
        <script src="${pageContext.request.contextPath}/js/editCurriculumTeacher.js"></script>
        <script src="${pageContext.request.contextPath}/js/courseTeacher.js"></script>
        <script src="${pageContext.request.contextPath}/js/utility.js"></script>
    </body>
</html>
