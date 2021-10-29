<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.lang.Math" %>
<html>
    <head>
        <title>Categories</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/categoriesPage.css">
        <%@include file="header.jsp"%> <!--header-->
    </head>
    <body class="categories">
        <br>
        <div id="pageTitle">
            <h1><span class="thin">Course</span><br>Categories</h1>
        </div>
        <br>
        <br>
        <div class="catList">
            <ul>
                <c:set var="count" value="0" scope="page"/>
                <c:forEach items="${categoryList}" var="category">
                    <c:if test="${count % 5 == 0}">
                        <%//ogni 5 categorie, creiamo il div di una nuova pagina, quello della prima pagina non chiude div precedente e dev'essere visibile di default%>
                        <c:if test="${count == 0}">
                            <div class="categoryPage visible loaded" id="categoryPage${Math.round(count/5 + 1)}">
                        </c:if>
                        <%//mentre i div successivi di default non sono visibili%>
                        <c:if test="${count > 0}">
                            </div>
                            <div class="categoryPage" id="categoryPage${Math.round(count/5 + 1)}">
                        </c:if>
                    </c:if>
                    <c:if test="${count < 5}"> <%//carichiamo le prime 5 categorie%>
                        <li>
                            <form action="show-category-courses" style="background-image: url('${pageContext.request.contextPath}/resources/images/categoryImages/${category.imagePath}');" class="buttonform">
                                <button type="submit">
                                    <span>${category.name}</span>
                                </button>
                                <input type="hidden" name="categoryName" value="${category.name}">
                            </form>
                            <div class="categoryInfo">
                                <p>${category.description}</p>
                            </div>
                        </li>
                    </c:if>
                    <br><br>
                    <c:set var="count" value="${count + 1}" scope="page"/>
                </c:forEach>
                </div>
            </ul>
            <div class="pagination">
                <span id="previousPage" class="visible">&laquo;</span>
                <span id="ellipseSx">...</span>
                <c:set var="maxPage" value="${Math.ceil(categories.values().size()/5)}"/>
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
        <script>var maxPage = ${(maxPage > 0)?(maxPage):(1)}; //mantiena l'indice dell'ultima pagina</script>
        <script src="${pageContext.request.contextPath}/js/utility.js"></script>
        <script src="${pageContext.request.contextPath}/js/categoriesPage.js"></script>
    </body>
</html>
