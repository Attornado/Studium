package controller;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import model.*;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/get-more-admins"})
public class GetMoreAdminServlet extends HttpServlet{
    public static final int ADMINS_PER_REQUEST_DEFAULT=4;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        int startingIndex;
        JsonObject responseObject = new JsonObject(), admin;
        JsonArray newAdmins = new JsonArray();
        int adminsPerRequest = (req.getParameter("adminsPerRequest") != null)?
                (Integer.parseInt(req.getParameter("adminsPerRequest"))):(ADMINS_PER_REQUEST_DEFAULT);
        try{
            startingIndex = Integer.parseInt(req.getParameter("startingIndex").trim());
        }
        catch (NumberFormatException e){
            throw new MyServletException("Error in the parameters, admins number must be an integer");
        }
        UserDAO ud = new UserDAO();
        ArrayList<User> adminList;
        ArrayList<User> adminListFull = ud.doRetrieveAllAdmin();
        if(req.getParameter("search").equals("")){
            adminList = ud.doRetrieveAdminByUsernameFragment("%", startingIndex, adminsPerRequest);
        }
        else{
            adminList = ud.doRetrieveAdminByUsernameFragment(req.getParameter("search"), startingIndex, adminsPerRequest);
            adminListFull = ud.doRetrieveAdminByUsernameFragment(req.getParameter("search"), 0, adminListFull.size());
        }
        for(int i = 0; i < adminsPerRequest && i < adminList.size(); i++){
            admin = new JsonObject();
            admin.addProperty("username", adminList.get(i).getUsername());
            admin.addProperty("mail", adminList.get(i).getMail());
            admin.addProperty("name", adminList.get(i).getName());
            admin.addProperty("surname", adminList.get(i).getSurname());
            admin.addProperty("CF", adminList.get(i).getCF());
            newAdmins.add(admin);
        }
        responseObject.add("newAdmins", newAdmins);
        responseObject.addProperty("newMaxPages",
                Math.max(Math.ceil(adminListFull.size()/(double)adminsPerRequest), 1));
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}
