<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1256">
        <title>Login Page</title>
        <%@include file="header.jsp"%>
    </head>
    <body class="login">
        <fieldset class="login-fieldset">
            <h1 class="login-header">Login</h1>
            <form id="loginForm" action="login-servlet" name="loginForm" method="post">
                <div class="login-textbox">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <input id="usernameField" type="text" name="username" placeholder="Username"/>
                </div>
                <div class="login-textbox">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                    <input id="passwordField" type="password" name="password" placeholder="Password"/>
                    <i class="fa fa-eye showPasswordBtn"></i><br>
                </div>
                <input type="hidden" name="login" value="login">
                <%
                    String error = (String)request.getAttribute("showCredentialError");
                    if(error != null){
                %>
                    <span id="errorMessage" class="Error toShow">Errore: Username e/o password errati.</span><br>
                <%
                    }
                    else{
                %>
                    <span id="errorMessage" class="Error"></span><br>
                <%
                    }
                %>
                <div id="submitLoginButtonContainer">
                    <input id="submitBtn" class="btn submitBtn" type="submit" name="signIn" value="Sign In" disabled>
                </div>
            </form>
            <p class="login-p"> Non sei ancora registrato? </p>
            <form action="signup.html" method="get">
                <button id="fromSignInToSignUp" type="submit">Sign up</button>
            </form>
        </fieldset>
        <%@include file="footer.jsp"%> <!--footer-->
        <script>
            function resizeFooter(){ //per evitare strani ridimensionamenti su iPadPro
                if(window.matchMedia("screen and (min-width: 629px) and (min-height: 1010px)").matches)
                    $(".footer").css("position", "absolute").css("bottom", "0");
                else
                    $(".footer").css("position", "").css("bottom", "");
            }
            resizeFooter();
            window.onresize = ev => resizeFooter();
        </script>
        <script src="${pageContext.request.contextPath}/js/utility.js"></script>
        <script src="${pageContext.request.contextPath}/js/formValidationFunctions.js"></script>
        <script src="${pageContext.request.contextPath}/js/loginForm.js"></script>
    </body>
</html>