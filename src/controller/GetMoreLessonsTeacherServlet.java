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

@WebServlet(urlPatterns = {"/get-more-lessons-teacher"})
public class GetMoreLessonsTeacherServlet extends HttpServlet {
    public static final int LESSONS_TEACHER_PER_REQUEST_DEFAULT = 4;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        int startingIndex;
        int id = Integer.parseInt(req.getParameter("CourseId"));
        JsonObject responseObject = new JsonObject(), lesson;
        JsonArray newLessons = new JsonArray();
        int lessonsPerRequest = (req.getParameter("lessonsPerRequest") != null)?
                (Integer.parseInt(req.getParameter("lessonsPerRequest"))):(LESSONS_TEACHER_PER_REQUEST_DEFAULT);
        try{
            startingIndex = Integer.parseInt(req.getParameter("startingIndex").trim());
        }
        catch (NumberFormatException e){
            throw new MyServletException("Error in the parameters, lesson number must be an integer");
        }

        LessonDAO ld = new LessonDAO();
        ArrayList<Lesson> lessonList;
        ArrayList<Lesson> lessonListFull = ld.doRetrieveByIdCourse(id);
        if(req.getParameter("search").equals("")){
            lessonList = ld.doRetrieveByIdCourseSegmented(startingIndex, lessonsPerRequest, id);
        }
        else{
            lessonList = ld.doRetrieveByIdCourseSegmented(startingIndex, lessonsPerRequest, id);
            lessonListFull = ld.doRetrieveByIdCourseSegmented(0, lessonListFull.size(), id);
        }
        for(int i = 0; i < lessonsPerRequest && i < lessonList.size(); i++){
            lesson = new JsonObject();
            lesson.addProperty("date", lessonList.get(i).getDate());
            lesson.addProperty("hour", lessonList.get(i).getHour());
            lesson.addProperty("course", lessonList.get(i).getCourse().getId());
            lesson.addProperty("classroom", lessonList.get(i).getClassroom());
            newLessons.add(lesson);
        }
        responseObject.add("newLessons", newLessons);
        responseObject.addProperty("newMaxPage", Math.max(Math.ceil(lessonListFull.size()/4.0), 1));
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}
