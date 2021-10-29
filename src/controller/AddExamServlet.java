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

@WebServlet("/addExam-servlet")
@MultipartConfig
public class AddExamServlet extends HttpServlet{

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        String address;
        String examDate = req.getParameter("examDateAdd");
        String examHour = req.getParameter("examHourAdd");
        String examCourse = req.getParameter("examCourseAdd");
        String examClassroom = req.getParameter("examClassroomAdd");
        JsonObject responseObject = new JsonObject(), examJson;
        Gson gson = new Gson();

        if(examDate != null && examHour != null && examClassroom != null
            && examCourse != null){
            ExamDAO ed = new ExamDAO();
            Exam e = ed.doRetrieveById(examDate, examHour, Integer.parseInt(examCourse));
            if(e == null){
                CourseDAO cd = new CourseDAO();
                Course c = cd.doRetrieveById(Integer.parseInt(examCourse));
                e = new Exam(examDate, examHour, c, examClassroom);
                ed.doSave(e);
                responseObject.addProperty("added", true);
                responseObject.addProperty("examDate", examDate);
                responseObject.addProperty("examHour", examHour);
                responseObject.addProperty("examCourse", examCourse);
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
