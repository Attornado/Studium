package controller;
import model.*;
import org.jetbrains.annotations.NotNull;

import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import static javax.swing.JOptionPane.showMessageDialog;

@WebServlet("/login-servlet")
public class LoginServlet extends HttpServlet {

    public static final @NotNull String PASSWORD_REGEX = "^[^\\s]{8,30}$", USERNAME_REGEX = "^[A-Za-z0-9]{6,20}$";
    public static final int USERNAME_MAX_LENGTH = 20, USERNAME_MIN_LENGTH = 6;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		RequestDispatcher rd;
		String address;
		UserDAO ud = new UserDAO();
		TeacherDAO td = new TeacherDAO();
		CourseDAO cd = new CourseDAO();
		User u;
        Enrollment e;
		HttpSession session = req.getSession();
		Cart cart = (Cart)session.getAttribute("cart");
		EnrollmentDAO ed = new EnrollmentDAO();

        if(req.getParameter("login") != null){
            if(req.getParameter("username").length() < USERNAME_MIN_LENGTH ||
                    req.getParameter("username").length() > USERNAME_MAX_LENGTH ||
                    !req.getParameter("username").matches(USERNAME_REGEX) ||
                    !req.getParameter("password").matches(PASSWORD_REGEX))
                u = null;
            else {
                u = td.doRetrieveByUsernamePassword(req.getParameter("username"), req.getParameter("password"));
                if(u == null)
                    u = ud.doRetrieveByUsernamePassword(req.getParameter("username"), req.getParameter("password"));
            }
            if(u != null){
                synchronized(session){
                    session = req.getSession(true);
                    session.setAttribute("loggedUser", u);
                }
                address = req.getHeader("referer");
                if(address.contains("login") || address.trim().isEmpty()){
                    address = ".";
                    rd = req.getRequestDispatcher(address);
                    rd.forward(req, resp); //se l'utente si trova sulla pagina di login, lo reindirizziamo alla home
                }
                else
                    resp.sendRedirect(address); //altrimenti lo reindirizziamo alla pagina in cui era

                if(cart != null){ //svuotiamo il carrello di tutti i corsi che l'utente ha già acquistato
                    ArrayList<String> itemsNameList = cart.getNameList();
                    for(String itemName : itemsNameList)
                        if(ed.doRetrieveByUsernameIdCourse(u.getUsername(), cart.getCourse(itemName).getId()) != null)
                            cart.removeCourse(itemName);
                }
            }
            else{ //altrimenti se ha sbagliato credenziali lo reindirizziamo alla pagina di login se si trovava su di essa
                req.setAttribute("showCredentialError", "Errore: username o password errate");
                address = req.getHeader("referer");
                if(address.contains("login") || address.trim().isEmpty()){
                    rd = req.getRequestDispatcher("/WEB-INF/view/login.jsp");
                    req.setAttribute("sectionName", "login");
                    rd.forward(req, resp);
                }
                else
                    resp.sendRedirect(address); //altrimenti lo reindirizziamo alla pagina in cui era
            }
        }
        else{
            throw new MyServletException("Error: you passed the wrong parameters to the login resource!");
        }
    }
}
