package controller;
import com.google.gson.*;
import model.*;
import org.jetbrains.annotations.NotNull;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import java.io.*;
import java.util.*;

@WebServlet(urlPatterns = {"/addCategory-servlet", "/add-category"})
@MultipartConfig
public class AddCategoryServlet extends HttpServlet{

    public static final int NAME_CATEGORY_MAX_LENGTH = 50, NAME_CATEGORY_MIN_LENGTH = 3,
            DESCRIPTION_CATEGORY_MAX_LENGTH = 1000, DESCRIPTION_CATEGORY_MIN_LENGTH = 10;
    public static final @NotNull String NAME_REGEX = "^(([A-Za-z][a-z0-9]*([-'\\s\\.]))*([A-Za-z0-9][A-Za-z0-9]*))$";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        String address;
        String categoryName = req.getParameter("categoryName");
        String description = req.getParameter("description_category");
        Part category_image = req.getPart("image_path");
        JsonObject responseObject = new JsonObject(), categoryJson;
        Gson gson = new Gson();

        if(categoryName != null && description != null && category_image != null){
            if(categoryName.length() >= NAME_CATEGORY_MIN_LENGTH && categoryName.length() <= NAME_CATEGORY_MAX_LENGTH &&
                    description.length() >= DESCRIPTION_CATEGORY_MIN_LENGTH &&
                    description.length() <= DESCRIPTION_CATEGORY_MAX_LENGTH && categoryName.matches(NAME_REGEX)){
                InputStream is = category_image.getInputStream();
                BufferedInputStream bin = new BufferedInputStream(is);
                FileOutputStream fos = new FileOutputStream(
                        new File("C:\\apache-tomcat-9.0.31\\webapps\\studium\\resources\\images\\categoryImages" +
                                File.separator,
                                categoryName.toLowerCase().replace(" ", "-")+"-Image.jpg"));
                FileOutputStream fos2 =
                        new FileOutputStream(new File("C:\\Users\\Roberto Esposito\\Desktop\\tsw" +
                                "\\progettoTSWv0.1\\web\\resources\\images\\categoryImages"+File.separator,
                                categoryName.toLowerCase().replace(" ", "-")+"-Image.jpg"));
                int ch = 0;
                while((ch = bin.read()) != -1){
                    fos.write(ch);
                    fos2.write(ch);
                }
                fos.flush();
                fos2.flush();
                fos.close();
                fos2.close();
                bin.close();

                CategoryDAO cd = new CategoryDAO();
                Category cat = new Category(categoryName, description,
                        categoryName.toLowerCase().replace(" ", "-")+"-Image.jpg");
                ServletContext context = this.getServletContext();
                HashMap<String, Category> categories;
                ArrayList<Category> categoryList = (ArrayList<Category>) context.getAttribute("categoryList");
                categories = (HashMap<String, Category>) context.getAttribute("categories");
                Category o;
                synchronized (context){
                    o = categories.put(cat.getName(), cat);
                }
                if(o != null){
                    categories.put(o.getName(), o);
                    responseObject.addProperty("type", "error");
                    responseObject.addProperty("msg", "category " + o.getName() +
                            " cannot be added, because it already exists!");
                }
                else{
                    synchronized (context) {
                        categoryList.add(cat);
                    }
                    cd.doSave(cat);
                    responseObject.addProperty("type", "success");
                    responseObject.addProperty("msg", "category " + categoryName + " added successfully!");
                }
            }
            else{
                responseObject.addProperty("type", "error");
                responseObject.addProperty("msg", "category " + categoryName +
                        " cannot be added, because some parameters don't fit the criteria!");
            }
            resp.getWriter().println(responseObject);
            resp.flushBuffer();
        }
        else{
            throw new MyServletException("\nError in the parameter passing: one of the parameters is null.\n");
        }
    }
}
