package controller;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;

@WebServlet(urlPatterns = {"/changeCategory", "/change-category", "/update-category", "/updateCategory"})
@MultipartConfig
public class UpdateCategory extends HttpServlet {

    public static final String TYPE_IMAGE_REGEX[] = {".jpg", ".jpeg"};
    public static final int NAME_CATEGORY_MAX_LENGTH = 50, NAME_CATEGORY_MIN_LENGTH = 3,
            DESCRIPTION_CATEGORY_MAX_LENGTH = 1000, DESCRIPTION_CATEGORY_MIN_LENGTH = 10;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        CategoryDAO cd = new CategoryDAO();
        Category c;
        String categoryName = req.getParameter("editable-name");
        String description = req.getParameter("editable-description");
        Part category_image = req.getPart("fileCategory");

        if(categoryName != null && description != null){
            categoryName = categoryName.trim();
            description = description.trim();
            if(categoryName.length() >= NAME_CATEGORY_MIN_LENGTH && categoryName.length() <= NAME_CATEGORY_MAX_LENGTH &&
                    description.length() >= DESCRIPTION_CATEGORY_MIN_LENGTH &&
                    description.length() <= DESCRIPTION_CATEGORY_MAX_LENGTH &&
                    categoryName.matches(AddCategoryServlet.NAME_REGEX)){

                if(category_image != null) { //se la nuova immagine esiste sovrascriviamo quella vecchia
                    InputStream is = category_image.getInputStream();
                    BufferedInputStream bin = new BufferedInputStream(is);
                    FileOutputStream fos = new FileOutputStream(
                            new File("C:\\apache-tomcat-9.0.31\\webapps\\studium\\resources\\images\\categoryImages"+
                                    File.separator, categoryName.toLowerCase().replace(" ", "-")
                                    + "-Image.jpg"));
                    /*FileOutputStream fos2 = new FileOutputStream(
                            new File("C:\\Users\\Roberto Esposito\\Desktop\\tsw" +
                                    "\\progettoTSWv0.1\\web\\resources\\images\\categoryImages" + File.separator,
                                    categoryName.toLowerCase().replace(" ", "-") + "-Image.jpg"));*/
                    int ch = 0;
                    while ((ch = bin.read()) != -1) {
                        fos.write(ch);
                        //fos2.write(ch);
                    }
                    fos.flush();
                    //fos2.flush();
                    fos.close();
                    //fos2.close();
                    bin.close();
                }

                String oldName = req.getParameter("old-name");
                ServletContext context = getServletContext();
                HashMap<String, Category> categories;
                categories = (HashMap<String, Category>) context.getAttribute("categories");
                c = categories.get(oldName);
                Category check = categories.get(categoryName);
                JsonObject responseCategory = new JsonObject();
                JsonObject responseJson = new JsonObject();

                //se già esiste un'altra categoria con quel nome restituiamo errore e ritornaimo la vecchia categoria
                if(check != null && !check.equals(c)){
                    responseJson.addProperty("type", "error");
                    responseJson.addProperty("message", "category " + categoryName + " already exists!");
                    responseCategory.addProperty("name", c.getName());
                    responseCategory.addProperty("description", c.getDescription());
                    responseCategory.addProperty("imagePath", c.getImagePath());
                }
                else{ //altrimenti aggiorniamola nel context e nel db, e scriviamo quella aggiornata nella risposta json
                    synchronized(context){
                        c.setName(categoryName);
                        c.setDescription(description);
                        if(category_image != null) //se c'è una nuova immagine aggiorniamo l'imagePath
                            c.setImagePath(categoryName.toLowerCase().replace(" ", "-")+"-Image.jpg");
                        categories.remove(oldName);
                        categories.put(categoryName, c);
                    }
                    cd.doUpdateByName(c, oldName);
                    responseJson.addProperty("type", "success");
                    responseJson.addProperty("message", "update completed successfully!");
                    responseCategory.addProperty("name", c.getName());
                    responseCategory.addProperty("description", c.getDescription());
                    responseCategory.addProperty("imagePath", c.getImagePath());
                }

                //scriviamo quindi nell'oggetto json di risposta il vecchio nome della categoria e l'oggetto categoria
                responseJson.addProperty("oldName", oldName);
                responseJson.add("updatedCategory", responseCategory);
                resp.getWriter().println(responseJson.toString());
                resp.flushBuffer();
            }
            else //se uno dei parametri è null o non è stato passato correttamente, lanciamo un'eccezione
                throw new MyServletException("error in the request parameters: exceeded maximum or minimum text length.");
        }
        else {
            throw new MyServletException("error in the request parameters: null parameters.");
        }
    }
}
