package controller;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.IOException;

@WebServlet(urlPatterns = {"/signup.html"})
public class ShowSignUpPageServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/view/signUp.jsp");
        if(req.getSession().getAttribute("loggedUser") != null){
            throw new MyServletException("Error: you are trying to enter the signup page while you're logged, " +
                    "logout and try again!");
        }
        req.setAttribute("sectionName", "login");
        rd.forward(req, resp);
    }
}
