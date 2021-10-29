package controller;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import javax.servlet.*;
import java.sql.*;
import java.util.*;

@WebServlet(urlPatterns = {"/init-category"}, loadOnStartup = 0)
public class InitCategory extends HttpServlet {

    @Override
    public void init() throws ServletException {
        ServletContext context = this.getServletContext();
        CategoryDAO cd = new CategoryDAO();
        HashMap<String, Category> categories = new HashMap<>();
        ArrayList<Category> categoryList = new ArrayList<>();
        try {
            categoryList = cd.doRetrieveAll();
            categoryList.sort(Comparator.comparing(Category::getName));
            for(Category c : categoryList)
                categories.put(c.getName(), c);
        }
        catch(SQLException e) {
            categories = null;
            e.printStackTrace();
        }
        synchronized(context){
            context.setAttribute("categories", categories);
            if(categories != null) //manteniamo la lista, ordinata, per non ricalcolarla ogni volta
                context.setAttribute("categoryList", categoryList);
        }
        super.init();
    }
}
