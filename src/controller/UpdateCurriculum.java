package controller;

import com.google.gson.JsonObject;
import model.*;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;

@WebServlet(urlPatterns = {"/changeCurriculum-servlet"})
@MultipartConfig
public class UpdateCurriculum extends HttpServlet{
    public static final int CURRICULUM_MIN_LENGTH = 10, CURRICULUM_MAX_LENGTH = 1000;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        TeacherDAO td = new TeacherDAO();
        String curriculum = req.getParameter("curriculum").trim();
        JsonObject responseJson = new JsonObject();
        HttpSession session = req.getSession(false);
        if(curriculum != null){
            if(curriculum.length() <= CURRICULUM_MAX_LENGTH && curriculum.length() >= CURRICULUM_MIN_LENGTH){
                if(session != null){
                    User u = (User) session.getAttribute("loggedUser");
                    Teacher t = td.doRetrieveByUsername(u.getUsername());
                    t.setCurriculum(curriculum);
                    td.doUpdate(t);
                    responseJson.addProperty("type", "success");
                    responseJson.addProperty("msg", "Update completed");
                    resp.getWriter().println(responseJson.toString());
                    resp.flushBuffer();
                }
                else {
                    responseJson.addProperty("type", "error");
                    responseJson.addProperty("msg", "Values don't respect rules");
                    resp.getWriter().println(responseJson.toString());
                }
            }
            else{
                responseJson.addProperty("type", "error");
                responseJson.addProperty("message", "Values don't respect rules");
                resp.getWriter().println(responseJson.toString());
            }
        }
        else{
            throw new MyServletException("Error in parameter request");
        }
    }
}
