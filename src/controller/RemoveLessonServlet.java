package controller;
import com.google.gson.JsonObject;
import model.*;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import javax.swing.*;
import java.io.IOException;

@WebServlet("/removeLesson-servlet")
public class RemoveLessonServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        LessonDAO ld = new LessonDAO();
        String lessonDate = req.getParameter("lessonDate");
        String lessonHour = req.getParameter("lessonHour");
        int lessonCourse = Integer.parseInt(req.getParameter("lessonCourse"));
        JsonObject responseObject = new JsonObject();
        if(lessonDate != null && lessonHour != null){
            ld.doDeleteById(lessonDate, lessonHour, lessonCourse);
            responseObject.addProperty("removed", true);
            responseObject.addProperty("type", "success");
            responseObject.addProperty("msg", "Remove completed successfully");
            responseObject.addProperty("lessonDate", lessonDate);
            responseObject.addProperty("lessonHour", lessonHour);
            responseObject.addProperty("lessonCourse", lessonCourse);
            responseObject.addProperty("lessonSize", ld.doRetrieveByIdCourse(lessonCourse).size());
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
