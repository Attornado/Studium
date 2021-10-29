<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.lang.Math" %>
<html>
<head>
    <title>${currentCategory} Courses</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/coursesPage.css">
    <%@include file="header.jsp"%> <!--header-->
</head>
    <body class="coursesBody">

        <div id="pageTitle">
            <h1><span class="thin">${currentCategory}</span><br>Courses</h1>
        </div>
        <br>
        <br>
        <div class="courseList">
            <div id="filterContainer">
                <div class="filter-bar">
                    <a class="filter-dropdown">
                        <i class="fa fa-filter" aria-hidden="true"></i>
                        Filters
                    </a>
                </div>
                <div class="edit-filter-modal hidden">
                    <div class="filter-textbox">
                        <i class="fa fa-long-arrow-up" aria-hidden="true"></i>
                        <label>Ascending price</label>
                        <input id="sortByPriceAscending" class="sortCheckbox" type="checkbox">
                    </div>
                    <div class="filter-textbox">
                        <i class="fa fa-long-arrow-down" aria-hidden="true"></i>
                        <label>Descending price</label>
                        <input id="sortByPriceDescending" class="sortCheckbox" type="checkbox">
                    </div>
                    <div class="filter-textbox">
                        <i class="fa fa-dollar" aria-hidden="true"></i>
                        <input id="maxPrice" placeholder="Max price" type="text">
                    </div>
                    <div class="filter-textbox">
                        <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                        <input id="teacherField" placeholder="Teacher name" type="text">
                    </div>
                    <div class="filterButtonContainer">
                        <button class="filterButton close-button">Close</button>
                        <button class="filterButton apply-button">Apply</button>
                    </div>
                    <br><span id="errorMessage"></span>
                </div>
            </div>
            <ul>
                <c:set var="count" value="0" scope="page"/>
                <c:forEach items="${courses}" var="course">
                    <c:if test="${count % 5 == 0}">
                    <%//ogni 5 corsi, creiamo il div di una nuova pagina, quello della prima pagina non chiude div precedente e dev'essere visibile di default%>
                        <c:if test="${count == 0}">
                <div class="coursePage visible" id="coursePage${Math.round(count/5 + 1)}">
                        </c:if>
                <%//mentre i div successivi di default non sono visibili%>
                        <c:if test="${count > 0}">
                </div>
                <div class="coursePage" id="coursePage${Math.round(count/5 + 1)}">
                        </c:if>
                    </c:if>
                    <li>
                        <form action="show-course" style="background-image: url('${pageContext.request.contextPath}/resources/images/courseImages/${course.imagePath}');" class="buttonform">
                            <button type="submit">
                                <span class="courseName">${course.name}</span>
                            </button>
                            <input type="hidden" name="courseId" value="${course.id}">
                        </form>
                        <div class="courseInfo">
                            <p class="courseDescription">${course.description}</p>
                            <div class="addToCartAndTeacherBtnContainer">
                                <span class="teacherName">
                                    <i class="fa fa-graduation-cap"></i>
                                    <a href="showTeacher.html?teacherUsername=${course.teacher.username}">
                                            ${course.teacher.name} <br>${course.teacher.surname}
                                    </a>
                                </span>
                                <span class="addToCartBtn" id="addCourse${course.id}">
                                    <i class="fa fa-cart-plus"></i>
                                </span>
                                <span class="price">${course.price}$</span>
                            </div>
                        </div>
                    </li>
                    <br><br>
                    <c:set var="count" value="${count + 1}" scope="page"/>
                    </c:forEach>
                </div>
            </ul>
            <div class="pagination">
                <span id="previousPage" class="visible">&laquo;</span>
                <span id="ellipseSx">...</span>
                <c:set var="maxPage" value="${Math.ceil(courses.size()/5)}"/>
                <c:forEach var="i" begin="1" end="${maxPage}">
                    <c:if test="${i == 1}">
                        <span class="current visible pageNumBtn" id="page${i}">${i}</span>
                    </c:if>
                    <c:if test="${i != 1}">
                        <c:if test="${i <= 5}">
                            <span class="pageNumBtn visible" id="page${i}">${i}</span>
                        </c:if>
                        <c:if test="${i > 5}">
                            <span class="pageNumBtn" id="page${i}">${i}</span>
                        </c:if>
                    </c:if>
                </c:forEach>
                <c:if test="${maxPage > 5}">
                    <span id="ellipseDx" class="visible">...</span>
                </c:if>
                <c:if test="${maxPage <= 5}">
                    <span id="ellipseDx">...</span>
                </c:if>
                <span id="nextPage" class="visible">&raquo;</span>
            </div>
        </div>
        <%@include file="footer.jsp"%> <!--footer-->
        <script>
            var maxPage = ${((maxPage > 0)?(maxPage):(1))}, //maxPage è almeno 1
                $allCourses = $(".coursePage li"),
                $allCoursesAscending = $allCourses.slice().sort((li1, li2) => { //ordinamento crecente
                    return parseFloat($(li1).find(".price").text().replace("$", "")) -
                        parseFloat($(li2).find(".price").text().replace("$", ""));}),
                $allCoursesDescending = $allCourses.slice().sort((li1, li2) => { //ordinamento decrescente
                    return parseFloat($(li2).find(".price").text().replace("$", "")) -
                        parseFloat($(li1).find(".price").text().replace("$", ""));});
        </script>
        <script src="${pageContext.request.contextPath}/js/formValidationFunctions.js"></script>
        <script src="${pageContext.request.contextPath}/js/utility.js"></script>
        <script src="${pageContext.request.contextPath}/js/filterFieldset.js"></script>
        <script src="${pageContext.request.contextPath}/js/coursesPage.js"></script>
    </body>
</html>
