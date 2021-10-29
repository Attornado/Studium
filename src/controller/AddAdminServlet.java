package controller;

import com.google.gson.JsonObject;
import model.*;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import org.jetbrains.annotations.NotNull;
import  javax.servlet.*;
import java.io.IOException;

@WebServlet(urlPatterns = {"/addAdmin-servlet", "/add-admin"})
@MultipartConfig
public class AddAdminServlet extends HttpServlet {
    @NotNull
    public static final String USERNAME_REGEX = "^[A-Za-z0-9]{6,20}$";
    public static final int USERNAME_MAX_LENGTH = 20;
    public static final int USERNAME_MIN_LENGTH = 6;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        UserDAO ud = new UserDAO();
        User u;
        String adminUsername = req.getParameter("addAdmin");
        JsonObject responseObject = new JsonObject();

        if(adminUsername != null){
            if(adminUsername.length() >= USERNAME_MIN_LENGTH && adminUsername.length() <= USERNAME_MAX_LENGTH &&
                    adminUsername.matches(USERNAME_REGEX)){
                u = ud.doRetrieveByUsername(adminUsername);
                if(u != null){
                    if(u.isRoot()){
                        responseObject.addProperty("type", "error");
                        responseObject.addProperty("msg", "admin " + adminUsername +
                                " cannot be added, because it already exists!");
                    }
                    else{
                        u.setRoot(true);
                        ud.doUpdate(u);
                        responseObject.addProperty("type", "success");
                        responseObject.addProperty("msg","admin "+adminUsername+" added successfully!");
                    }
                }
                else{
                    responseObject.addProperty("type", "error");
                    responseObject.addProperty("msg", "user " + adminUsername +
                            " doesn't exists and cannot be marked as admin.");
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
