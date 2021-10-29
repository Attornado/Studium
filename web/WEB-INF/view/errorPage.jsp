<%@ page contentType="text/html;charset=UTF-8" language="java" isErrorPage="true"%>
<html>
    <head>
        <title>ErrorPage: ${requestScope["javax.servlet.error.status_code"]}</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/errorPage.css">
        <%@include file="header.jsp"%>
    </head>
    <body class="errorPageBody">
        <!--header-->
        <div class="main-content">
            <p class="errorParagraph">
                HTTP: <span>${requestScope["javax.servlet.error.status_code"]}</span>
            </p>
            <div class="code-block">
                <code>
                    <%
                        if(exception != null){
                    %>
                            <span>this_page</span>.<em>there_is_<%=exception.getClass().getSimpleName()%></em> = true;
                    <%
                        }
                        else{
                    %>
                            <span>this_page</span>.<em>not_found_or_some_client_error</em> = true;
                    <%
                        }
                    %>
                </code>
                <code>
                    <span>if</span>(<b>you_did_something_wrong_or_not_allowed</b>) {<span>try_again()</span>;}
                </code>
                <code>
                    <span>else if(<b>we_screwed_up</b>)</span> {<em>alert</em>(<i>"We're really sorry about that."</i>); <span>window</span>.<em>location</em> = home;}
                </code>
                <code>
                    <%
                        if(exception != null){
                    %>
                            <span>console</span>.<em>log</em>(<i>"Here's some info: \n<%=exception.getMessage()%>"</i>);
                    <%
                        }
                    %>
                </code>
            </div>
            <div class="home-link">
                <a href="index.html">HOME</a>
            </div>
        </div>
        <%@include file="footer.jsp"%> <!--footer-->
    </body>
</html>
