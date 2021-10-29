<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1256">
        <title>SignUp</title>
    </head>
    <%@include file="header.jsp"%>
    <body class="signup">
        <!--header-->
        <h1 style="visibility: hidden">
            hidden content
        </h1>
        <fieldset class="signup-fieldset">
            <h1 class="signup-header">Signup</h1>
            <form id="signUpForm" name="signUpForm" action="signup-servlet" method="post">
                <div class="signup-textbox">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <input type="text" name="username" placeholder="Username"/><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                    <input class="passwordInput" type="password" name="password" placeholder="Password"/>
                    <i class="fa fa-eye showPasswordBtn"></i><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                    <input class="passwordInput" type="password" name="repeatPassword" placeholder="Confirm Password"/>
                    <i class="fa fa-eye showPasswordBtn"></i><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <input type="text" class="mailInput" name="mail" placeholder="E-mail"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <input type="text" class="mailInput" name="repeatmail" placeholder="Confirm E-mail"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <input type="text" name="firstName" placeholder="First Name"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <input type="text" name="surname" placeholder="Last Name"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-id-card" aria-hidden="true"></i>
                    <input type="text" name="CF" placeholder="CF"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <input type="text" name="birthdate"  id="birthdate" placeholder="Date of Birth"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    <input type="text" name="street" placeholder="Street"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    <input type="text" name="number" placeholder="Number"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-building" aria-hidden="true"></i>
                    <input id="province" type="text" name="province" placeholder="Province"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-building" aria-hidden="true"></i>
                    <input type="text" name="city" placeholder="City"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-globe" aria-hidden="true"></i>
                    <input type="text" name="CAP" placeholder="CAP"><br>
                </div>
                <div class="signup-textbox">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    <input type="text" name="telephone" placeholder="Number telephone"><br>
                </div>
                <%
                    String error = (String)request.getAttribute("showCredentialError");
                    if(error != null){
                %>
                    <span id="errorMessage" class="Error toShow"><%=error%></span><br>
                <%
                }
                else{
                %>
                    <span id="errorMessage" class="Error"></span><br>
                <%
                    }
                %>
                <div id="submitSignUpButtonContainer">
                    <input id="submitBtn" class="btn submitBtn" type="submit" value="Sign up" disabled>
                </div>
            </form>
            <p id="fromSignInToSignUpParagraph" class="signup-p"> Sei già registrato? </p>
            <form action="login.html" method="post">
                <button id="fromSignUpToSignIn" type="submit">Sign in</button>
            </form>
        </fieldset>
        <%@include file="footer.jsp"%> <!--footer-->
        <script src="${pageContext.request.contextPath}/js/utility.js"></script>
        <script src="${pageContext.request.contextPath}/js/formValidationFunctions.js"></script>
        <script src="${pageContext.request.contextPath}/js/signUpForm.js"></script>
    </body>
</html>
