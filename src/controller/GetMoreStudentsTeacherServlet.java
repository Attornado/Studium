package controller;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import model.*;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/get-more-students-teacher"})
public class GetMoreStudentsTeacherServlet extends HttpServlet{
    public static final int STUDENTS_TEACHER_PER_REQUEST_DEFAULT = 4;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        int startingIndex;
        int id = Integer.parseInt(req.getParameter("CourseId"));
        JsonObject responseObject = new JsonObject(), student;
        JsonArray newStudents = new JsonArray();
        HttpSession session = req.getSession(false);
        int studentsPerRequest = (req.getParameter("studentsPerRequest") != null)?
                (Integer.parseInt(req.getParameter("studentsPerRequest"))):(STUDENTS_TEACHER_PER_REQUEST_DEFAULT);
        try{
            startingIndex = Integer.parseInt(req.getParameter("startingIndex").trim());
        }
        catch(NumberFormatException e){
            throw new MyServletException("Error in the parameters, student number must be an integer");
        }
        UserDAO ud = new UserDAO();
        ArrayList<User> studentList;
        CourseDAO cd = new CourseDAO();
        Course c = cd.doRetrieveById(id);
        ArrayList<User> studentListFull = ud.doRetrieveByCourseName(c.getName());
        EnrollmentDAO ed = new EnrollmentDAO();
        Enrollment e;
        if(req.getParameter("search").equals("")){
             studentList = ud.doRetrieveUserByUsernameFragmentAndCourse("%", startingIndex, studentsPerRequest, id);
        }
        else{
            studentList  = ud.doRetrieveUserByUsernameFragmentAndCourse(req.getParameter("search"), startingIndex, studentsPerRequest, id);
            studentListFull = ud.doRetrieveUserByUsernameFragmentAndCourse(req.getParameter("search"), 0, studentListFull.size(), id);
        }

        for(int i = 0; i < studentsPerRequest && i < studentList.size(); i++){
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
            newStudents.add(student);
        }
        responseObject.add("newStudents", newStudents);
        responseObject.addProperty("newMaxPage", Math.max(Math.ceil(studentListFull.size()/4.0), 1));
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}
