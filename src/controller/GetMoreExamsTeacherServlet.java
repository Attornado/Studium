package controller;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mysql.cj.jdbc.exceptions.MysqlDataTruncation;
import model.*;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/get-more-exams-teacher"})
public class GetMoreExamsTeacherServlet extends HttpServlet {
    public static final int EXAMS_TEACHER_PER_REQUEST_DEFAULT = 4;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        int startingIndex;
        int id = Integer.parseInt(req.getParameter("CourseId"));
        JsonObject responseObject = new JsonObject(), exam;
        JsonArray newExams = new JsonArray();
        int examsPerRequest = (req.getParameter("examsPerRequest") != null)?
                (Integer.parseInt(req.getParameter("examsPerRequest"))):(EXAMS_TEACHER_PER_REQUEST_DEFAULT);
        try{
            startingIndex = Integer.parseInt(req.getParameter("startingIndex").trim());
        }
        catch (NumberFormatException e){
            throw new MyServletException("Error in the parameters, exam number must be an integer");
        }

        ExamDAO ed = new ExamDAO();
        ArrayList<Exam> examList;
        ArrayList<Exam> examListFull = ed.doRetrieveByIdCourse(id);
        if(req.getParameter("search").equals("")){
            examList = ed.doRetrieveByIdCourseSegmented(startingIndex, examsPerRequest, id);
        }
        else{
            examList = ed.doRetrieveByIdCourseSegmented(startingIndex, examsPerRequest, id);
            examListFull = ed.doRetrieveByIdCourseSegmented(0, examListFull.size(), id);
        }
        for(int i = 0; i < examsPerRequest && i < examList.size(); i++){
            exam = new JsonObject();
            exam.addProperty("date", examList.get(i).getDate());
            exam.addProperty("hour", examList.get(i).getHour());
            exam.addProperty("course", examList.get(i).getCourse().getId());
            exam.addProperty("classroom", examList.get(i).getClassroom());
            newExams.add(exam);
        }
        responseObject.add("newExams", newExams);
        responseObject.addProperty("newMaxPage", Math.max(Math.ceil(examListFull.size()/4.0), 1));
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}

