<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<html>
<head>
    <title>${course.name}</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/coursePage.css">
    <%@include file="header.jsp"%> <!--header-->
</head>
<body class="courseBody">
    <br>
    <div id="pageTitle">
        <h1>
            <span class="thin">Course</span><br>
            ${course.name}
        </h1>
    </div>
    <div class="container-course-main">
        <div class="container-img-course" style="background-image: url('${pageContext.request.contextPath}/resources/images/courseImages/${course.imagePath}');">
            <div class="top-image-section">
                <h2>
                    <span>${course.name}</span>
                </h2>
            </div>
        </div>
        <div class="info-course-box">
            <div class="description-course-box">
                <h4>
                    <span class="put-border-bottom">Description</span>:
                </h4>
                <p>
                    ${course.description}
                </p>
            </div>
            <div class="specific-course-info">
                <h4>
                    <span class="put-border-bottom">Category</span>: <a href="show-category-courses?categoryName=${course.category}">${course.category}</a>
                </h4>
                <h4>
                    <span class="put-border-bottom">Start Date</span>: ${course.startDate}
                </h4>
                <h4>
                    <span class="put-border-bottom">End Date</span>: ${course.endDate}
                </h4>

                <div class="button-box">
                    <button class="myBtn" onclick="openModal(this)" value="lessons">Lessons</button>
                    <button class="myBtn" onclick="openModal(this)" value="exams">Exams</button>
                </div>
                <div id="myModal" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close">&times;</span>

                            <fieldset id='lessonFieldset' class="tableFieldset">
                                <c:set var='maxLessons' value='${lessonsLength}'/>
                                <c:if test="${maxLessons==0}">
                                    <h1>There are no lessons!</h1>
                                </c:if>
                                <c:if test="${maxLessons!=0}">
                                    <table border='1' id='lessonTable' class='content-table'>
                                        <thead>
                                        <tr class='table-header'>
                                            <th>Date</th>
                                            <th>Hour</th>
                                            <th>Classroom</th>
                                        </tr>
                                        </thead>
                                        <tbody class='lesson-table-body'>
                                        <c:forEach items="${lessons}" var="lesson">
                                            <tr class='lessons-table-body-row'>
                                                <td> ${lesson.date}</td>
                                                <td> ${lesson.hour}</td>
                                                <td> ${lesson.classroom} </td>
                                            </tr>
                                        </c:forEach>
                                        </tbody>
                                    </table>
                                    <div class='paginationLessons'>
                                        <span id='previousPageLessons' class='visible'>&laquo;</span>
                                        <span id='ellipseSxLessons'>...</span>
                                        <c:set var='maxPageLessons' value='${Math.ceil(lessonsLength/4)}'/>
                                        <c:forEach var='i' begin='1' end='${maxPageLessons}'>
                                            <c:if test='${i == 1}'>
                                                <span class='current-page visible pageNumBtnLesson' id='pageLessons${i}'>${i}</span>
                                            </c:if>
                                            <c:if test='${i != 1}'>
                                                <c:if test='${i <= 4}'>
                                                    <span class='pageNumBtnLesson visible' id='pageLessons${i}'>${i}</span>
                                                </c:if>
                                                <c:if test='${i > 4}'>
                                                    <span class='pageNumBtnLesson' id='pageLessons${i}'>${i}</span>
                                                </c:if>
                                            </c:if>
                                        </c:forEach>
                                        <c:if test='${maxPageLessons > 4}'>
                                            <span id='ellipseDxLessons' class='visible'>...</span>
                                        </c:if>
                                        <c:if test='${maxPageLessons <= 4}'>
                                            <span id='ellipseDxLessons'>...</span>
                                        </c:if>
                                        <span id='nextPageLessons' class='visible'>&raquo;</span>
                                    </div>
                                </c:if>
                            </fieldset>

                            <fieldset id='examFieldset' class="tableFieldset">
                                <c:set var='maxExams' value='${examsLength}'/>
                                <c:if test="${maxExams==0}">
                                    <h1>There are no exams!</h1>
                                </c:if>
                                <c:if test="${maxExams!=0}">
                                <table border='1' id='ExamTable' class='content-table'>
                                    <thead>
                                    <tr class='table-header'>
                                        <th>Date</th>
                                        <th>Hour</th>
                                        <th>Classroom</th>
                                    </tr>
                                    </thead>
                                    <tbody class='exam-table-body'>
                                    <c:forEach items="${exams}" var="exam">
                                        <tr class='exams-table-body-row'>
                                            <td> ${exam.date}</td>
                                            <td> ${exam.hour}</td>
                                            <td> ${exam.classroom} </td>
                                        </tr>
                                    </c:forEach>
                                    </tbody>
                                </table>
                                <div class='paginationExams'>
                                    <span id='previousPageExams' class='visible'>&laquo;</span>
                                    <span id='ellipseSxExams'>...</span>
                                    <c:set var='maxPageExams' value='${Math.ceil(examsLength/4)}'/>
                                    <c:forEach var='i' begin='1' end='${maxPageExams}'>
                                        <c:if test='${i == 1}'>
                                            <span class='current-page visible pageNumBtnExam' id='pageExams${i}'>${i}</span>
                                        </c:if>
                                        <c:if test='${i != 1}'>
                                            <c:if test='${i <= 4}'>
                                                <span class='pageNumBtnExam visible' id='pageExams${i}'>${i}</span>
                                            </c:if>
                                            <c:if test='${i > 4}'>
                                                <span class='pageNumBtnExam' id='pageExams${i}'>${i}</span>
                                            </c:if>
                                        </c:if>
                                    </c:forEach>
                                    <c:if test='${maxPageExams > 4}'>
                                        <span id='ellipseDxExams' class='visible'>...</span>
                                    </c:if>
                                    <c:if test='${maxPageExams <= 4}'>
                                        <span id='ellipseDxExams'>...</span>
                                    </c:if>
                                    <span id='nextPageExams' class='visible'>&raquo;</span>
                                </div>
                                </c:if>
                            </fieldset>

                    </div>
                </div>
                <div class="addToCartAndTeacherBtnContainer">
                    <span class="teacherName">
                        <i class="fa fa-graduation-cap"></i>
                        <a href="showTeacher.html?teacherUsername=${teacher.username}">
                            ${teacher.name} <br>${teacher.surname}
                        </a>
                    </span>
                    <span class="addToCartBtn" id="addCourse${course.id}">
                        <i class="fa fa-cart-plus"></i>
                    </span>
                    <span class="price">${course.price}$</span>
                </div>
            </div>
        </div>
    </div>

<%@include file="footer.jsp"%> <!--footer-->
<script>
    var maxPageLessons=${maxPageLessons};
    var maxPageExams=${maxPageExams};
    var courseId=${course.id};
</script>
<script src="${pageContext.request.contextPath}/js/coursePage.js"></script>
<script src="${pageContext.request.contextPath}/js/utility.js"></script>
<script src="${pageContext.request.contextPath}/js/coursesPage.js"></script>
</body>
</html>
