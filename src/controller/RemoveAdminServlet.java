package controller;
import com.google.gson.JsonObject;
import model.*;
import org.jetbrains.annotations.NotNull;

import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;

@WebServlet(urlPatterns = {"/removeAdmin-servlet", "/remove-admin"})
public class RemoveAdminServlet extends  HttpServlet{
    @NotNull
    public static final String USERNAME_REGEX = "^[A-Za-z0-9]{6,20}$";
    public static final int USERNAME_MAX_LENGTH = 20, USERNAME_MIN_LENGTH = 6;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        UserDAO ud = new UserDAO();
        User u;
        String adminUsername = req.getParameter("removeAdmin");
        JsonObject responseObject = new JsonObject();
        req.getSession();

        if(((User)req.getSession().getAttribute("loggedUser")).getUsername().equalsIgnoreCase(adminUsername))
            throw new MyServletException("Error: you are trying to remove yourself as an admin, that is not allowed!");

        if(adminUsername != null){
            if(adminUsername.length() >= USERNAME_MIN_LENGTH && adminUsername.length() <= USERNAME_MAX_LENGTH &&
                    adminUsername.matches(USERNAME_REGEX)){
                u = ud.doRetrieveByUsername(adminUsername);
                if(u != null){
                    if(!u.isRoot()){
                        responseObject.addProperty("type", "error");
                        responseObject.addProperty("msg", "user" + adminUsername +
                                " is not an admin and cannot be marked as non-admin!");
                    }
                    u.setRoot(false);
                    ud.doUpdate(u);
                    responseObject.addProperty("removedAdminName", adminUsername);
                    responseObject.addProperty("type", "success");
                    responseObject.addProperty("msg","user " + adminUsername +
                            " marked successfully as non-admin!");
                }
                else {
                    responseObject.addProperty("type", "error");
                    responseObject.addProperty("msg", "user " + adminUsername +
                            " doesn't exists, and cannot be marked as non-admin!");
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
            throw new MyServletException("\nError in the parameter passing: one of the parameters is null.\n");
        }
    }
}
