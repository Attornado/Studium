package controller;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import model.*;
import org.jetbrains.annotations.NotNull;

import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import java.io.*;

@WebServlet(urlPatterns = {"/addCourse-servlet", "/add-course"})
@MultipartConfig
public class AddCourseServlet extends HttpServlet {

    public static final int NAME_COURSE_MAX_LENGTH = 50, NAME_COURSE_MIN_LENGTH = 3, DESCRIPTION_COURSE_MAX_LENGTH = 1000,
     DESCRIPTION_COURSE_MIN_LENGTH = 10, TEACHER_MAX_LENGTH = 20, TEACHER_MIN_LENGTH = 6, NAME_CATEGORY_MAX_LENGTH = 50,
     NAME_CATEGORY_MIN_LENGTH = 3, PRICE_MAX_LENGTH = 20;
    public static final @NotNull String TEACHER_REGEX = "^[A-Za-z0-9]{6,20}$", PRICE_REGEX = "^\\d+([\\.,]\\d{1,2})?";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RequestDispatcher rd;
        String address;
        CourseDAO cd = new CourseDAO();
        String courseName = req.getParameter("courseName");
        String category = req.getParameter("category");
        String year = req.getParameter("year");
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");
        String price = req.getParameter("price");
        String description = req.getParameter("description");
        String teacher = req.getParameter("teacher");
        Part image = req.getPart("course-image");
        Part certificate = req.getPart("certificate");
        JsonObject responseObject = new JsonObject();


        if(courseName != null && category != null && year != null && startDate != null && endDate != null &&
                price != null && description != null && teacher != null && image != null && certificate != null){
            courseName = courseName.trim();
            category = category.trim();
            year = year.trim();
            startDate = startDate.trim();
            endDate = endDate.trim();
            price = price.trim();
            description = description.trim();
            teacher = teacher.trim();
            if(courseName.length() <= NAME_COURSE_MAX_LENGTH && courseName.length() >= NAME_COURSE_MIN_LENGTH &&
                    description.length() <= DESCRIPTION_COURSE_MAX_LENGTH &&
                    description.length() >= DESCRIPTION_COURSE_MIN_LENGTH &&
                    teacher.length() <= TEACHER_MAX_LENGTH && teacher.length() >= TEACHER_MIN_LENGTH &&
                    teacher.matches(TEACHER_REGEX) && category.length() <= NAME_CATEGORY_MAX_LENGTH &&
                    category.length() >= NAME_CATEGORY_MIN_LENGTH &&
                    courseName.matches(AddCategoryServlet.NAME_REGEX) && year.matches("^\\d{4}$") &&
                    price.matches("^\\d+([\\.,]\\d{1,2})?$") && price.length() <= PRICE_MAX_LENGTH) {

                //controllo replicati
                Course check = cd.doRetrieveByName(courseName);
                if(check != null) {
                    responseObject.addProperty("type", "error");
                    responseObject.addProperty("message", "course " + courseName + " already exists!");
                    resp.getWriter().println(responseObject);
                    resp.flushBuffer();
                }
                else {
                    //salvataggio immagini
                    InputStream is_image = image.getInputStream();
                    BufferedInputStream bin_image = new BufferedInputStream(is_image);
                    FileOutputStream fos_image = new FileOutputStream(
                            new File("C:\\apache-tomcat-9.0.31\\webapps\\studium\\resources\\images\\courseImages" +
                                    File.separator,
                                    (courseName.toLowerCase().replace(" ", "-")+"-Image.jpg")));
                    /*FileOutputStream fos_image2 =
                            new FileOutputStream(new File("C:\\Users\\Roberto Esposito\\Desktop\\tsw" +
                                    "\\progettoTSWv0.1\\web\\resources\\images\\courseImages" + File.separator,
                                    (courseName.toLowerCase().replace(" ", "-")+"-Image.jpg")));*/
                    int ch_image = 0;
                    while ((ch_image = bin_image.read()) != -1) {
                        fos_image.write(ch_image);
                        /*fos_image2.write(ch_image);*/
                    }
                    fos_image.flush();
                    //fos_image2.flush();
                    fos_image.close();
                    //fos_image2.close();
                    bin_image.close();

                    //salvataggio certificate
                    InputStream is_certficate = certificate.getInputStream();
                    BufferedInputStream bin_certificate = new BufferedInputStream(is_certficate);
                    FileOutputStream fos_certificate = new FileOutputStream(
                            new File("C:\\apache-tomcat-9.0.31\\webapps\\studium\\resources\\courseCertificate" +
                                    File.separator,
                                    courseName.toLowerCase().replace(" ", "-")+"-Certificate.txt"));
                    /*FileOutputStream fos_certificate2 =
                            new FileOutputStream(new File("C:\\Users\\Roberto Esposito\\Desktop\\tsw" +
                                    "\\progettoTSWv0.1\\web\\resources\\courseCertificate" + File.separator,
                                    courseName.toLowerCase().replace(" ", "-")+"-Certificate.txt"));*/
                    int ch_certificate = 0;
                    while ((ch_certificate = bin_certificate.read()) != -1) {
                        fos_certificate.write(ch_certificate);
                        //fos_certificate2.write(ch_certificate);
                    }
                    fos_certificate.flush();
                    //fos_certificate2.flush();
                    fos_certificate.close();
                    //fos_certificate2.close();
                    bin_certificate.close();

                    TeacherDAO td = new TeacherDAO();
                    Teacher t;
                    t = td.doRetrieveByUsername(teacher);
                    CategoryDAO catd = new CategoryDAO();
                    Category cat;
                    JsonObject courseJson, teacherJson;
                    Gson gson = new Gson();
                    cat = catd.doRetrieveByName(category);
                    if (t != null && cat != null) {
                        Course c = new Course(courseName, category, Integer.parseInt(year), startDate, endDate,
                                Double.parseDouble(price), description,
                                courseName.toLowerCase().replace(" ", "-")+"-Certificate.txt",
                                0, t,
                                (courseName.toLowerCase().replace(" ", "-")+"-Image.jpg"));
                        cd.doSave(c);
                        responseObject.addProperty("type", "success");
                        responseObject.addProperty("message", "course added successfully!");
                        courseJson = JsonParser.parseString(gson.toJson(c)).getAsJsonObject();
                        courseJson.remove("teacher");
                        teacherJson = JsonParser.parseString(gson.toJson(c.getTeacher())).getAsJsonObject();
                        teacherJson.remove("passwordHash");
                        courseJson.add("teacher", teacherJson);
                        responseObject.add("newCourse", courseJson);
                    }
                    else {
                        responseObject.addProperty("type", "error");
                        responseObject.addProperty("message", "course cannot be added because  specified" +
                                " teacher or the specified category doesn't exists!");
                    }
                    resp.getWriter().println(responseObject);
                    resp.flushBuffer();
                }
            }
            else{
                throw new MyServletException("Error in the parameter passing: one of the arguments doesn't fit the " +
                        "criteria.");
            }

        }
        else{
            throw new MyServletException("Error in the parameter passing: one of the arguments is null.");
        }
    }
}
