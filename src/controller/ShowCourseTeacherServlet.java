package controller;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import model.*;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/showCourseTeacher"})
@MultipartConfig
public class ShowCourseTeacherServlet extends HttpServlet{

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        JsonObject responseObject = new JsonObject(), student;
        JsonArray students = new JsonArray();
        String courseName = req.getParameter("name");
        UserDAO ud = new UserDAO();
        ArrayList<User> studentList = ud.doRetrieveByCourseName(courseName);
        EnrollmentDAO ed = new EnrollmentDAO();
        Enrollment e;
        CourseDAO coursed = new CourseDAO();
        int id = coursed.doRetrieveByName(courseName).getId();
        int studentIndex = 4;
        if(studentList.size() < 4)
            studentIndex = studentList.size();
        for(int i = 0; i < studentIndex; i++){
            student = new JsonObject();
            student.addProperty("username", studentList.get(i).getUsername());
            student.addProperty("mail", studentList.get(i).getMail());
            student.addProperty("name", studentList.get(i).getName());
            student.addProperty("surname", studentList.get(i).getSurname());
            student.addProperty("CF", studentList.get(i).getCF());
            e = ed.doRetrieveByUsernameIdCourse(studentList.get(i).getUsername(), id);
            if(e.isPassed())
                student.addProperty("passed", true);
            else
                student.addProperty("passed", false);
            students.add(student);
        }
        responseObject.add("students", students);
        responseObject.addProperty("studentSize", studentList.size());
        responseObject.addProperty("courseId", id);

        LessonDAO ld = new LessonDAO();
        ArrayList<Lesson> lessonList = ld.doRetrieveByIdCourse(id);
        JsonObject lesson;
        JsonArray lessons = new JsonArray();
        int lessonIndex = 4;
        if (lessonList.size() < 4)
            lessonIndex = lessonList.size();
        for(int i = 0; i < lessonIndex; i++){
            lesson = new JsonObject();
            lesson.addProperty("date", lessonList.get(i).getDate());
            lesson.addProperty("hour", lessonList.get(i).getHour());
            lesson.addProperty("course", lessonList.get(i).getCourse().getId());
            lesson.addProperty("classroom", lessonList.get(i).getClassroom());
            lessons.add(lesson);
        }
        responseObject.add("lessons", lessons);
        responseObject.addProperty("lessonSize", lessonList.size());

        ExamDAO exd = new ExamDAO();
        ArrayList<Exam> examList = exd.doRetrieveByIdCourse(id);
        JsonObject exam;
        JsonArray exams = new JsonArray();
        int examIndex = 4;
        if(examList.size() < 4)
            examIndex = examList.size();
        for(int i = 0; i < examIndex; i++){
            exam = new JsonObject();
            exam.addProperty("date", examList.get(i).getDate());
            exam.addProperty("hour", examList.get(i).getHour());
            exam.addProperty("course", examList.get(i).getCourse().getId());
            exam.addProperty("classroom", examList.get(i).getClassroom());
            exams.add(exam);
        }
        responseObject.add("exams", exams);
        responseObject.addProperty("examSize", examList.size());

        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}

