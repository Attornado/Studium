<%@ page import="model.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" errorPage="errorPage.jsp" import="controller.GetMoreCategoriesServlet" %>
<!DOCTYPE HTML>
<html>
  <head>
    <link href="${pageContext.request.contextPath}/resources/icons/favicon.ico" rel="shortcut icon" >
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="${pageContext.request.contextPath}/js/libraries/jquery.js"></script>
    <meta name="viewport" content="initial-scale=1, width=device-width">
  </head>
  <body>
    <div id="header">
      <div id="mobileMenuButtonContainer">
        <button id="mobileMenuButton"><i class="fa fa-bars"></i></button>
      </div>
      <nav id="navbarId">
        <ul id="navigationMenuList">
          <li class="navbar">
            <a style="font-weight: bold" id="home" href=".">
              <i class="fa fa-home"></i> Home
            </a>
          </li>
          <li class="navbar">
            <div class="dropdown" id="coursesDropdown">
              <a href="courses.html" id="corsi" class="dropdown"><i class="fa fa-book dropdown"></i> Courses</a>
                <ul class="dropdown-content">
                  <div class="scroll-dropdown-content">
                    <c:set var="categoriesToShow" scope="page" value="${categoryList}"/>
                    <c:forEach var="i" begin="0" end="${GetMoreCategoriesServlet.CATEGORIES_PER_REQUEST_DEFAULT - 1}">
                      <li>
                        <form action="show-category-courses">
                          <input type="hidden" name="categoryName" value="${categoryList.get(i).name}">
                          <button id="${categoryList.get(i).name}" class="categoryBtn" type="submit">
                              ${categoryList.get(i).name}
                          </button>
                        </form>
                      </li>
                    </c:forEach>
                  </div>
                  <span class="moreCategoriesButton">
                    <i class="fa fa-angle-down"></i>
                  </span>
                </ul>
            </div>
          </li>
          <li class="navbar">
            <a id="about" href="about.html">
              <i class="fa fa-info-circle"></i>  About
            </a>
          </li>
          <%if(session.getAttribute("loggedUser") == null){%>
            <li class="navbar">
              <a style="font-weight: bold" id="login" href="login.html">
                <i class="fa fa-user"></i> Login
              </a>
            </li>
          <%} else{%>
            <li class="navbar" style="margin-right: 4.4%">
              <div class="dropdown" id="userAreaDropdown">
                <a style="font-weight: bold;" id="reservedArea" class="dropdown" href="reservedArea.html">
                  <i class="fa fa-user"></i> Reserved Area
                </a>
                <ul class="dropdown-content">
                  <c:if test="${loggedUser.root}">
                    <li>
                      <form action="show-admin-area">
                        <button id="adminArea" type="submit">
                          <i class="fa fa-briefcase"></i> Admin Area
                        </button>
                      </form>
                    </li>
                  </c:if>
                  <%if(((User)session.getAttribute("loggedUser")).getClass().equals(Teacher.class) ||
                          ((User)session.getAttribute("loggedUser")).isRoot()){%>
                    <li>
                      <form action="show-teacher-area">
                        <button id="teacherArea" type="submit">
                          <i class="fa fa-graduation-cap"></i> Teacher Area
                        </button>
                      </form>
                    </li>
                  <%}%>
                  <li>
                    <form action="logout">
                      <button id="logoutBtn" type="submit">
                        <i class="fa fa-arrow-left"></i> Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
            </li>
          <%}%>
          <li class="navbar cart">
            <div id="cartContainer">
              <form action="show-cart">
                <button id="cart" class="cart" type="submit" name="showCart" value="showCart">
                  <i class="fa fa-shopping-cart"></i>
                </button>
              </form>
            </div>
          </li>
          <li class ="navbar searchBar">
            <div class="searchBar" id="searchBarContainer">
              <form class="searchBar" action="search-items">
                <input class="searchBar" type="text" value="<%=request.getAttribute("searchString")!=null?request.getAttribute("searchString"):""%>" placeholder="Search.." name="search" autocomplete="off" aria-autocomplete="none" autocapitalize="off" spellcheck="false" required oninvalid="this.setCustomValidity('Inserisci qualcosa da cercare!')" oninput="this.setCustomValidity('')" >
                <button id="searchItems" class="searchBar" type="submit"><i class="fa fa-search"></i></button>
              </form>
              <div class="async-results-container">
                <div class="async-results-list"></div>
                <span class="moreResultsButton"><i class="fa fa-angle-down"></i></span>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <span id="scrollUpBtn"><i class="fa fa-chevron-up"></i></span> <!--Scroll down btn-->
    <br>
    <div class="popupBox">
      <span class="closeButton">&times;</span>
      <strong class="type"></strong> <!--riempito dinamicamente con lo pseudo-elemento ::after-->
      <span class="msgContent">Default text.</span>
    </div>
    <script>
      var categoryNumber = ${GetMoreCategoriesServlet.CATEGORIES_PER_REQUEST_DEFAULT};
      function checkCurrentCategory(){
        let currentCategory = document.getElementById("${currentCategory}");
        if(currentCategory != null && currentCategory != undefined)
          currentCategory.classList.add("current");
      }
      $(document).ready(ev => {
        let currentSection = document.getElementById("${sectionName}");
        let currentUserAreaSection = document.getElementById("${currentUserAreaSection}");
        currentSection.classList.add("current");
        if(currentSection.getAttribute("id") == document.getElementById("corsi").getAttribute("id"))
          checkCurrentCategory();
        else if(currentSection.getAttribute("id") == "reservedArea")
          currentUserAreaSection.classList.add("current");
      });
    </script>
    <script src="${pageContext.request.contextPath}/js/categoryDropdown.js"></script>
    <script src="${pageContext.request.contextPath}/js/scrollUpButton.js"></script>
    <script src="${pageContext.request.contextPath}/js/mobileMenu.js"></script>
    <script src="${pageContext.request.contextPath}/js/searchBarAsync.js"></script>
  </body>
</html>
