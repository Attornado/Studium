package controller;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.IOException;

@WebServlet(urlPatterns = {"/logout"})
public class LogoutServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String address = req.getHeader("referer"); //mandiamo un redirect alla stessa pagina in cui l'utente si trovava
        HttpSession session = req.getSession();

        synchronized (session){
            session.invalidate();
        }

        if(address == null || address.contains("/logout") || address.contains("/login") || address.trim().isEmpty() ||
                address.contains("show-admin-area") || address.contains("show-my-teachings") ||
                address.contains("reservedArea.html") || address.contains("show-teacher-area"))
            address = ".";
        resp.sendRedirect(address);
    }
}
