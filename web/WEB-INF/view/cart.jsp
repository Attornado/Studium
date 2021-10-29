<%@ page import="model.*"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
    <head>
        <title>Cart</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css" type="text/css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/cart.css" type="text/css">
        <meta name="viewport" content="initial-scale=1, width=device-width">
        <%@include file="header.jsp"%> <!--header-->
    </head>
    <body class="cart">
        <br>
        <h1 style="visibility: hidden">
            hidden content
        </h1>
        <div id="content">
            <div class="shopping-cart">
                <div class="title">
                    <div class="titleText">Cart</div>
                </div>
                <%
                    if(session.getAttribute("cart") == null || ((Cart)session.getAttribute("cart")).isEmpty()){
                %>
                        <h5 class="substitutionText">Sorry, your cart is empty :(</h5>
                <%
                    }
                    else{
                        Cart cart = (Cart)session.getAttribute("cart");
                        ArrayList<String> courseNames = cart.getNameList();
                        pageContext.setAttribute("cartItems", new ArrayList<Course>());
                        for(String name : courseNames){
                            Course c = cart.getCourse(name);
                            ((ArrayList<Course>)pageContext.getAttribute("cartItems")).add(c);
                %>
                            <div class="cartItem" id="cartItem<%=c.getId()%>">
                                <div class="buttonsContainer">
                                    <form action="remove-cart-async" class="delete-btn-form">
                                        <input type="hidden" name="removeCart" value="removeCart">
                                        <input type="hidden" class="courseId" name="courseId" value="<%=c.getId()%>">
                                        <button class="delete-btn" type="submit">&#10007;</button>
                                    </form>
                                </div>
                                <div class="imageContainer">
                                    <a href="show-course?courseId=<%=c.getId()%>" target="_blank">
                                        <img alt="No image, sorry :(" src="${pageContext.request.contextPath}/resources/images/courseImages/<%=c.getImagePath()%>">
                                    </a>
                                </div>
                                <div class="genericInfo">
                                    <span class="name">
                                        <a href="show-course?courseId=<%=c.getId()%>" target="_blank">
                                            <%=c.getName()%>
                                        </a>,
                                    </span>
                                    <span class="category">
                                        <a href="show-category-courses?categoryName=<%=c.getCategory()%>" target="_blank">
                                            <%=c.getCategory()%>
                                        </a>
                                    </span>
                                    <span class="startDate">Starts: <%=c.getStartDate()%></span>
                                    <span class="endDate">Ends: <%=c.getEndDate()%></span>
                                </div>
                                <div class="price">
                                    <span>
                                        <%=(new DecimalFormat("#.##")).format(c.getPrice()).replaceAll(",", ".")%>$
                                    </span>
                                </div>
                            </div>
                <%
                        }
                %>
                        <div id="purchaseFormContainer">
                            <div class="total-price">
                                Total:
                                <span class="number">
                                    <%=(new DecimalFormat("#.##")).format(cart.getTotalPrice()).replaceAll(",", ".")%>$
                                </span>
                            </div>
                            <form action="purchase-items" method="post">
                                <c:forEach items="${cartItems}" var="course">
                                    <input id="course${course.id}PurchaseInput" type="hidden" name="courseId" value="${course.id}">
                                </c:forEach>
                                <button type="submit" class="purchaseButton">
                                    <i class="fa fa-credit-card"></i> Purchase
                                </button>
                            </form>
                        </div>
                <%
                    }
                %>
            </div>
        </div>
        <%@include file="footer.jsp"%> <!--footer-->
        <script src="${pageContext.request.contextPath}/js/utility.js"></script>
        <script src="${pageContext.request.contextPath}/js/cart.js"></script>
        <%
            if(request.getAttribute("errorUserNotLogged") != null){%>
        <script>
            $(document).ready(function () {
                showPopupMessage("error", "${errorUserNotLogged}", 8);
            });
        </script>
        <%
        }
        else if(request.getAttribute("purchasedJsonObject") != null){
        %>
        <script>
            $(document).ready(function () {
                let message = "purchase completed! You just bought the courses: \n", purchasedJsonObject;
                purchasedJsonObject = JSON.parse('${purchasedJsonObject}');
                for(let courseName of purchasedJsonObject.itemsNameList){
                    message += courseName + ", ";
                }
                message += "and you just spent " + purchasedJsonObject.purchasedTotalPrice + "$.";
                showPopupMessage("success", message, 8);
            });
        </script>
        <%
            }
        %>
    </body>
</html>
