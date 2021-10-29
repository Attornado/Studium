package controller;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
import java.util.*;

@WebServlet(urlPatterns = {"/show-admin-area"})
public class ShowAdminPageServlet extends HttpServlet{

    public static final int DIMENSION_PAGE = 4;
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        HttpSession session = req.getSession();
        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/view/admin.jsp");
        User loggedUser = (User)session.getAttribute("loggedUser");
        req.setAttribute("sectionName", "reservedArea");
        req.setAttribute("currentUserAreaSection", "adminArea");

        if(loggedUser == null || !loggedUser.isRoot())
            throw new MyServletException("Error: you are trying to enter the admin area while not logged, or while" +
                    " not being an administrator.");

        UserDAO ud = new UserDAO();
        CourseDAO cd = new CourseDAO();
        TeacherDAO td = new TeacherDAO();

        ArrayList<User> students = ud.doRetrieveAll();
        ArrayList<Course> courses = cd.doRetrieveAll();
        ArrayList<Teacher> teachers = td.doRetrieveAll();
        ArrayList<User> admins = ud.doRetrieveAllAdmin();
        ArrayList<Category> categories = (ArrayList<Category>) getServletContext().getAttribute("categoryList");

        req.setAttribute("studentsLength", students.size());
        req.setAttribute("coursesLength", courses.size());
        req.setAttribute("categoriesLength", categories.size());
        req.setAttribute("teachersLength", teachers.size());
        req.setAttribute("adminsLength", admins.size());

        int studentsIndex = DIMENSION_PAGE, coursesIndex = DIMENSION_PAGE, categoriesIndex = DIMENSION_PAGE,
                teachersIndex = DIMENSION_PAGE, adminIndex = DIMENSION_PAGE;
        if(students.size() < DIMENSION_PAGE)
            studentsIndex = students.size();
        if(courses.size() < DIMENSION_PAGE)
            coursesIndex = courses.size();
        if(categories.size() < DIMENSION_PAGE)
            categoriesIndex = categories.size();
        if(teachers.size() < DIMENSION_PAGE)
            teachersIndex = teachers.size();
        if(admins.size() < DIMENSION_PAGE)
            adminIndex = admins.size();

        req.setAttribute("firstStudents", students.subList(0, studentsIndex));
        req.setAttribute("firstCourses", courses.subList(0, coursesIndex));
        req.setAttribute("firstCategories", categories.subList(0, categoriesIndex));
        req.setAttribute("firstTeachers", teachers.subList(0, teachersIndex));
        req.setAttribute("firstAdmins", admins.subList(0, adminIndex));
        rd.forward(req, resp);
    }
}
