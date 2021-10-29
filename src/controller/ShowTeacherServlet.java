package controller;

import model.Course;
import model.CourseDAO;
import model.Teacher;
import model.TeacherDAO;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(urlPatterns= {"/showTeacher.html"})
public class ShowTeacherServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Course> coursesByTeacher;
        String username= request.getParameter("teacherUsername");
        CourseDAO cd=new CourseDAO();
        TeacherDAO tc=new TeacherDAO();
        Teacher teacher=tc.doRetrieveByUsername(username);
        coursesByTeacher=cd.doRetrieveByTeacher(username);
        String address="/WEB-INF/view/teacher.jsp";

        request.setAttribute("courses",coursesByTeacher);
        request.setAttribute("teacher",teacher);
        request.setAttribute("sectionName", "corsi");

        RequestDispatcher dispatcher = request.getRequestDispatcher(address);
        dispatcher.forward(request, response);
    }
}
