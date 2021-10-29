<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Search results</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css" type="text/css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/searchResults.css" type="text/css">
        <meta name="viewport" content="initial-scale=1, width=device-width">
    </head>
    <%@include file="header.jsp"%> <!--header-->
    <body class="searchResults">
        <div id="pageTitle">
            <h1>
                <span class="thin">Search</span><br>
                <span class="bold">Courses</span>
            </h1>
        </div>
        <br>
        <br>
        <div class="resultsContainer">
            <div id="filterContainer">
                <div class="filter-bar">
                    <a class="filter-dropdown">
                        <i class="fa fa-filter" aria-hidden="true"></i>
                        Filters
                    </a>
                </div>
                <div class="edit-filter-modal hidden">
                    <div class="filter-textbox">
                        <i class="fa fa-align-left" aria-hidden="true"></i>
                        <label for="searchInDescription">Search in description</label>
                        <input id="searchInDescription" type="checkbox">
                    </div>
                    <div class="filter-textbox">
                        <i class="fa fa-long-arrow-up" aria-hidden="true"></i>
                        <label for="sortByPriceAscending">Ascending price</label>
                        <input id="sortByPriceAscending" checked class="sortCheckbox" type="checkbox">
                    </div>
                    <div class="filter-textbox">
                        <i class="fa fa-long-arrow-down" aria-hidden="true"></i>
                        <label for="sortByPriceDescending">Descending price</label>
                        <input id="sortByPriceDescending" class="sortCheckbox" type="checkbox">
                    </div>
                    <div class="filter-textbox">
                        <i class="fa fa-dollar" aria-hidden="true"></i>
                        <input id="maxPrice" placeholder="Max price" type="text">
                    </div>
                    <div class="filterButtonContainer">
                        <button class="filterButton close-button">Close</button>
                        <button class="filterButton apply-button">Apply</button>
                    </div>
                    <br><span id="errorMessage"></span>
                </div>
                <div class="search-space">
                    <h3>Search through: </h3>
                    <div class="filter-textbox">
                        <i class="fa fa-book" aria-hidden="true"></i>
                        <label for="courses-search-space">Courses</label>
                        <input id="courses-search-space" class="search-space-checkbox" type="checkbox">
                    </div>
                    <div class="filter-textbox">
                        <i class="fa fa-list-ul" aria-hidden="true"></i>
                        <label for="categories-search-space"> Categories</label>
                        <input id="categories-search-space" class="search-space-checkbox" type="checkbox">
                    </div>
                    <div class="filter-textbox">
                        <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                        <label for="teachers-search-space">Teachers</label>
                        <input id="teachers-search-space" class="search-space-checkbox" type="checkbox">
                    </div>
                </div>
            </div>
            <div class="result-list-box">
            </div>
            <div class="pagination">
                <span id="previousPage" class="visible">&laquo;</span>
                <span id="ellipseSx">...</span>
                <span class="current visible pageNumBtn" id="page1">1</span>
                <span id="ellipseDx">...</span>
                <span id="nextPage" class="visible">&raquo;</span>
            </div>
        </div>
        <%@include file="footer.jsp"%> <!--footer-->
        <script src="${pageContext.request.contextPath}/js/formValidationFunctions.js"></script>
        <script src="${pageContext.request.contextPath}/js/utility.js"></script>
        <script src="${pageContext.request.contextPath}/js/coursesPage.js"></script>
        <script src="${pageContext.request.contextPath}/js/filterFieldset.js"></script>
        <script src="${pageContext.request.contextPath}/js/searchResultsPage.js"></script>
    </body>
</html>
