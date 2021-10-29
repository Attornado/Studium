package controller;

import model.Course;
import model.CourseDAO;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/show-category-courses.html", "/show-category-courses"})
public class ShowCourses extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Course> courses;
        String category=request.getParameter("categoryName");
        CourseDAO cd=new CourseDAO();
        String address="/WEB-INF/view/courses.jsp";

        courses = cd.doRetrieveByCategory(category);
        request.setAttribute("courses", courses);
        request.setAttribute("sectionName", "corsi");
        request.setAttribute("currentCategory", category);

        RequestDispatcher dispatcher = request.getRequestDispatcher(address);
        dispatcher.forward(request, response);
    }
}
