<%--
  Created by IntelliJ IDEA.
  User: Roberto Esposito
  Date: 6/26/2020
  Time: 10:16 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1256">
    <title>Reserved Area</title>
    <meta name="viewport" content="initial-scale=1, width=device-width">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/reservedArea.css">
</head>
<body class="reserved-body">
    <%@include file="header.jsp"%>
    <br>
    <div class="reserved-fieldset">
        <table border="1" class="content-table-reserved">
            <h1 class="reserved-header">Info</h1>
            <thead>
            <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>CF</th>
                <th>Birthdate</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> ${loggedUser.username} </td>
                <td> ${loggedUser.name} </td>
                <td> ${loggedUser.surname} </td>
                <td> ${loggedUser.mail} </td>
                <td> ${loggedUser.CF} </td>
                <td> ${loggedUser.birthDate} </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="reserved-fieldset">
        <table border="1" class="content-table-reserved">
            <h1 class="reserved-header"> Residence </h1>
            <thead>
            <tr>
                <th>Street</th>
                <th>Province</th>
                <th>Number</th>
                <th>CAP</th>
                <th>City</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> ${loggedUser.street} </td>
                <td> ${loggedUser.province} </td>
                <td> ${loggedUser.number} </td>
                <td> ${loggedUser.CAP} </td>
                <td> ${loggedUser.city} </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="reserved-fieldset">
        <c:if test = '${enrollmentsAndCoursesMapOfTheLoggedUser.size() == 0}'>
            <h1>You haven't any course</h1>
        </c:if>
        <c:if test = '${enrollmentsAndCoursesMapOfTheLoggedUser.size() != 0}'>
            <table border="1" class="content-table-reserved">
                <h1 class="reserved-header">Your courses</h1>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Teacher</th>
                    <th>Passed</th>
                </tr>
                </thead>
                <tbody>
                <c:set var="keys" value="${enrollmentsAndCoursesMapOfTheLoggedUser.keySet()}" scope="page"/>
                <c:forEach items='${keys}' var='course'>
                    <tr>
                        <td> ${course.name}</td>
                        <td> ${course.category}</td>
                        <td> ${course.teacher.username}</td>
                        <td> ${enrollmentsAndCoursesMapOfTheLoggedUser.get(course)}</td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </c:if>
    </div>
</body>
</html>
