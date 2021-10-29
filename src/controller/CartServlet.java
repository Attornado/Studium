package controller;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
import java.text.*;
import com.google.gson.*;

@WebServlet(urlPatterns = {"/add-cart", "/remove-cart", "/show-cart", "/add-cart-async", "/remove-cart-async"})
public class CartServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RequestDispatcher rd;
        String address;
        int id; //magari sostituire con courseName
        boolean flagSuccess = true;
        CourseDAO cd = new CourseDAO();
        Course c;
        Cart cart;
        JsonObject responseJson = new JsonObject();
        EnrollmentDAO ed = new EnrollmentDAO();
        HttpSession session = req.getSession();
        User loggedUser = (User)session.getAttribute("loggedUser");
        cart = (Cart)session.getAttribute("cart");

        if(cart == null){
            cart = new Cart();
            synchronized(session){
                session.setAttribute("cart", cart);
            }
        }

        if(req.getParameter("addCart") != null) {
            id = Integer.parseInt(req.getParameter("courseId"));
            c = cd.doRetrieveById(id);
            if(c != null){
                if(loggedUser != null) {
                    if (ed.doRetrieveByUsernameIdCourse(loggedUser.getUsername(), id) != null)
                        flagSuccess = false;
                    else {
                        synchronized (session) {
                            if (!cart.addCourse(c))
                                flagSuccess = false;
                        }
                    }
                }
                else{
                    synchronized (session) {
                        if (!cart.addCourse(c))
                            flagSuccess = false;
                    }
                }
            }
        }

        else if(req.getParameter("removeCart") != null){
            id = Integer.parseInt(req.getParameter("courseId"));
            synchronized(session){
                if(!cart.removeCourse(id))
                    flagSuccess = false;
            }
        }

        //se la richiesta è asincrona gestiamola scrivendo direttamente sulla risposta
        if(req.getParameter("async") != null){
            //se è una richiesta di aggiunta scriviamo un messaggio di feedback in JSON
            if(flagSuccess && req.getParameter("addCart") != null) {
                responseJson.addProperty("type", "success");
                responseJson.addProperty("message", "item added successfully to the cart!");
            }
            else if(!flagSuccess && req.getParameter("addCart") != null){
                responseJson.addProperty("type", "error");
                responseJson.addProperty("message", "item could not be added to the cart, " +
                        "probably because you already have that item in the cart or you have already purchased" +
                        " this course!");
            }
            else if(flagSuccess && req.getParameter("removeCart") != null){
                responseJson.addProperty("type", "success");
                responseJson.addProperty("message", "item removed successfully from the cart!");
                responseJson.addProperty("newTotalPrice",
                        (new DecimalFormat("#.##")).format(cart.getTotalPrice()).replace(",", "."));
            }
            else{
                responseJson.addProperty("type", "error");
                responseJson.addProperty("message", "item could not be removed from the cart!");
            }
            resp.getWriter().println(responseJson.toString());
            resp.flushBuffer();
        }

        else if(req.getParameter("showCart") != null ||
                (req.getParameter("removeCart") != null && req.getParameter("async") == null)) {
            address = "/WEB-INF/view/cart.jsp";
            req.setAttribute("sectionName", "cart");
            rd = req.getRequestDispatcher(address);
            rd.forward(req, resp);
        }

        else{
            address = req.getHeader("referer"); //mandiamo un redirect alla stessa pagina in cui l'utente si trovava
            if(address == null || address.contains("/show-cart") || address.trim().isEmpty()) //non dovrebbe essere possibile
                address = ".";
            resp.sendRedirect(address);
        }
    }
}
