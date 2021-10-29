package model;

import java.sql.*;
import java.util.ArrayList;

public class DidacticMaterialDAO {

    public DidacticMaterial doRetrieveByUrl(String url){
        try {
            Connection cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            DidacticMaterial did = null;
            ResultSet rs = st.executeQuery("SELECT * FROM DidacticMaterial D WHERE D.url='" + url + "';");
            if (rs.next()) {
                int course = rs.getInt(2);
                CourseDAO cd = new CourseDAO();
                Course c = cd.doRetrieveById(course);
                did = new DidacticMaterial(rs.getString(1), c, rs.getString(3));
            }
            st.close();
            cn.close();
            return did;
        }
        catch(SQLException ex){
            throw new RuntimeException(ex);
        }
    }

    public void doDeleteByUrl(String url){
        Connection cn = null;
        try {
            cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            DidacticMaterial did = null;
            st.executeUpdate("DELETE FROM DidacticMaterial D WHERE D.url='" + url + "';");
            st.close();
            cn.close();
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void doSave(DidacticMaterial did) {
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "insert into DidacticMaterial(url, course, description) values (?,?,?);");
            ps.setString(1, did.getUrl());
            ps.setInt(2, did.getCourse().getId());
            ps.setString(3, did.getDescription());
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

    public void doUpdate(DidacticMaterial did){
        try{
            Connection cn = ConPool.getConnection();
            PreparedStatement ps =
                    cn.prepareStatement("update DidacticMaterial set course=?, description=? where url=?;");
            ps.setInt(1, did.getCourse().getId());
            ps.setString(2, did.getDescription());
            ps.setString(3, did.getUrl());
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

    public ArrayList<DidacticMaterial> doRetrieveAll(){

        try {
            Connection cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            ArrayList<DidacticMaterial> dids = new ArrayList<>();
            ResultSet rs = st.executeQuery("SELECT * FROM DidacticMaterial WHERE 1=1;");
            CourseDAO cd = new CourseDAO();
            while (rs.next()) {
                DidacticMaterial did = new DidacticMaterial(rs.getString("url"),
                        cd.doRetrieveById(rs.getInt("course")), rs.getString("description"));
                dids.add(did);
            }
            st.close();
            cn.close();
            return dids;
        }
        catch(SQLException ex){
            throw new RuntimeException(ex);
        }
    }
}
