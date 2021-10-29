<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>${teacher.name} ${teacher.surname}</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/teacherPage.css">
        <%@include file="header.jsp"%> <!--header-->
    </head>
    <body class="teacherBody">
        <br>
        <div class="container-main">
            <div class="info-box">
                <h2>
                    <span class="put-name-border">${teacher.name} ${teacher.surname}</span>
                </h2>
                <h4>
                    <span class="put-text-border">City</span>: ${teacher.city} (${teacher.province})
                </h4>
                <h4>
                    <span class="put-text-border">Street</span>: ${teacher.street} ${teacher.number}
                </h4>
                <h4>
                    <span class="put-text-border">E-mail</span>: ${teacher.mail}
                </h4>
                <h4>
                    <span class="put-text-border">Telephone</span>: ${teacher.telephone}
                </h4>

            </div>
            <div class="bottom-box">
                <div class="curriculum-box">
                    <h4>
                        <span class="put-text-border">Curriculum</span>:
                    </h4>
                    <p>
                      ${teacher.curriculum}
                    </p>
                </div>
                <div class="courses-box">
                    <h4>
                        <span class="put-text-border">Courses</span>:
                    </h4>
                  <c:forEach items="${courses}" var="course">
                       <div>
                         <a href="show-course?courseId=${course.id}">${course.name}</a>
                       </div>
                  </c:forEach>
                </div>
            </div>
        </div>


        <%@include file="footer.jsp"%> <!--footer-->
    </body>
</html>
