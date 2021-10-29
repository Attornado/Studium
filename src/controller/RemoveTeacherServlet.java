package controller;
import com.google.gson.JsonObject;
import model.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.IOException;

@WebServlet(urlPatterns = {"/removeTeacher-servlet", "/remove-teacher"})
public class RemoveTeacherServlet  extends HttpServlet{

    public static final String TEACHER_REGEX = "^[A-Za-z0-9]{6,20}$";
    public static final int TEACHER_MAX_LENGTH = 20, TEACHER_MIN_LENGTH = 6;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        TeacherDAO td = new TeacherDAO();
        Teacher t;
        JsonObject responseObject = new JsonObject();
        if(req.getParameter("removeTeacher") != null){
            if(req.getParameter("removeTeacher").length() >= TEACHER_MIN_LENGTH &&
                    req.getParameter("removeTeacher").length() <= TEACHER_MAX_LENGTH &&
                    req.getParameter("removeTeacher").matches(TEACHER_REGEX)){
                String teacherName = req.getParameter("removeTeacher");
                t = td.doRetrieveByUsername(teacherName);
                if(t != null){
                    td.doDeleteByUsername(teacherName);
                    responseObject.addProperty("removedTeacherName", teacherName);
                    responseObject.addProperty("type", "success");
                    responseObject.addProperty("msg", "teacher " + teacherName +
                            " successfully removed.");
                }
                else{
                    responseObject.addProperty("type", "error");
                    responseObject.addProperty("msg", "teacher " + teacherName +
                            " doesn't exists and cannot be removed.");
                }
            }
            else{
                responseObject.addProperty("type", "error");
                responseObject.addProperty("msg", "one or more of the parameters don't fit the criteria!");
            }
            resp.getWriter().println(responseObject);
            resp.flushBuffer();
        }
        else{
            throw new MyServletException("\nError in the parameter passing: one of the parameters is null.");
        }
    }
}
