package model;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.sql.*;
import java.util.*;

public class TeacherDAO {

    public void doUpdate(Teacher t){
        try {
            UserDAO ud = new UserDAO();
            ud.doUpdate(t);
            Connection cn = ConPool.getConnection();
            PreparedStatement st = cn.prepareStatement("update Teacher set curriculum=? where Teacher.user=?;");
            st.setString(1, t.getCurriculum());
            st.setString(2, t.getUsername());
            st.executeUpdate();
            cn.close();
        }
        catch(SQLException e){
            return;
        }
    }

    public void doSave(Teacher t){
        try {
            UserDAO ud = new UserDAO();
            ud.doSave(t);
            Connection cn = ConPool.getConnection();
            PreparedStatement st = cn.prepareStatement("insert into Teacher(user, curriculum) values (?, ?);");
            st.setString(1, t.getUsername());
            st.setString(2, t.getCurriculum());
            st.executeUpdate();
            st.close();
            cn.close();
        }
        catch(SQLException e){
            return;
        }
    }

    public Teacher doRetrieveByUsernamePassword(String username, String password){
        try {
            UserDAO ud = new UserDAO();
            User u = ud.doRetrieveByUsernamePassword(username, password);
            Teacher t = null;
            Connection cn = ConPool.getConnection();
            PreparedStatement st = cn.prepareStatement("select T.user, curriculum from Teacher T, User U where T.user = U.username AND T.user=? AND U.passwordHash=SHA1(?);");
            st.setString(1, username);
            st.setString(2, password);
            ResultSet rs = st.executeQuery();
            if(rs.next()){
                t = new Teacher(u, rs.getString("curriculum"));
            }
            cn.close();
            return t;
        }
        catch(SQLException e){
            return null;
        }
    }

    public Teacher doRetrieveByUsername(String username){
        try {
            UserDAO ud = new UserDAO();
            User u = ud.doRetrieveByUsername(username);
            Teacher t = null;
            Connection cn = ConPool.getConnection();
            PreparedStatement st = cn.prepareStatement("select T.user, curriculum from Teacher T where T.user=?");
            st.setString(1, username);
            ResultSet rs = st.executeQuery();
            if(rs.next()){
                t = new Teacher(u, rs.getString("curriculum"));
            }
            cn.close();
            return t;
        }
        catch(SQLException e){
            return null;
        }
    }

    public void doDeleteByUsername(String username){
        try {
            Connection cn = ConPool.getConnection();
            UserDAO ud = new UserDAO();
            PreparedStatement st = cn.prepareStatement("delete from Teacher where Teacher.user=?");
            st.setString(1, username);
            st.executeUpdate();
            st.close();
            cn.close();
            ud.doDeleteByUsername(username);
        }
        catch(SQLException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public ArrayList<Teacher> doRetrieveAll(){
        ArrayList<Teacher> teachers = new ArrayList<>();
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st = cn.prepareStatement("select * from User U, Teacher T where T.user=U.username;");
            ResultSet rs = st.executeQuery();
            User u = null;
            Teacher t = null;
            while(rs.next()) {
                u = new User();
                u.setUsername(rs.getString("username"));
                u.setPasswordHash(rs.getString("passwordHash"));
                u.setMail(rs.getString("mail"));
                u.setName(rs.getString("name"));
                u.setSurname(rs.getString("surname"));
                u.setCF(rs.getString("CF"));
                u.setBirthDate(rs.getString("birthDate"));
                u.setStreet(rs.getString("street"));
                u.setProvince(rs.getString("province"));
                u.setNumber(rs.getString("number"));
                u.setCAP(rs.getInt("CAP"));
                u.setCity(rs.getString("city"));
                u.setTelephone(rs.getString("telephone"));
                u.setRoot(rs.getBoolean("root"));
                t = new Teacher(u, rs.getString("curriculum"));
                teachers.add(t);
            }
            rs.close();
            st.close();
            cn.close();
            return teachers;
        }
        catch(SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<Teacher> doRetrieveByUsernameFragment(@NotNull String usernameFragment, int offset, int limit){
        ArrayList<Teacher> teachers = new ArrayList<>();
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "select * from User U, Teacher T where T.user=U.username AND lower(T.user) like ? limit ? offset ?;");
            ps.setString(1, "%" + usernameFragment.toLowerCase() + "%");
            ps.setInt(2, limit);
            ps.setInt(3, offset);
            ResultSet rs = ps.executeQuery();
            User u = null;
            Teacher t = null;
            while(rs.next()) {
                u = new User();
                u.setUsername(rs.getString("username"));
                u.setPasswordHash(rs.getString("passwordHash"));
                u.setMail(rs.getString("mail"));
                u.setName(rs.getString("name"));
                u.setSurname(rs.getString("surname"));
                u.setCF(rs.getString("CF"));
                u.setBirthDate(rs.getString("birthDate"));
                u.setStreet(rs.getString("street"));
                u.setProvince(rs.getString("province"));
                u.setNumber(rs.getString("number"));
                u.setCAP(rs.getInt("CAP"));
                u.setCity(rs.getString("city"));
                u.setTelephone(rs.getString("telephone"));
                u.setRoot(rs.getBoolean("root"));
                t = new Teacher(u, rs.getString("curriculum"));
                teachers.add(t);
            }
            rs.close();
            ps.close();
            cn.close();
            return teachers;
        }
        catch(SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<Teacher> doRetrieveByNameAndSurnameFragment(@NotNull String nameFragment, int offset, int limit){
        ArrayList<Teacher> teachers = new ArrayList<>();
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "select * from User U, Teacher T where T.user=U.username AND " +
                            "lower(concat_ws(' ', U.name, U.surname)) like ? limit ? offset ?;");
            ps.setString(1, "%" + nameFragment.toLowerCase() + "%");
            ps.setInt(2, limit);
            ps.setInt(3, offset);
            ResultSet rs = ps.executeQuery();
            User u = null;
            Teacher t = null;
            while(rs.next()) {
                u = new User();
                u.setUsername(rs.getString(1));
                u.setPasswordHash(rs.getString(2));
                u.setMail(rs.getString(3));
                u.setName(rs.getString(4));
                u.setSurname(rs.getString(5));
                u.setCF(rs.getString(6));
                u.setBirthDate(rs.getString(7));
                u.setStreet(rs.getString(8));
                u.setProvince(rs.getString(9));
                u.setNumber(rs.getString(10));
                u.setCAP(rs.getInt(11));
                u.setCity(rs.getString(12));
                u.setTelephone(rs.getString(13));
                u.setRoot(rs.getBoolean(14));
                t = new Teacher(u, rs.getString("curriculum"));
                teachers.add(t);
            }
            rs.close();
            ps.close();
            cn.close();
            return teachers;
        }
        catch(SQLException e){
            return null;
        }
    }
}
