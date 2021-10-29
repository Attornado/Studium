package model;
import java.sql.*;
import java.util.*;

public class EnrollmentDAO {

    public Enrollment doRetrieveByUsernameIdCourse(String username, int idCourse){
        try{
            Connection cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM Enrollment E WHERE E.user ='" + username + "' AND " +
                    " E.course=" + idCourse + ";");
            Enrollment en = null;
            if(rs.next()){
                en = new Enrollment();
                en.setIdCourse(rs.getInt(2));
                en.setUsername(rs.getString(1));
                en.setPassed(rs.getBoolean(3));
            }
            rs.close();
            st.close();
            cn.close();
            return en;
        }
        catch (SQLException e){
            return null;
        }
    }

    public void doDeleteByUsernameIdCourse(String username, int idCourse){
        try{
            Connection cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            st.executeUpdate("DELETE FROM Enrollment WHERE Enrollment.user='" + username+ "' " +
                    "AND enrollment.course=" + idCourse + ";");
            st.close();
            cn.close();
        }
        catch (SQLException e){
            return;
        }
    }

    public void doSave(Enrollment e) {
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "INSERT INTO Enrollment (user, course) VALUES(?, ?);");
            ps.setString(1, e.getUsername());
            ps.setInt(2, e.getIdCourse());
            if (ps.executeUpdate() != 1) {
                throw new RuntimeException("INSERT error.");
            }
            ps.close();
            cn.close();
        }
        catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }

    public void doSetPassed(Enrollment en, boolean passed){

        try{
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement("update Enrollment set passed=? where Enrollment.user=? AND"
                           + " Enrollment.course=?;");
            ps.setInt(3, en.getIdCourse());
            ps.setString(2, en.getUsername());
            ps.setBoolean(1, passed);
            if (ps.executeUpdate() != 1) {
                throw new RuntimeException("INSERT error.");
            }
            ps.close();
            cn.close();
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public ArrayList<Enrollment> doRetrieveAll() throws SQLException {
        ArrayList<Enrollment> enrollments = new ArrayList<>();
        Connection cn = ConPool.getConnection();
        Statement st = cn.createStatement();
        ResultSet rs = st.executeQuery("SELECT * FROM Enrollment E WHERE 1=1;");
        Enrollment en = null;
        while(rs.next()){
            en = new Enrollment(rs.getString(1), rs.getInt(2), rs.getBoolean(3));
            enrollments.add(en);
        }
        rs.close();
        st.close();
        cn.close();
        return enrollments;
    }
}
