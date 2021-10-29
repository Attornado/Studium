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
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/get-more-students"})
public class GetMoreStudentServlet extends HttpServlet{
    public static final int STUDENTS_PER_REQUEST_DEFAULT = 4;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        int startingIndex;
        JsonObject responseObject = new JsonObject(), student;
        JsonArray newStudents = new JsonArray();
        int studentsPerRequest = (req.getParameter("studentsPerRequest") != null)?
                (Integer.parseInt(req.getParameter("studentsPerRequest"))):(STUDENTS_PER_REQUEST_DEFAULT);
        try{
            startingIndex = Integer.parseInt(req.getParameter("startingIndex").trim());
        }
        catch (NumberFormatException e){
            throw new MyServletException("Error in the parameters, student number must be an integer");
        }
        UserDAO ud = new UserDAO();
        ArrayList<User> studentList;
        ArrayList<User> studentListFull = ud.doRetrieveAll();;
        if(req.getParameter("search").equals("")){
            studentList = ud.doRetrieveByUsernameFragment("%", startingIndex, studentsPerRequest);
        }
        else{
            studentList = ud.doRetrieveByUsernameFragment(req.getParameter("search"), startingIndex, studentsPerRequest);
            studentListFull = ud.doRetrieveByUsernameFragment(req.getParameter("search"), 0, studentListFull.size());
        }


        for(int i = 0; i < studentsPerRequest && i < studentList.size(); i++){
            student = new JsonObject();
            student.addProperty("username", studentList.get(i).getUsername());
            student.addProperty("mail", studentList.get(i).getMail());
            student.addProperty("name", studentList.get(i).getName());
            student.addProperty("surname", studentList.get(i).getSurname());
            student.addProperty("CF", studentList.get(i).getCF());
            newStudents.add(student);
        }
        responseObject.add("newStudents", newStudents);
        responseObject.addProperty("newMaxPages",
                Math.max(Math.ceil(studentListFull.size()/(double)studentsPerRequest), 1));
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}
