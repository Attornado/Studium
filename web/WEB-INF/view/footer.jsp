<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/footer-style.css">
</head>
<body>

    <div class="footer">
        <div class="footer-content">
            <div class="footer-section about">
                <h1 class="logo-text">Studium</h1>
                <p>
                    Studium is a site that sells on-site professional training courses.
                </p>
                <div class="contact">
                    <span><i class="fa fa-phone"></i> &nbsp; 123-456-789</span>
                    <span><i class="fa fa-envelope"></i> &nbsp; info@studium.it</span>
                </div>
                <div class="socials">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-youtube"></i></a>
                </div>
            </div>
            <div class="footer-section links">
                <h2>Quick Links</h2>
                <br>
                <ul>
                    <li>
                        <a href="index.html">Home</a>
                    </li>
                    <li>
                        <a href="about.html">About us</a>
                    </li>
                    <%
                        if(session.getAttribute("loggedUser") == null){
                    %>
                            <li>
                                <a href="login.html">Login</a>
                            </li>
                    <%
                        }
                        else{
                    %>
                        <li>
                            <a href="reservedArea.html">Reserved Area</a>
                        </li>
                    <%
                        }
                    %>
                    <li>
                        <a href="courses.html">Categories</a>
                    </li>
                </ul>
            </div>
            <div class="footer-section contact-form">
                <h2>Contact us</h2>
                <br>
                <form action="index.html" method="post">
                    <input type="email" name="email" class="text-input contact-input" placeholder="Your email address...">
                    <textarea name="message" class="text-input contact-input" placeholder="Your message..."></textarea>
                    <button type="submit" class="btn btn-big contact-btn">
                        <i class="fa fa-envelope"></i>
                        Send
                    </button>
                </form>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; Studium.it | Designed by Roberto Esposito, Francesco Mattina, Andrea Terlizzi.
        </div>
    </div>

</body>
</html>
