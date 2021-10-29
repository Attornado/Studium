package controller;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;

@WebServlet(urlPatterns = {"/removeUser-servlet", "/remove-user"})
public class RemoveUserServlet extends HttpServlet {

    public static final int USERNAME_MAX_LENGTH = 20, USERNAME_MIN_LENGTH = 6;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        UserDAO ud = new UserDAO();
        User u;
        JsonObject responseObject = new JsonObject();
        if(req.getParameter("removeUser") != null){
            if(req.getParameter("removeUser").length() <= USERNAME_MAX_LENGTH && req.getParameter("removeUser").length() >= USERNAME_MIN_LENGTH){
                String username = req.getParameter("removeUser");
                u = ud.doRetrieveByUsername(username);
                if(u != null){
                    ud.doDeleteByUsername(username);
                    responseObject.addProperty("removedUsername", username);
                    responseObject.addProperty("type", "success");
                    responseObject.addProperty("msg", "user " + username + " successfully removed.");
                }
                else{
                    responseObject.addProperty("type", "error");
                    responseObject.addProperty("msg", "user " + username +
                            " doesn't exists and cannot be removed.");
                }
            }
            else{
                responseObject.addProperty("type", "error");
                responseObject.addProperty("msg", "one or more of the parameters don't fit the criteria!");
            }
            resp.getWriter().println(responseObject);
            resp.flushBuffer();
        }
        else{
            throw new MyServletException("\nError in the parameter passing: one of the parameters is null.");
        }
    }
}
