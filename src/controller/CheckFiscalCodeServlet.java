package controller;
import model.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.*;

@WebServlet("/check-fiscal-code")
public class CheckFiscalCodeServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String cf = req.getParameter("cf");
        UserDAO ud = new UserDAO();
        if(cf.matches("^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$") && ud.doRetrieveByCF(cf) == null)
            resp.getWriter().println("<ok/>");
        else
            resp.getWriter().println("<notOk/>");
        resp.flushBuffer();
    }
}
