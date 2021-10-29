package controller;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import model.Category;
import model.Course;
import model.CourseDAO;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/get-more-courses"})
public class GetMoreCoursesServlet extends HttpServlet{
    public static final int COURSES_PER_REQUEST_DEFAULT = 4;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        int startingIndex;
        JsonObject responseObject = new JsonObject(), course, teacher;
        JsonArray newCourses = new JsonArray();
        Gson gson = new Gson();
        int coursesPerRequest = (req.getParameter("coursesPerRequest") != null)?
                (Integer.parseInt(req.getParameter("coursesPerRequest"))):(COURSES_PER_REQUEST_DEFAULT);
        try{
            startingIndex = Integer.parseInt(req.getParameter("startingIndex").trim());
        }
        catch (NumberFormatException e){
            throw new MyServletException("Error in the parameters, course number must be an integer");
        }
        CourseDAO cd = new CourseDAO();
        ArrayList<Course> courseList;
        ArrayList<Course> courseListFull = cd.doRetrieveAll();
        //gestione della ricerca dei corsi con filtri

        if(req.getParameter("maxPrice") != null && req.getParameter("orderType") != null){
            //se i filtri non sono nulli, e l'utente ha selezionat la ricerca nella descrizione cerchiamo in questa
            if(req.getParameter("searchDesc").equalsIgnoreCase("true")) {
                courseList = cd.doRetrieveByDescriptionFragmentFilters(req.getParameter("search"),
                        Integer.parseInt(req.getParameter("maxPrice")), startingIndex, coursesPerRequest,
                        req.getParameter("orderType")
                );
                courseListFull = cd.doRetrieveByDescriptionFragmentFilters(req.getParameter("search"),
                        Integer.parseInt(req.getParameter("maxPrice")), 0, courseListFull.size(),
                        req.getParameter("orderType")
                );
            }
            //se i filtri non sono nulli, e l'utente ha selezionato la ricerca nel nome del corso, cerchiamo in questo
            else {
                courseList = cd.doRetrieveByNameFragmentFilters(
                        req.getParameter("search"), Integer.parseInt(req.getParameter("maxPrice")),
                        startingIndex, coursesPerRequest, req.getParameter("orderType")
                );
                courseListFull = cd.doRetrieveByNameFragmentFilters(
                        req.getParameter("search"), Integer.parseInt(req.getParameter("maxPrice")), 0,
                        courseListFull.size(), req.getParameter("orderType")
                );
            }
        }
        else if(req.getParameter("search").equals("")){
                courseList = cd.doRetrieveByNameFragment("%", startingIndex, coursesPerRequest);
        }
        else{
            courseList = cd.doRetrieveByNameFragment(req.getParameter("search"), startingIndex, coursesPerRequest);
            courseListFull = cd.doRetrieveByNameFragment(req.getParameter("search"), 0, courseListFull.size());
        }
        for(int i = 0; i < coursesPerRequest && i < courseList.size(); i++){
            course = new JsonObject();
            teacher = JsonParser.parseString(gson.toJson(courseList.get(i).getTeacher())).getAsJsonObject();
            teacher.remove("passwordHash");
            course.addProperty("id", courseList.get(i).getId());
            course.addProperty("name", courseList.get(i).getName());
            course.addProperty("category", courseList.get(i).getCategory());
            course.addProperty("year", courseList.get(i).getYear());
            course.addProperty("startDate", courseList.get(i).getStartDate());
            course.addProperty("endDate", courseList.get(i).getEndDate());
            course.addProperty("price", courseList.get(i).getPrice());
            course.addProperty("numEnrolled", courseList.get(i).getNumEnrolled());
            course.addProperty("teacher", courseList.get(i).getTeacher().getUsername());
            course.addProperty("description", courseList.get(i).getDescription());
            course.addProperty("imagePath", courseList.get(i).getImagePath());
            course.addProperty("certificate", courseList.get(i).getCertificate());
            course.add("teacher", teacher);
            newCourses.add(course);
        }
        responseObject.add("newCourses", newCourses);
        responseObject.addProperty("newMaxPages",
                Math.max(Math.ceil(courseListFull.size()/(double)coursesPerRequest), 1));
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}
