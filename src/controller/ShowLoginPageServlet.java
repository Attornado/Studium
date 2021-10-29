package controller;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.IOException;

@WebServlet(urlPatterns = {"/login.html"})
public class ShowLoginPageServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/view/login.jsp");

        if(req.getSession().getAttribute("loggedUser") != null){
            throw new MyServletException("Error: you are trying to enter the login page while you're logged, " +
                    "logout and try again!");
        }

        req.setAttribute("sectionName", "login");

        rd.forward(req, resp);
    }
}
