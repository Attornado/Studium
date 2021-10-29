package controller;
import model.*;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(urlPatterns = {"/show-course", "/course.html"})
public class ShowCourseServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Lesson> lessons;
        ArrayList<Exam> exams;
        LessonDAO ls = new LessonDAO();
        ExamDAO ex = new ExamDAO();
        String courseId = request.getParameter("courseId");
        String address;
        Course course;
        CourseDAO cd=new CourseDAO();

        course=cd.doRetrieveById(Integer.parseInt(courseId));
        if(course!=null){
            lessons=ls.doRetrieveByCourse(Integer.parseInt(courseId),LESSONXPAGE,0);
            exams=ex.doRetrieveByCourse(Integer.parseInt(courseId),LESSONXPAGE,0);
            Teacher teacher=course.getTeacher();
            request.setAttribute("examsLength", ex.doRetrieveAllByCourse(Integer.parseInt(courseId)).size());
            request.setAttribute("lessonsLength", ls.doRetrieveAllByCourse(Integer.parseInt(courseId)).size());
            request.setAttribute("exams",exams);
            request.setAttribute("lessons",lessons);
            request.setAttribute("course",course);
            request.setAttribute("teacher",teacher);
            request.setAttribute("sectionName", "corsi");
            request.setAttribute("currentCategory", course.getCategory());

            address="/WEB-INF/view/course.jsp";
            RequestDispatcher dispatcher = request.getRequestDispatcher(address);
            dispatcher.forward(request, response);
        }
        else
            throw new MyServletException("Not existing course");
    }
    public static final int LESSONXPAGE=4;
}
