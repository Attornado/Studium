package controller;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;

@WebServlet("/setPassedTeacher-servlet")
public class SetPassedTeacherServlet extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        EnrollmentDAO ed = new EnrollmentDAO();
        String studentName = req.getParameter("studentName");
        JsonObject responseObject = new JsonObject();
        int courseId = Integer.parseInt(req.getParameter("courseId"));
        if(studentName != null){
            Enrollment e = ed.doRetrieveByUsernameIdCourse(studentName, courseId);
            ed.doSetPassed(e, true);
            responseObject.addProperty("setPassed", true);
            responseObject.addProperty("type", "success");
            responseObject.addProperty("msg", "Set passed completed successfully");
            responseObject.addProperty("studentName", studentName);
        }
        else{
            responseObject.addProperty("setPassed", false);
            responseObject.addProperty("type", "error");
            responseObject.addProperty("msg", "Set passed failed");
        }
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}
