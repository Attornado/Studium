package model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class LessonDAO {

    public ArrayList<Lesson> doRetrieveByIdCourse(int course){
        try{
            Connection con = ConPool.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM Lesson L WHERE L.course = ? ;");
            ps.setInt(1, course);
            ResultSet rs = ps.executeQuery();
            ArrayList<Lesson> lessons = new ArrayList<>();
            CourseDAO cd = new CourseDAO();
            Course c = cd.doRetrieveById(course);
            while(rs.next()){
                Lesson l = new Lesson();
                l.setCourse(c);
                l.setClassroom(rs.getString("classroom"));
                l.setDate(rs.getString("date"));
                l.setHour(rs.getString("hour"));
                lessons.add(l);
            }
            return lessons;
        }
        catch (SQLException e){
            return null;
        }
    }

    public ArrayList<Lesson> doRetrieveByIdCourseSegmented(int offset, int limit, int id){
        try{
            Connection con = ConPool.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM Lesson L WHERE L.course = ? limit ? offset ?;");
            ps.setInt(1, id);
            ps.setInt(2, limit);
            ps.setInt(3, offset);
            ResultSet rs = ps.executeQuery();
            ArrayList<Lesson> lessons = new ArrayList<>();
            CourseDAO cd = new CourseDAO();
            Course c = cd.doRetrieveById(id);
            while(rs.next()){
                Lesson l = new Lesson();
                l.setCourse(c);
                l.setClassroom(rs.getString("classroom"));
                l.setDate(rs.getString("date"));
                l.setHour(rs.getString("hour"));
                lessons.add(l);
            }
            return lessons;
        }
        catch (SQLException e){
            return null;
        }
    }

    public Lesson doRetrieveById(String date, String hour, int course) {
        try (Connection con = ConPool.getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM Lesson L" +
                    " WHERE L.date=? AND L.hour =? AND L.course=?;");
            ps.setString(1, date);
            ps.setString(2,hour);
            ps.setInt(3,course);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Lesson p = new Lesson();
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
            PreparedStatement st = cn.prepareStatement("delete from Lesson where date=? AND hour=? AND course=?;");
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


    public void doSave(Lesson lesson) {
        try (Connection con = ConPool.getConnection()) {
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO Lesson (date, hour, course, classroom) VALUES(?,?,?,?);"
            );
            ps.setString(1, lesson.getDate());
            ps.setString(2, lesson.getHour());
            ps.setInt(3, lesson.getCourse().getId());
            ps.setString(4, lesson.getClassroom());
            if (ps.executeUpdate() != 1) {
                throw new RuntimeException("INSERT error.");
            }
            ps.close();
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public List<Lesson> doRetrieveAll(){
        ArrayList<Lesson> lista=new ArrayList<Lesson>();
        Statement st;
        ResultSet rs;
        Lesson p;
        try(Connection con=ConPool.getConnection()){
            st= con.createStatement();
            rs = st.executeQuery("SELECT * from Lesson WHERE 1=1 ");
            while(rs.next()) {
                p = new Lesson();
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
    public void doUpdate(Lesson c, String dateOld, String hourOld){

        try (Connection con = ConPool.getConnection()) {
            PreparedStatement ps = con.prepareStatement("update Lesson set date='" + c.getDate() + "', hour='" +
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

    public ArrayList<Lesson> doRetrieveByCourse(int courseId,int limit,int offset){
        ArrayList<Lesson> lista=new ArrayList<Lesson>();
        PreparedStatement st;
        ResultSet rs;
        Lesson p;
        try(Connection con=ConPool.getConnection()){
            st= con.prepareStatement("SELECT * from Lesson WHERE course=? order by date limit ? offset ? ");
            st.setInt(1,courseId);
            st.setInt(2,limit);
            st.setInt(3,offset);
            rs = st.executeQuery();
            while(rs.next()) {
                p = new Lesson();
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

    public ArrayList<Lesson> doRetrieveAllByCourse(int courseId){
        ArrayList<Lesson> lista=new ArrayList<Lesson>();
        PreparedStatement st;
        ResultSet rs;
        Lesson p;
        try(Connection con=ConPool.getConnection()){
            st= con.prepareStatement("SELECT * from Lesson WHERE course=? order by date ");
            st.setInt(1,courseId);
            rs = st.executeQuery();
            while(rs.next()) {
                p = new Lesson();
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
}
