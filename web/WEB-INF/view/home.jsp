<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>
<html>
    <head>
        <title>Home</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/homePage.css" type="text/css">
        <meta name="viewport" content="initial-scale=1, width=device-width">
        <%@include file="header.jsp"%> <!--header-->
    </head>
    <body class="home-page-body">
        <br>
        <h1 class="hiddenFormatContent" style="visibility: hidden">
            hidden content
        </h1>
        <div class="main-home-container">
            <div class="home-title-box">
                <h1>STUDIUM</h1>
            </div>
            <div class="about-ref-container">
                <p>
                    Studium is a site aimed at offering and organizing a series of professional training courses. Each course is taught by a specialist teacher in the sector, and organized into a series of lessons that are held throughout the year. You can purchase one or more courses to earn the right to participate. At the end of participation in the course, an exam must be taken, after which a certificate with user data will be delivered.
                    Would you like to know more? <a href="about.html" >Click here</a>.
                </p>
            </div>
            <div class="info-home-container">
                <div class="website-description-container">
                    <h3 class="quote">
                        “Instrue praeceptis animum, nec discere cesses; nam sine doctrina vita est quasi mortis imago.”
                    </h3>
                    <h3 class="quote">
                        “Always keep teaching yourself, for life without learning is almost the image of death.” -
                    </h3>
                    <h4 class="sub-quote">
                        Marcus Tullius Cicero
                    </h4>
                    <p>
                        Every course on Studium is taught by top instructors from world-class universities and companies, so you can learn something new anytime, anywhere. Hundreds of courses provide additional quizzes and projects as well as a shareable Studium Certificate upon completion.
                    </p>
                    <p>
                        Enroll in Guided Projects to learn job-relevant skills and industry tools in under 2 hours. Guided Projects are self-paced, require a smaller time commitment, and provide practice using tools in real-world scenarios, so you can build the job skills you need, right when you need them.
                    </p>
                    <p>
                        Whether you’re looking to start a new career or change your current one, Professional Certificates on Studium help you become job-ready. Learn at your own pace from top companies and universities, apply your new skills to hands-on projects that showcase your expertise to potential employers, unlock access to career support resources, and earn a career credential to kickstart your new career.
                    </p>
                </div>
                <div class="login-ref-container">
                    <%
                        User loggedUser = (User)session.getAttribute("loggedUser");
                        if(loggedUser == null){
                    %>
                        <p>
                            If you are not registered yet, <a href="signup.html">sign up</a> here.
                            Otherwise, <a href="login.html">log-in</a> with your account.
                        </p>
                    <%
                        }
                        else{
                    %>
                        <p>
                            Welcome back, ${loggedUser.username}.
                            Check out your <a href="reservedArea.html">Reserved Area</a>
                        </p>
                    <%
                        }
                    %>
                </div>
            </div>
            <div class="text-for-courses"><h4>Some of our courses:</h4></div>
            <div class="text-for-courses-mobile"><h4>SOME OF OUR COURSES</h4></div>
            <div class="first-content-container">
                <div class="random-courses-container">
                    <p class="empty-courses-text">There are not courses</p>
                    <c:forEach items="${coursesToShowHome}" var="course">
                        <div class="gallery">
                            <a href="show-course?courseId=${course.id}">
                                <img src="${pageContext.request.contextPath}/resources/images/courseImages/${course.imagePath}" width="600" height="400">
                            </a>
                            <a href="show-course?courseId=${course.id}">
                                <div class="desc">
                                    <p style="text-decoration: underline solid forestgreen">${course.name}</p>
                                    <p>${course.price}$</p>
                                </div>
                            </a>
                        </div>
                    </c:forEach>
                </div>
            </div>
            <div class="text-for-categories">
                <h4>Some of our categories:</h4>
            </div>
            <div class="text-for-categories-mobile">
                <h4>SOME OF OUR CATEGORIES</h4>
            </div>
            <div class="second-content-container">
                <div class="random-categories-container">
                    <p class="empty-categories-text">There are not courses</p>
                    <c:forEach items="${categoriesToShowHome}" var="category">
                        <div class="gallery">
                            <a href="show-category-courses?categoryName=${category.name}">
                                <img src="${pageContext.request.contextPath}/resources/images/categoryImages/${category.imagePath}" width="600" height="400">
                            </a>
                            <a href="show-category-courses?categoryName=${category.name}">
                                <div class="desc">
                                    <p style="text-decoration: underline solid forestgreen">${category.name}</p>
                                </div>
                            </a>
                        </div>
                    </c:forEach>
                </div>
            </div>
        </div>
    <%@include file="footer.jsp"%> <!--footer-->
    <script>
        var coursesSize=${coursesSize};
        var categoriesSize=${categoriesSize}

        $(document).ready(ev => {
            if(coursesSize==0){
                $(".first-content-container .random-courses-container .gallery").hide();
                $(".empty-courses-text").show();
            }
            else{
                $(".first-content-container .random-courses-container .gallery").show();
                $(".empty-courses-text").hide();
            }
            if(categoriesSize==0){
                $(".second-content-container .random-categories-container .gallery").hide();
                $(".empty-categories-text").show();
            }
            else{
                $(".second-content-container .random-categories-container .gallery").show();
                $(".empty-categories-text").hide();
            }
        });
    </script>
    </body>
</html>
