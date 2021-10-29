package controller;
import model.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/show-teacher-area"})
public class ShowTeacherAreaServlet extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/view/teacherPage.jsp");
        req.setAttribute("sectionName", "reservedArea");
        req.setAttribute("currentUserAreaSection", "teacherArea");
        HttpSession session = req.getSession(false);
        User loggedUser = (User)req.getSession().getAttribute("loggedUser");

        if(loggedUser == null || !(loggedUser.isRoot() || loggedUser.getClass().equals(Teacher.class)))
            throw new MyServletException("Error: you are trying to enter the teacher area while not logged, or while" +
                    " not being an administrator.");
        if(session != null){
            User u = (User) session.getAttribute("loggedUser");
            CourseDAO cd = new CourseDAO();
            ArrayList<Course> courses;
            if(u.isRoot()){
                courses = cd.doRetrieveAll();
                if(courses.size() < 4)
                    req.setAttribute("loggedTeachings", courses.subList(0, courses.size()));
                else
                    req.setAttribute("loggedTeachings", courses.subList(0, 4));
                req.setAttribute("curriculum", null);
            }
            else{
                courses = cd.doRetrieveByTeacher(u.getUsername());
                if(courses.size() > 4)
                    req.setAttribute("loggedTeachings", courses.subList(0, 4));
                else
                    req.setAttribute("loggedTeachings", courses);
                TeacherDAO td = new TeacherDAO();
                req.setAttribute("curriculum", td.doRetrieveByUsername(u.getUsername()).getCurriculum());
            }
        }
        rd.forward(req, resp);
    }
}
