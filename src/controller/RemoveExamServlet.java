package controller;
import com.google.gson.JsonObject;
import model.*;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;

@WebServlet("/removeExam-servlet")
public class RemoveExamServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        ExamDAO ed = new ExamDAO();
        String ExamDate = req.getParameter("examDate");
        String ExamHour = req.getParameter("examHour");
        int ExamCourse = Integer.parseInt(req.getParameter("examCourse"));
        JsonObject responseObject = new JsonObject();
        if(ExamDate != null && ExamHour != null){
            ed.doDeleteById(ExamDate, ExamHour, ExamCourse);
            responseObject.addProperty("removed", true);
            responseObject.addProperty("type", "success");
            responseObject.addProperty("msg", "Remove completed successfully");
            responseObject.addProperty("examDate", ExamDate);
            responseObject.addProperty("examHour", ExamHour);
            responseObject.addProperty("examCourse", ExamCourse);
            responseObject.addProperty("examSize", ed.doRetrieveByIdCourse(ExamCourse).size());
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
