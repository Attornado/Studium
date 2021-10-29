package model;
import java.sql.*;
import java.util.ArrayList;

public class CategoryDAO {

    public Category doRetrieveByName(String name) {
        Connection cn = null;
        try {
            cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            Category category = null;
            ResultSet rs = st.executeQuery("SELECT * FROM Category C WHERE C.name='" + name + "';");
            if (rs.next()) {
                category = new Category(rs.getString(1), rs.getString(2), rs.getString(3));
            }
            st.close();
            cn.close();
            return category;
        } catch (SQLException e) {
            return null;
        }
    }

    public void doDeleteByName(String name) {
        Connection cn = null;
        try {
            cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            st.executeUpdate("DELETE FROM Category WHERE name='" + name + "';");
            st.close();
            cn.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void doSave(Category c) {
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "INSERT INTO Category (name, description, imagePath) VALUES (?,?, ?);");
            ps.setString(1, c.getName());
            ps.setString(2, c.getDescription());
            ps.setString(3, c.getImagePath());
            if (ps.executeUpdate() != 1) {
                throw new RuntimeException("INSERT error.");
            }
            ps.close();
            cn.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void doUpdateByName(Category c, String oldName) {
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "update Category set name=?, description=?, imagePath=? where name=?");
            ps.setString(1, c.getName());
            ps.setString(2, c.getDescription());
            ps.setString(3, c.getImagePath());
            ps.setString(4, oldName);
            if (ps.executeUpdate() != 1) {
                throw new RuntimeException("INSERT error.");
            }
            ps.close();
            cn.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public ArrayList<Category> doRetrieveAll() throws SQLException {
        Connection cn = ConPool.getConnection();
        Statement st = cn.createStatement();
        ArrayList<Category> categories = new ArrayList<>();
        ResultSet rs = st.executeQuery("SELECT * FROM Category WHERE 1=1;");
        while (rs.next()) {
            Category category = new Category(rs.getString(1), rs.getString(2),
                    rs.getString(3));
            categories.add(category);
        }
        st.close();
        cn.close();
        return categories;
    }
}
