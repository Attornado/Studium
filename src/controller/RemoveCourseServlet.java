package controller;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;

@WebServlet(urlPatterns = {"/removeCourse-servlet", "/remove-course"})
public class RemoveCourseServlet  extends HttpServlet {

    public static final int NAME_COURSE_MAX_LENGTH = 50, NAME_COURSE_MIN_LENGTH = 3;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws  ServletException, IOException{
        CourseDAO cd = new CourseDAO();
        Course c;
        JsonObject responseObject = new JsonObject();
        if(req.getParameter("removeCourse") != null){
            if(req.getParameter("removeCourse").length() <= NAME_COURSE_MAX_LENGTH &&
                    req.getParameter("removeCourse").length() >= NAME_COURSE_MIN_LENGTH &&
                    req.getParameter("removeCourse").matches(AddCategoryServlet.NAME_REGEX)){
                String courseName = req.getParameter("removeCourse");
                c = cd.doRetrieveByName(courseName);
                if(c != null){
                    cd.doDeleteById(c.getId());
                    responseObject.addProperty("removedCourseName", c.getName());
                    responseObject.addProperty("type", "success");
                    responseObject.addProperty("msg", "course " + c.getName() + " removed successfully!");
                }
                else {
                    responseObject.addProperty("type", "error");
                    responseObject.addProperty("msg", "course " + courseName + " doesn't exist!");
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
            throw new MyServletException("\nError in the parameter passing: one of the parameters is null.");
        }
    }
}
