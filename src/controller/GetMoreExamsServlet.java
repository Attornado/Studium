package controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import model.Exam;
import model.ExamDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/get-more-exams-servlet"})
public class GetMoreExamsServlet extends HttpServlet {
    public static final int EXAMS_PER_REQUEST_DEFAULT=4;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int startingIndex;
        int courseId=Integer.parseInt(req.getParameter("courseId"));
        JsonObject responseObject = new JsonObject()
                , exam;
        JsonArray newExams = new JsonArray();
        int examsPerRequest = (req.getParameter("examsPerRequest") != null)?
                (Integer.parseInt(req.getParameter("examsPerRequest"))):(EXAMS_PER_REQUEST_DEFAULT);
        try{
            startingIndex = Integer.parseInt(req.getParameter("startingIndex").trim()); //cancella spazi all'inizio e alla fine
        }
        catch (NumberFormatException e){
            throw new MyServletException("Error in the parameters, exam number must be an integer");
        }
        ExamDAO ex = new ExamDAO();
        ArrayList<Exam> examList;
        ArrayList<Exam> examListFull = ex.doRetrieveAllByCourse(courseId);
        examList = ex.doRetrieveByCourse(courseId, examsPerRequest, startingIndex);



        for(int i = 0; i < examsPerRequest && i < examList.size(); i++){
            exam = new JsonObject();
            exam.addProperty("date", examList.get(i).getDate());
            exam.addProperty("hour", examList.get(i).getHour());
            exam.addProperty("classroom", examList.get(i).getClassroom());
            newExams.add(exam);
        }
        responseObject.add("newExams", newExams);
        responseObject.addProperty("newMaxPages",
                Math.max(Math.ceil(examListFull.size()/(double)examsPerRequest), 1));
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}
