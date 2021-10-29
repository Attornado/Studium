package controller;
import com.google.gson.JsonObject;
import model.*;
import org.jetbrains.annotations.NotNull;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import  javax.servlet.*;
import java.io.IOException;

@WebServlet(urlPatterns = {"/addTeacher-servlet", "/add-teacher"})
@MultipartConfig
public class AddTeacherServlet extends HttpServlet{
    @NotNull
    public static final String TEACHER_REGEX = "^[A-Za-z0-9]{6,20}$";
    public static final int CURRICULUM_MAX_LENGTH = 1000, CURRICULUM_MIN_LENGTH = 10, TEACHER_MAX_LENGTH = 20,
            TEACHER_MIN_LENGTH = 6;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        UserDAO ud = new UserDAO();
        TeacherDAO td = new TeacherDAO();
        User u;
        String teacherName = req.getParameter("userName");
        String curriculum = req.getParameter("curriculum");
        JsonObject responseObject = new JsonObject();

        if(teacherName != null && curriculum != null){
            if(teacherName.length() >= TEACHER_MIN_LENGTH && teacherName.length() <= TEACHER_MAX_LENGTH &&
                    curriculum.length() <= CURRICULUM_MAX_LENGTH && curriculum.length() >= CURRICULUM_MIN_LENGTH &&
                    teacherName.matches(TEACHER_REGEX)){
                u = ud.doRetrieveByUsername(teacherName);
                if(u != null){
                    if(td.doRetrieveByUsername(teacherName) != null){
                        responseObject.addProperty("type", "error");
                        responseObject.addProperty("msg", "teacher " + teacherName +
                                " cannot be added, because it already exists!");
                    }
                    else {
                        ud.doDeleteByUsername(u.getUsername());
                        Teacher t = new Teacher(u, curriculum);
                        td.doSave(t);
                        responseObject.addProperty("type", "success");
                        responseObject.addProperty("msg", "teacher "+teacherName+" added successfully!");
                    }
                }
                else{
                    responseObject.addProperty("type", "error");
                    responseObject.addProperty("msg", "teacher " + teacherName +
                            " cannot be added, because user " + teacherName + " doesn't exists!");
                }
            }
            else{
                responseObject.addProperty("type", "error");
                responseObject.addProperty("msg", "teacher " + teacherName +
                        " cannot be added, because some parameters don't fit the criteria!");
            }
            resp.getWriter().println(responseObject);
            resp.flushBuffer();
        }
        else{
            throw new MyServletException("\nError in the parameter passing: one of the parameters is null.");
        }
    }
}
