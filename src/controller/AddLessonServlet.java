package controller;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;

@WebServlet("/addLesson-servlet")
@MultipartConfig
public class AddLessonServlet extends HttpServlet{

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        String address;
        String lessonDate = req.getParameter("lessonDateAdd");
        String lessonHour = req.getParameter("lessonHourAdd");
        String lessonCourse = req.getParameter("lessonCourseAdd");
        String lessonClassroom = req.getParameter("lessonClassroomAdd");
        JsonObject responseObject = new JsonObject(), lessonJson;
        Gson gson = new Gson();

        if(lessonDate != null && lessonHour != null && lessonClassroom != null
                && lessonCourse != null){
            LessonDAO ld = new LessonDAO();
            Lesson l = ld.doRetrieveById(lessonDate, lessonHour, Integer.parseInt(lessonCourse));
            if(l == null){
                CourseDAO cd = new CourseDAO();
                Course c = cd.doRetrieveById(Integer.parseInt(lessonCourse));
                l = new Lesson(lessonDate, lessonHour, c, lessonClassroom);
                ld.doSave(l);
                responseObject.addProperty("added", true);
                responseObject.addProperty("lessonDate", lessonDate);
                responseObject.addProperty("lessonHour", lessonHour);
                responseObject.addProperty("lessonCourse", lessonCourse);
                responseObject.addProperty("type", "success");
                responseObject.addProperty("msg", "Added successfully");
            }
            else{
                responseObject.addProperty("added", false);
                responseObject.addProperty("type", "error");
                responseObject.addProperty("msg", "Cannot be added, because it already exists!");
            }
            resp.getWriter().println(responseObject);
            resp.flushBuffer();
        }
        else{
            throw new MyServletException("Error in the parameter passing");
        }
    }
}
