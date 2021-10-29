package controller;
import com.google.gson.*;
import model.*;
import org.jetbrains.annotations.NotNull;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.*;

@WebServlet(urlPatterns = {"/changeCourse", "/change-course", "/update-course", "/updateCourse"})
@MultipartConfig
public class UpdateCourse extends HttpServlet {

    public static final int NAME_COURSE_MAX_LENGTH = 50, NAME_COURSE_MIN_LENGTH = 3, DESCRIPTION_COURSE_MAX_LENGTH = 1000,
            DESCRIPTION_COURSE_MIN_LENGTH = 10, TEACHER_MAX_LENGTH = 20, TEACHER_MIN_LENGTH = 6, NAME_CATEGORY_MAX_LENGTH = 50,
            NAME_CATEGORY_MIN_LENGTH = 3;
    @NotNull
    public static final String TEACHER_REGEX = "^[A-Za-z0-9]{6,20}$";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        CourseDAO cd = new CourseDAO();
        String courseName = req.getParameter("courseName");
        String category = req.getParameter("category");
        String year = req.getParameter("year");
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");
        String price = req.getParameter("price");
        String description = req.getParameter("description");
        String teacher = req.getParameter("teacherUsername");
        String oldName = req.getParameter("oldName");
        Part image = req.getPart("course-image");
        Part certificate = req.getPart("certificate");
        JsonObject responseJson = new JsonObject();
        JsonObject courseJson, teacherJson;
        Gson gson = new Gson();
        Course oldCourse;

        if(courseName != null && category != null && year != null && startDate != null && endDate != null &&
                price != null && description != null && teacher != null){
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
                    price.matches("^\\d+([\\.,]\\d{1,2})?$") &&
                    price.length() <= AddCourseServlet.PRICE_MAX_LENGTH) {

                //controllo replicati
                Course check = cd.doRetrieveByName(courseName);
                if(check != null && !check.getName().equalsIgnoreCase(oldName)) {
                    oldCourse = cd.doRetrieveByName(oldName);
                    courseJson = JsonParser.parseString(gson.toJson(oldCourse)).getAsJsonObject();
                    courseJson.remove("teacher");
                    teacherJson = JsonParser.parseString(gson.toJson(oldCourse.getTeacher())).getAsJsonObject();
                    teacherJson.remove("passwordHash");
                    courseJson.add("teacher", teacherJson);
                    responseJson.add("updatedCourse", courseJson);
                    responseJson.addProperty("oldName", oldName);
                    responseJson.addProperty("type", "error");
                    responseJson.addProperty("message", "course " + courseName + " already " +
                            "exists, cannot update with this course name!");
                    resp.getWriter().println(responseJson);
                    resp.flushBuffer();
                }
                else {
                    //upload immagine
                    if(image != null) {
                        InputStream is_image = image.getInputStream();
                        BufferedInputStream bin_image = new BufferedInputStream(is_image);
                        FileOutputStream fos_image = new FileOutputStream(
                                new File("C:\\apache-tomcat-9.0.31\\webapps\\studium\\resources\\images\\courseImages" +
                                        File.separator,
                                        (courseName.toLowerCase().replace(" ", "-") + "-Image.jpg")));
                        /*FileOutputStream fos_image2 =
                                new FileOutputStream(new File("C:\\Users\\Roberto Esposito\\Desktop\\tsw" +
                                        "\\progettoTSWv0.1\\web\\resources\\images\\courseImages" + File.separator,
                                        (courseName.toLowerCase().replace(" ", "-") + "-Image.jpg")));*/
                        int ch_image = 0;
                        while ((ch_image = bin_image.read()) != -1) {
                            fos_image.write(ch_image);
                            //fos_image2.write(ch_image);
                        }
                        fos_image.flush();
                        //fos_image2.flush();
                        fos_image.close();
                        //fos_image2.close();
                        bin_image.close();
                    }

                    //upload certificate
                    if(certificate != null) {
                        InputStream is_certficate = certificate.getInputStream();
                        BufferedInputStream bin_certificate = new BufferedInputStream(is_certficate);
                        FileOutputStream fos_certificate = new FileOutputStream(
                                new File("C:\\apache-tomcat-9.0.31\\webapps\\studium\\resources\\courseCertificate" +
                                        File.separator,
                                        courseName.toLowerCase().replace(" ", "-") + "-Certificate.txt"));
                        /*FileOutputStream fos_certificate2 =
                                new FileOutputStream(new File("C:\\Users\\Roberto Esposito\\Desktop\\tsw" +
                                        "\\progettoTSWv0.1\\web\\resources\\courseCertificate" + File.separator,
                                        courseName.toLowerCase().replace(" ", "-") + "-Certificate.txt"));*/
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
                    }

                    //ulteriori controlli sul teacher e sulla categoria, e update del corso nel db
                    TeacherDAO td = new TeacherDAO();
                    Teacher t;
                    t = td.doRetrieveByUsername(teacher);
                    CategoryDAO catd = new CategoryDAO();
                    Category cat;
                    cat = catd.doRetrieveByName(category);
                    if (t != null && cat != null) {
                        Course c = cd.doRetrieveByName(oldName);
                        c.setName(courseName);
                        c.setCategory(category);
                        c.setYear(Integer.parseInt(year));
                        c.setStartDate(startDate);
                        c.setEndDate(endDate);
                        c.setPrice(Double.parseDouble(price));
                        c.setDescription(description);
                        c.setTeacher(t);
                        if(certificate != null)
                            c.setCertificate(courseName.toLowerCase().replace(" ", "-")
                                    + "-Certificate.txt");
                        if(image != null)
                            c.setImagePath((courseName.toLowerCase().replace(" ", "-")
                                    + "-Image.jpg"));
                        cd.doUpdate(c, oldName);

                        //creazione della risposta json
                        courseJson = JsonParser.parseString(gson.toJson(c)).getAsJsonObject();
                        courseJson.remove("teacher");
                        teacherJson = JsonParser.parseString(gson.toJson(c.getTeacher())).getAsJsonObject();
                        teacherJson.remove("passwordHash");
                        courseJson.add("teacher", teacherJson);
                        responseJson.add("updatedCourse", courseJson);
                        responseJson.addProperty("oldName", oldName);
                        responseJson.addProperty("type", "success");
                        responseJson.addProperty("message", "update completed successfully!");
                        resp.getWriter().println(responseJson.toString());
                        resp.flushBuffer();
                    }
                    else{
                        oldCourse = cd.doRetrieveByName(oldName);
                        courseJson = JsonParser.parseString(gson.toJson(oldCourse)).getAsJsonObject();
                        courseJson.remove("teacher");
                        teacherJson = JsonParser.parseString(gson.toJson(oldCourse.getTeacher())).getAsJsonObject();
                        teacherJson.remove("passwordHash");
                        courseJson.add("teacher", teacherJson);
                        responseJson.add("updatedCourse", courseJson);
                        responseJson.addProperty("oldName", oldName);
                        responseJson.addProperty("type", "error");
                        responseJson.addProperty("message", "either category " + category +
                                " or teacher " + teacher + " don't exist!");
                        resp.getWriter().println(responseJson);
                        resp.flushBuffer();
                    }
                }
            }
            else {
                throw new MyServletException("Error in the parameters: one of the arguments doesn't fit the criteria.");
            }
        }
        else {
            throw new MyServletException("Error in parameter request: parameters are null.");
        }
    }
}
