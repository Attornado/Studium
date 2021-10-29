package controller;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;

@WebServlet(urlPatterns = {"/changeLesson"})
@MultipartConfig
public class UpdateLesson extends HttpServlet{

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        LessonDAO ld = new LessonDAO();
        Lesson l;
        String dateLessonNew = req.getParameter("editable-dateLesson");
        String hourLessonNew = req.getParameter("editable-hourLesson");
        String classroomLessonNew = req.getParameter("editable-classroomLesson");
        String dateLessonOld = req.getParameter("oldDateLesson");
        String hourLessonOld = req.getParameter("oldHourLesson");
        String classroomLessonOld = req.getParameter("oldClassroomLesson");
        int courseId = Integer.parseInt(req.getParameter("courseId"));
        JsonObject responseLesson = new JsonObject();
        JsonObject responseJson = new JsonObject();

        if(dateLessonNew != null && hourLessonNew != null &&
            classroomLessonNew != null){
            dateLessonNew = dateLessonNew.trim();
            hourLessonNew = hourLessonNew.trim();
            classroomLessonNew = classroomLessonNew.trim();

            l = ld.doRetrieveById(dateLessonOld, hourLessonOld, courseId);
            Lesson check = ld.doRetrieveById(dateLessonNew, hourLessonNew, courseId);
            if(check != null && !check.equals(l) && check.getClassroom().equals(classroomLessonNew)){
                responseJson.addProperty("type", "error");
                responseJson.addProperty("message", "Lesson already exists");
                responseLesson.addProperty("date", l.getDate());
                responseLesson.addProperty("hour", l.getHour());
                responseLesson.addProperty("classroom", l.getClassroom());
                responseLesson.addProperty("courseId", l.getCourse().getId());
            }
            else if (dateLessonNew.equals(dateLessonOld) && hourLessonNew.equals(hourLessonOld) && classroomLessonNew.equals(classroomLessonOld)){
                responseJson.addProperty("type", "error");
                responseJson.addProperty("message", "You didn't change anything");
            }
            else{
                l.setDate(dateLessonNew);
                l.setHour(hourLessonNew);
                l.setClassroom(classroomLessonNew);
                ld.doUpdate(l, dateLessonOld, hourLessonOld);
                responseJson.addProperty("type", "success");
                responseJson.addProperty("message", "Updated completed successffully");
                responseLesson.addProperty("date", l.getDate());
                responseLesson.addProperty("hour", l.getHour());
                responseLesson.addProperty("classroom", l.getClassroom());
                responseLesson.addProperty("courseId", l.getCourse().getId());
            }
            
            responseJson.addProperty("oldDate", dateLessonOld);
            responseJson.addProperty("oldHour", hourLessonOld);
            responseJson.addProperty("oldClassroom", classroomLessonOld);
            responseJson.addProperty("courseValue", courseId);
            responseJson.add("updatedLesson", responseLesson);
            resp.getWriter().println(responseJson.toString());
            resp.flushBuffer();
        }
        else
            throw new MyServletException("Error in the request parameters: null parameters");
    }
}
