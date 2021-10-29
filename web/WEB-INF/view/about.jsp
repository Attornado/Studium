<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>About Us</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/aboutPage.css">
        <%@include file="header.jsp"%> <!--header-->
    </head>
    <body class="aboutBody">
        <br>
        <div id="pageTitle">
            <h1>
                About<br>
                <span class="thin">Us</span>
            </h1>
        </div>
        <div class="galleryContainer">
            <div class="slideShowContainer">
                <div class="leftArrow" onclick="plusSlides(-1)"><span class="arrow arrowLeft"></span></div>
                <div class="rightArrow" onclick="plusSlides(1)"><span class="arrow arrowRight"></span></div>
                <div class="captionHolder"><p class="captionText"></p></div>
                <div class="imageHolder">
                    <img src="${pageContext.request.contextPath}/resources/images/teamImage/studium-charosel.jpg">
                    <p class="captionText">Studium</p>
                </div>
                <div class="imageHolder">
                    <img src="${pageContext.request.contextPath}/resources/images/teamImage/caption-Roberto.jpg">
                    <p class="captionText">Roberto Esposito</p>
                </div>
                <div class="imageHolder">
                    <img src="${pageContext.request.contextPath}/resources/images/teamImage/caption-Francesco.jpg">
                    <p class="captionText">Francesco Mattina</p>
                </div>
                <div class="imageHolder">
                    <img src="${pageContext.request.contextPath}/resources/images/teamImage/caption-Andrea.jpg">
                    <p class="captionText">Andrea Terlizzi</p>
                </div>
            </div>
            <div class="dotbox">
                <span class="dot" onclick="currentSlide(1)"></span>
                <span class="dot" onclick="currentSlide(2)"></span>
                <span class="dot" onclick="currentSlide(3)"></span>
                <span class="dot" onclick="currentSlide(4)"></span>
            </div>
        </div>
        <div class="descriptionContainer">
            <p class="descriptionText"> </p>
        </div>
        <%@include file="footer.jsp"%><!--footer-->
        <script src="${pageContext.request.contextPath}/js/aboutScript.js"></script>
    </body>
</html>
