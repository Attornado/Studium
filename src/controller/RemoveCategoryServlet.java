package controller;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

@WebServlet(urlPatterns = {"/removeCategory", "/remove-category"})
public class RemoveCategoryServlet extends HttpServlet{

    public static final int NAME_CATEGORY_MAX_LENGTH = 50, NAME_CATEGORY_MIN_LENGTH = 3;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        CategoryDAO cd = new CategoryDAO();
        Category c;
        JsonObject responseObject = new JsonObject();
        String categoryName = req.getParameter("categoryName");
        if(req.getParameter("categoryName") != null){
            if(req.getParameter("categoryName").length() <= NAME_CATEGORY_MAX_LENGTH &&
                    req.getParameter("categoryName").length() >= NAME_CATEGORY_MIN_LENGTH &&
                    req.getParameter("categoryName").matches(AddCategoryServlet.NAME_REGEX)){
                c = cd.doRetrieveByName(categoryName);

                if(c != null){
                    cd.doDeleteByName(c.getName());
                    ServletContext context = getServletContext();
                    HashMap<String, Category> categories;
                    categories = (HashMap<String, Category>) context.getAttribute("categories");
                    ArrayList<Category> categoryList = (ArrayList<Category>) context.getAttribute("categoryList");
                    synchronized(context){
                        categories.remove(c.getName(), c);
                        categoryList.remove(c);
                    }
                    responseObject.addProperty("removedCategoryName", c.getName());
                    responseObject.addProperty("type", "success");
                    responseObject.addProperty("msg", "category "+c.getName()+" removed successfully!");
                }
                else{
                    responseObject.addProperty("type", "error");
                    responseObject.addProperty("msg", "course " + categoryName + " doesn't exist!");
                }
            }
            else{
                responseObject.addProperty("type", "error");
                responseObject.addProperty("msg", "one or more of the parameters doesn't fit the crieteria!");
            }
            resp.getWriter().println(responseObject);
            resp.flushBuffer();
        }
        else{
            throw new MyServletException("\nError in the parameter passing: one of the parameters is null.\n");
        }
    }
}
