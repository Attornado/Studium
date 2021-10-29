package model;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;


@WebServlet(urlPatterns = {"/test"})
public class Test extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        var ed = new CourseDAO();

       var e = ed.doRetrieveByName("restozero");

        var list = ed.doRetrieveByNameFragment("r", 2, 2);

        /*var t2 = new User("Delizia", "iAmGodOFEverything", "God222222221.s@gmail.com",
                "Costantino", "Delizia", "sdasdsadsadsad1", "1980-12-25",
                "Via Paradiso", "PA", "777", "Ischia", "3214567890", 77777,
                true);

        //t2.setCity("Caserta Tuoro");
        ed.doUpdate(t2);
        ed.doSave(t2);
        //ed.doDeleteByUrl(t2.getUrl());*/
        System.out.println(e + "\n" + list + "\n" + "");
    }
}
