package model;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ExamDAO {
    public ArrayList<Exam> doRetrieveByIdCourse(int course){
        try{
            Connection con = ConPool.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM Exam E WHERE E.course = ? ;");
            ps.setInt(1, course);
            ResultSet rs = ps.executeQuery();
            ArrayList<Exam> exams = new ArrayList<>();
            CourseDAO cd = new CourseDAO();
            Course c = cd.doRetrieveById(course);
            while(rs.next()){
                Exam e = new Exam();
                e.setCourse(c);
                e.setClassroom(rs.getString("classroom"));
                e.setDate(rs.getString("date"));
                e.setHour(rs.getString("hour"));
                exams.add(e);
            }
            return exams;
        }
        catch (SQLException e){
            return null;
        }
    }

    public ArrayList<Exam> doRetrieveByCourse(int courseId,int limit,int offset){
        ArrayList<Exam> lista=new ArrayList<Exam>();
        PreparedStatement st;
        ResultSet rs;
        Exam p;
        try(Connection con=ConPool.getConnection()){
            st= con.prepareStatement("SELECT * from Exam WHERE course=? order by date limit ? offset ? ");
            st.setInt(1,courseId);
            st.setInt(2,limit);
            st.setInt(3,offset);
            rs = st.executeQuery();
            while(rs.next()) {
                p = new Exam();
                p.setDate(rs.getString(1));
                p.setHour(rs.getString(2));
                p.setCourse(null);
                p.setClassroom(rs.getString(4));
                int tmp=rs.getInt(3);
                CourseDAO cd=new CourseDAO();
                p.setCourse(cd.doRetrieveById(tmp));
                lista.add(p);
            }
            rs.close();
            st.close();
            con.close();
            return lista;
        }catch(SQLException e){
            throw new RuntimeException(e);
        }
    }
    public ArrayList<Exam> doRetrieveAllByCourse(int courseId){
        ArrayList<Exam> lista=new ArrayList<Exam>();
        PreparedStatement st;
        ResultSet rs;
        Exam p;
        try(Connection con=ConPool.getConnection()){
            st= con.prepareStatement("SELECT * from Exam WHERE course=? order by date ");
            st.setInt(1,courseId);
            rs = st.executeQuery();
            while(rs.next()) {
                p = new Exam();
                p.setDate(rs.getString(1));
                p.setHour(rs.getString(2));
                p.setCourse(null);
                p.setClassroom(rs.getString(4));
                int tmp=rs.getInt(3);
                CourseDAO cd=new CourseDAO();
                p.setCourse(cd.doRetrieveById(tmp));
                lista.add(p);
            }
            rs.close();
            st.close();
            con.close();
            return lista;
        }catch(SQLException e){
            throw new RuntimeException(e);
        }
    }

    public ArrayList<Exam> doRetrieveByIdCourseSegmented(int offset, int limit, int id){
        try{
            Connection con = ConPool.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM Exam E WHERE E.course = ? limit ? offset ?;");
            ps.setInt(1, id);
            ps.setInt(2, limit);
            ps.setInt(3, offset);
            ResultSet rs = ps.executeQuery();
            ArrayList<Exam> exams = new ArrayList<>();
            CourseDAO cd = new CourseDAO();
            Course c = cd.doRetrieveById(id);
            while(rs.next()){
                Exam e = new Exam();
                e.setCourse(c);
                e.setClassroom(rs.getString("classroom"));
                e.setDate(rs.getString("date"));
                e.setHour(rs.getString("hour"));
                exams.add(e);
            }
            return exams;
        }
        catch (SQLException e){
            return null;
        }
    }

    public Exam doRetrieveById(String date, String hour, int course) {
        try (Connection con = ConPool.getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM Exam E " +
                    "WHERE E.date=? AND E.hour=? AND E.course=?;");
            ps.setString(1, date);
            ps.setString(2, hour);
            ps.setInt(3, course);
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                Exam p = new Exam();
                p.setDate(rs.getString(1));
                p.setHour(rs.getString(2));
                p.setCourse(null);
                p.setClassroom(rs.getString(4));
                int tmp=rs.getInt(3);
                rs.close();
                ps.close();
                con.close();
                CourseDAO cd=new CourseDAO();
                p.setCourse(cd.doRetrieveById(tmp));
                return p;
            }
            return null;
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void doDeleteById(String date, String hour, int course){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st = cn.prepareStatement("delete from Exam where date=? AND hour=? AND course=?;");
            st.setString(1, date);
            st.setString(2, hour);
            st.setInt(3, course);
            st.executeUpdate();
            st.close();
            cn.close();
        }
        catch(SQLException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public void doSave(Exam exam) {
        try (Connection con = ConPool.getConnection()) {
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO Exam (date, hour, course, classroom) VALUES(?,?,?,?);");
            ps.setString(1, exam.getDate());
            ps.setString(2, exam.getHour());
            ps.setInt(3, exam.getCourse().getId());
            ps.setString(4, exam.getClassroom());
            if (ps.executeUpdate() != 1) {
                throw new RuntimeException("INSERT error.");
            }
            ps.close();
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Exam> doRetrieveAll(){
        ArrayList<Exam> lista=new ArrayList<>();
        Statement st;
        ResultSet rs;
        Exam ex = null;
        try(Connection con=ConPool.getConnection()){
            st= con.createStatement();
            rs = st.executeQuery("SELECT * from Exam WHERE 1=1 ");
            while(rs.next()) {
                ex = new Exam();
                ex.setDate(rs.getString(1));
                ex.setHour(rs.getString(2));
                ex.setCourse(null);
                ex.setClassroom(rs.getString(4));
                int tmp=rs.getInt(3);
                CourseDAO cd=new CourseDAO();
                ex.setCourse(cd.doRetrieveById(tmp));
                lista.add(ex);
            }
            rs.close();
            st.close();
            con.close();
            return lista;
        }
        catch(SQLException e){
            throw new RuntimeException(e);
        }
    }
    public void doUpdate(Exam c, String dateOld, String hourOld){

        try (Connection con = ConPool.getConnection()) {
            PreparedStatement ps = con.prepareStatement("update Exam set date='" + c.getDate() + "', hour='" +
                    c.getHour() + "', course=" + c.getCourse().getId() + ", classroom='"+ c.getClassroom() +
                    "' WHERE date=? AND hour =? AND course=?");
            ps.setString(1, dateOld);
            ps.setString(2, hourOld);
            ps.setInt(3, c.getCourse().getId());
            ps.executeUpdate();
            ps.close();
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
