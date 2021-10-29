package controller;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import model.Category;
import model.Course;
import model.CourseDAO;
import model.User;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/get-courses-teacher"})
public class GetCoursesTeacherServlet extends HttpServlet {
    public static final int COURSES_PER_REQUEST_DEFAULT = 4;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int startingIndex;
        HttpSession session = req.getSession(false);
        JsonObject responseObject = new JsonObject(), course;
        JsonArray newCourses = new JsonArray();
        try{
            startingIndex = Integer.parseInt(req.getParameter("startingIndex").trim());
        }
        catch (NumberFormatException e){
            throw new MyServletException("Error in the parameter");
        }
        if(session != null){
            CourseDAO cd = new CourseDAO();
            User u = (User) session.getAttribute("loggedUser");
            ArrayList<Course> courseList;
            if(u.isRoot())
                courseList = cd.doRetrieveAll();
            else
                courseList = cd.doRetrieveByTeacherFragment(u.getUsername(), startingIndex, COURSES_PER_REQUEST_DEFAULT);

            for(int i = startingIndex; i < courseList.size() && i < startingIndex+COURSES_PER_REQUEST_DEFAULT; i++){
                course = new JsonObject();
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
                newCourses.add(course);
            }
            responseObject.add("newCourses", newCourses);
            resp.getWriter().println(responseObject);
            resp.flushBuffer();
        }

    }




}
