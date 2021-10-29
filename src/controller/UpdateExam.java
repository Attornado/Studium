package controller;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;

@WebServlet(urlPatterns = {"/changeExam"})
@MultipartConfig
public class UpdateExam extends HttpServlet{

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        ExamDAO ld = new ExamDAO();
        Exam l;
        String dateExamNew = req.getParameter("editable-dateExam");
        String hourExamNew = req.getParameter("editable-hourExam");
        String classroomExamNew = req.getParameter("editable-classroomExam");
        String dateExamOld = req.getParameter("oldDateExam");
        String hourExamOld = req.getParameter("oldHourExam");
        String classroomExamOld = req.getParameter("oldClassroomExam");
        int courseId = Integer.parseInt(req.getParameter("courseId"));
        JsonObject responseExam = new JsonObject();
        JsonObject responseJson = new JsonObject();

        if(dateExamNew != null && hourExamNew != null &&
                classroomExamNew != null){
            dateExamNew = dateExamNew.trim();
            hourExamNew = hourExamNew.trim();
            classroomExamNew = classroomExamNew.trim();

            l = ld.doRetrieveById(dateExamOld, hourExamOld, courseId);
            Exam check = ld.doRetrieveById(dateExamNew, hourExamNew, courseId);
            if(check != null && !check.equals(l) && check.getClassroom().equals(classroomExamNew)){
                responseJson.addProperty("type", "error");
                responseJson.addProperty("message", "Exam already exists");
                responseExam.addProperty("date", l.getDate());
                responseExam.addProperty("hour", l.getHour());
                responseExam.addProperty("classroom", l.getClassroom());
                responseExam.addProperty("courseId", l.getCourse().getId());
            }
            else{
                l.setDate(dateExamNew);
                l.setHour(hourExamNew);
                l.setClassroom(classroomExamNew);
                ld.doUpdate(l, dateExamOld, hourExamOld);
                responseJson.addProperty("type", "success");
                responseJson.addProperty("message", "Updated completed successffully");
                responseExam.addProperty("date", l.getDate());
                responseExam.addProperty("hour", l.getHour());
                responseExam.addProperty("classroom", l.getClassroom());
                responseExam.addProperty("courseId", l.getCourse().getId());
            }

            responseJson.addProperty("oldDate", dateExamOld);
            responseJson.addProperty("oldHour", hourExamOld);
            responseJson.addProperty("oldClassroom", classroomExamOld);
            responseJson.add("updatedExam", responseExam);
            resp.getWriter().println(responseJson.toString());
            resp.flushBuffer();
        }
        else
            throw new MyServletException("Error in the request parameters: null parameters");
    }
}
