package controller;
import com.google.gson.*;
import model.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/purchase-items", "/purchase-courses" })
public class PurchaseCoursesServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        RequestDispatcher rd;
        String address = "/WEB-INF/view/cart.jsp";;
        HttpSession session = req.getSession();
        Cart cart = (Cart)session.getAttribute("cart");
        JsonObject purchasedJsonObject = new JsonObject();
        JsonArray nameListJson = new JsonArray();
        ArrayList<String> itemsNameList;
        String totalPrice;
        EnrollmentDAO enrollmentDAO = new EnrollmentDAO();
        Enrollment enrollment;
        User loggedUser = (User)session.getAttribute("loggedUser");
        if(loggedUser == null){
            req.setAttribute("errorUserNotLogged",
                    "you cannot purchase items while not logged, login or signup!");
        }
        else if(cart != null){
            itemsNameList = cart.getNameList();
            for(String name : itemsNameList) {
                enrollment = new Enrollment(loggedUser.getUsername(), cart.getCourse(name).getId());
                enrollmentDAO.doSave(enrollment);
                nameListJson.add(name);
            }
            totalPrice = (new DecimalFormat("#.##")).format(cart.empty()).replaceAll(",", ".");
            purchasedJsonObject.add("itemsNameList", nameListJson);
            purchasedJsonObject.addProperty("purchasedTotalPrice", totalPrice);
            req.setAttribute("purchasedJsonObject", purchasedJsonObject.toString());
        }
        req.setAttribute("sectionName", "cart");
        rd = req.getRequestDispatcher(address);
        rd.forward(req, resp);
    }
}
