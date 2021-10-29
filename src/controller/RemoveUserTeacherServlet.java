package controller;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;

@WebServlet("/removeUserTeacher-servlet")
public class RemoveUserTeacherServlet extends HttpServlet{

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
            ed.doDeleteByUsernameIdCourse(studentName, courseId);
            responseObject.addProperty("removed", true);
            responseObject.addProperty("type", "success");
            responseObject.addProperty("msg", "Remove completed successfully");
            responseObject.addProperty("studentName", studentName);
        }
        else{
            responseObject.addProperty("removed", false);
            responseObject.addProperty("type", "error");
            responseObject.addProperty("msg", "Remove failed");
        }
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}
