package controller;
import model.Category;
import model.CategoryDAO;
import model.Course;
import model.CourseDAO;

import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Random;

@WebServlet(urlPatterns = {"/index.html"})
public class HomeServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ArrayList<Course> courses;
        CourseDAO cd=new CourseDAO();
        courses=cd.doRetrieveAll();
        ArrayList<Course> coursesToShow=new ArrayList<Course>();

        ArrayList<Category> categories = null;
        CategoryDAO ct=new CategoryDAO();
        try {
            categories=ct.doRetrieveAll();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        ArrayList<Category> categoriesToShow=new ArrayList<Category>();

        Random rand=new Random();
        int max=courses.size()-1;
        int min=0;
        int r;
        for(int i=0;i<5 && i < courses.size();i++){
            r=rand.nextInt(max-min+1)+min;
            if(!coursesToShow.contains((Course) courses.get(r)))
                coursesToShow.add(courses.get(r));
            else
                i--;
        }

        max=categories.size()-1;
        min=0;
        for(int i=0;i<5 && i < categories.size();i++){
            r=rand.nextInt(max-min+1)+min;
            if(!categoriesToShow.contains((Category) categories.get(r)))
                categoriesToShow.add(categories.get(r));
            else
                i--;
        }


        RequestDispatcher rd;

        String address = "/WEB-INF/view/home.jsp";

        req.setAttribute("coursesToShowHome",coursesToShow);
        req.setAttribute("coursesSize",coursesToShow.size());
        req.setAttribute("categoriesToShowHome",categoriesToShow);
        req.setAttribute("categoriesSize",categoriesToShow.size());
        req.setAttribute("sectionName", "home");

        rd = req.getRequestDispatcher(address);

        rd.forward(req, resp);
    }
}
