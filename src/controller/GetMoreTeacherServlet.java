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

@WebServlet(urlPatterns = {"/get-more-teachers"})
public class GetMoreTeacherServlet extends HttpServlet{
    public static final int TEACHERS_PER_REQUEST_DEFAULT = 4;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        int startingIndex;
        JsonObject responseObject = new JsonObject(), teacher;
        JsonArray newTeachers = new JsonArray();
        int teachersPerRequest = (req.getParameter("teachersPerRequest") != null)?
                (Integer.parseInt(req.getParameter("teachersPerRequest"))):(TEACHERS_PER_REQUEST_DEFAULT);
        try{
            startingIndex = Integer.parseInt(req.getParameter("startingIndex").trim());
        }
        catch (NumberFormatException e){
            throw new MyServletException("Error in the parameters, teachers number must be an integer");
        }
        TeacherDAO td = new TeacherDAO();
        ArrayList<Teacher> teacherList;
        ArrayList<Teacher> teacherListFull = td.doRetrieveAll();
        if(req.getParameter("searchFirstAndLastName") != null && !req.getParameter("search").equals("")){
            teacherList = td.doRetrieveByNameAndSurnameFragment(req.getParameter("search"),
                    startingIndex, teachersPerRequest);
            teacherListFull = td.doRetrieveByNameAndSurnameFragment(req.getParameter("search"),
                    0, teacherListFull.size());
        }
        else if(req.getParameter("search").equals("")){
            teacherList = td.doRetrieveByUsernameFragment("%", startingIndex, teachersPerRequest);
        }
        else{
            teacherList = td.doRetrieveByUsernameFragment(req.getParameter("search"), startingIndex, teachersPerRequest);
            teacherListFull = td.doRetrieveByUsernameFragment(req.getParameter("search"), 0, teacherListFull.size());
        }
        for(int i = 0; i < teachersPerRequest && i < teacherList.size(); i++){
            teacher = new JsonObject();
            teacher.addProperty("username", teacherList.get(i).getUsername());
            teacher.addProperty("name", teacherList.get(i).getName());
            teacher.addProperty("surname", teacherList.get(i).getSurname());
            teacher.addProperty("curriculum", teacherList.get(i).getCurriculum());
            newTeachers.add(teacher);
        }
        responseObject.add("newTeachers", newTeachers);
        responseObject.addProperty("newMaxPages",
                Math.max(Math.ceil(teacherListFull.size()/(double)teachersPerRequest), 1));
        resp.getWriter().println(responseObject);
        resp.flushBuffer();
    }
}
