package controller;
import model.*;
import org.jetbrains.annotations.NotNull;

import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import java.io.*;
import java.util.*;

@WebServlet(urlPatterns = {"/signup-servlet"})
public class SignUpServlet extends HttpServlet {
    public static final @NotNull String USERNAME_REGEX = LoginServlet.USERNAME_REGEX,
            PASSWORD_REGEX = LoginServlet.PASSWORD_REGEX, MAIL_REGEX = "^[a-zA-Z][\\w\\.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z]\\w+\\.)+[a-z]{2,5}$",
            NAME_REGEX = "^(([A-Z][a-z]*([-'\\s\\.]))*([A-Z][a-z]*))$",
            CF_REGEX = "^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$",
            STREET_REGEX = "^(((Via|Contrada|Piazza|Vicolo|Corso|Viale|Piazzale)\\s)?(([A-Z]?[a-z0-9]*([-'\\.\\s]))*([A-Z]?[a-z0-9]+)))$",
            NUMBER_REGEX = "^([0-9]+[a-zA-Z]*)$", CITY_NAME_REGEX = "^(([A-Z][a-z]*([-'\\.\\s]))*([A-Z]?[a-z]+))$",
            CAP_REGEX = "^([0-9]){5}$", TELEPHONE_REGEX = "(([+]|00)39)?((3[0-9]{2})(\\d{7}))$";
    public static final int USERNAME_MIN = LoginServlet.USERNAME_MIN_LENGTH,
            USERNAME_MAX = LoginServlet.USERNAME_MAX_LENGTH, MAIL_MAX = 40, NAME_MIN = 2, NAME_MAX = 30,
            STREET_MIN = 4, STREET_MAX = 50, NUMBER_MIN = 1, NUMBER_MAX = 5, CITY_MIN = 2, CITY_MAX = 25;
    public static final String @NotNull[] PROVINCES = {"AG", "AL", "AN", "AO", "AQ", "AR", "AP", "AT", "AV", "BA", "BT",
            "BL", "BN", "BG", "BI", "BO", "BZ", "BS", "BR", "CA", "CL", "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS",
            "CR", "KR", "CN", "EN", "FM","FE", "FI", "FG", "FC", "FR", "GE", "GO", "GR", "IM", "IS", "SP", "LT", "LE",
            "LC", "LI", "LO", "LU", "MC", "MN","MS", "MT", "VS", "ME", "MI", "MO", "MB", "NA", "NO", "NU", "OG", "OT",
            "OR", "PD", "PA", "PR", "PV", "PG", "PU","PE", "PC", "PI", "PT", "PN", "PZ", "PO", "RG", "RA", "RC", "RE",
            "RI", "RN", "RM", "RO", "SA", "SS", "SV", "SI","SR", "SO", "TA", "TE", "TR", "TO", "TP", "TN", "TV", "TS",
            "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT"};

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RequestDispatcher rd;
        String address = ".";
        UserDAO ud = new UserDAO();
        HttpSession session = req.getSession();
        if(req.getParameter("username") == null || req.getParameter("username") == null ||
                req.getParameter("password") == null || req.getParameter("mail") == null ||
                req.getParameter("firstName") == null || req.getParameter("surname") == null ||
                req.getParameter("CF") == null || req.getParameter("birthdate") == null ||
                req.getParameter("street") == null || req.getParameter("province") == null ||
                req.getParameter("number") == null || req.getParameter("city") == null ||
                req.getParameter("telephone") == null || req.getParameter("CAP") == null){

            req.setAttribute("showCredentialError", "Errore: credenziali di registrazione vuote.");
            req.setAttribute("sectionName", "login");
            address = "/WEB-INF/view/signUp.jsp";
        }
        else {
            User u = new User(req.getParameter("username"), req.getParameter("password"),
                    req.getParameter("mail"), req.getParameter("firstName"), req.getParameter("surname"),
                    req.getParameter("CF"), req.getParameter("birthdate"), req.getParameter("street"),
                    req.getParameter("province"), req.getParameter("number"), req.getParameter("city"),
                    req.getParameter("telephone"), Integer.parseInt(req.getParameter("CAP")),
                    false); //di default, l'utente non è amministratore

            if(!u.getUsername().matches(USERNAME_REGEX) || !req.getParameter("password").matches(PASSWORD_REGEX) ||
                    !u.getMail().matches(MAIL_REGEX) || !u.getName().matches(NAME_REGEX) ||
                    !u.getSurname().matches(NAME_REGEX) || !u.getCF().matches(CF_REGEX) ||
                    !u.getCity().matches(CITY_NAME_REGEX) || !u.getNumber().matches(NUMBER_REGEX) ||
                    !u.getStreet().matches(STREET_REGEX) || !req.getParameter("CAP").matches(CAP_REGEX) ||
                    !u.getTelephone().matches(TELEPHONE_REGEX) ||
                    !(Arrays.asList(PROVINCES)).contains(u.getProvince()) || u.getMail().length() > MAIL_MAX ||
                    u.getUsername().length() < USERNAME_MIN || u.getUsername().length() > USERNAME_MAX ||
                    u.getMail().length() > 40 || u.getName().length() > NAME_MAX || u.getName().length() < NAME_MIN ||
                    u.getSurname().length() < NAME_MIN || u.getSurname().length() > NAME_MAX ||
                    u.getStreet().length() > STREET_MAX || u.getStreet().length() < STREET_MIN ||
                    u.getNumber().length() > NUMBER_MAX || u.getNumber().length() < NUMBER_MIN ||
                    u.getCity().length() < CITY_MIN || u.getCity().length() > CITY_MAX) {
                req.setAttribute("showCredentialError", "Errore: credenziali di registrazione errate.");
                req.setAttribute("sectionName", "login");
                address = "/WEB-INF/view/signUp.jsp";
            }
            else {
                try {
                    ud.doSave(u);
                }
                catch (Exception e) {
                    req.setAttribute("showCredentialError", "Errore: utente già esistente.");
                    req.setAttribute("sectionName", "login");
                    address = "/WEB-INF/view/signUp.jsp";
                }
                synchronized (session) {
                    session = req.getSession();
                    session.setAttribute("loggedUser", u);
                }
            }
        }
        rd = req.getRequestDispatcher(address);
        rd.forward(req, resp);
    }
}
