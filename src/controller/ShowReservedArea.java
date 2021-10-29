package controller;
import model.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

@WebServlet(urlPatterns = {"/reservedArea.html"})
public class ShowReservedArea extends HttpServlet{

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/view/reservedArea.jsp");
        User loggedUser = (User)req.getSession().getAttribute("loggedUser");
        Enrollment e;
        ArrayList<Course> coursesLoggedUser;
        HashMap<Course, String> enrCourse = new HashMap<>();
        CourseDAO cd = new CourseDAO();
        EnrollmentDAO ed = new EnrollmentDAO();
        req.setAttribute("sectionName", "reservedArea");
        if(loggedUser == null)
            throw new MyServletException("Error: you are trying to enter the reserved area while not logged, or while" +
                    " not being an administrator.");
        coursesLoggedUser = cd.doRetrieveByUser(loggedUser);
        for(Course course : coursesLoggedUser) {
            e = ed.doRetrieveByUsernameIdCourse(loggedUser.getUsername(), course.getId());
            if (e.isPassed())
                enrCourse.put(course, "true");
            else
                enrCourse.put(course, "false");
        }
        req.setAttribute("enrollmentsAndCoursesMapOfTheLoggedUser", enrCourse);
        req.setAttribute("sectionName", "reservedArea");
        rd.forward(req, resp);
    }
}
