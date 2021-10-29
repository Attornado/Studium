package model;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.sql.*;
import java.util.ArrayList;

public class UserDAO {

    public void doUpdate(User u){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st =
                    cn.prepareStatement("update User set passwordHash=?, mail=?, name=?, surname=?, CF=?," +
                            "birthDate=?, street=?, province=?, number=?, CAP=?, city=?, telephone=?, root=? where username=?;");

            st.setString(1, u.getPasswordHash());
            st.setString(2, u.getMail());
            st.setString(3, u.getName());
            st.setString(4, u.getSurname());
            st.setString(5, u.getCF());
            st.setString(6, u.getBirthDate());
            st.setString(7, u.getStreet());
            st.setString(8, u.getProvince());
            st.setString(9, u.getNumber());
            st.setInt(10, u.getCAP());
            st.setString(11, u.getCity());
            st.setString(12, u.getTelephone());
            st.setBoolean(13, u.isRoot());
            st.setString(14, u.getUsername());
            st.executeUpdate();
            st.close();
            cn.close();
        }
        catch(SQLException e){
            throw new RuntimeException(e);
        }
    }

    public void doSave(User u){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st =
                    cn.prepareStatement("insert into User(username, passwordHash, mail, name, surname, CF," +
                            "birthDate, street, province, number, CAP, city, telephone, root) values " +
                            " (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");

            st.setString(1, u.getUsername());
            st.setString(2, u.getPasswordHash());
            st.setString(3, u.getMail());
            st.setString(4, u.getName());
            st.setString(5, u.getSurname());
            st.setString(6, u.getCF());
            st.setString(7, u.getBirthDate());
            st.setString(8, u.getStreet());
            st.setString(9, u.getProvince());
            st.setString(10, u.getNumber());
            st.setInt(11, u.getCAP());
            st.setString(12, u.getCity());
            st.setString(13, u.getTelephone());
            st.setBoolean(14, u.isRoot());
            st.executeUpdate();
            st.close();
            cn.close();
        }
        catch(SQLException e){
            throw new RuntimeException(e);
        }
    }

    public User doRetrieveByUsernamePassword(String username, String password){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st =
                    cn.prepareStatement("select * from User U where U.username=? AND U.passwordHash=SHA1(?);");
            st.setString(1, username);
            st.setString(2, password);
            ResultSet rs = st.executeQuery();
            User u = null;
            if (rs.next()) {
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
            }
            rs.close();
            st.close();
            cn.close();
            return u;
        }
        catch(SQLException e){
            return null;
        }
    }

    public User doRetrieveByUsername(String username){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st =
                    cn.prepareStatement("select * from User U where U.username=?;");
            st.setString(1, username);
            ResultSet rs = st.executeQuery();
            User u = null;
            if (rs.next()) {
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
            }
            rs.close();
            st.close();
            cn.close();
            return u;
        }
        catch(SQLException e){
            return null;
        }
    }

    public User doRetrieveByMail(String mail){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st =
                    cn.prepareStatement("select * from User U where U.mail=?;");
            st.setString(1, mail);
            ResultSet rs = st.executeQuery();
            User u = null;
            if (rs.next()) {
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
            }
            rs.close();
            st.close();
            cn.close();
            return u;
        }
        catch(SQLException e){
            return null;
        }
    }

    public User doRetrieveByCF(String cf){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st =
                    cn.prepareStatement("select * from User U where U.cf=?;");
            st.setString(1, cf);
            ResultSet rs = st.executeQuery();
            User u = null;
            if (rs.next()) {
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
            }
            rs.close();
            st.close();
            cn.close();
            return u;
        }
        catch(SQLException e){
            return null;
        }
    }

    public void doDeleteByUsername(String username){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st =
                    cn.prepareStatement("delete from User where username=?;");
            st.setString(1, username);
            st.executeUpdate();
            st.close();
            cn.close();
        }
        catch(SQLException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public ArrayList<User> doRetrieveAll(){
        ArrayList<User> users = new ArrayList<>();
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st = cn.prepareStatement("select * from User U where 1=1");
            ResultSet rs = st.executeQuery();
            User u = null;
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
                users.add(u);
            }
            rs.close();
            st.close();
            cn.close();
            return users;
        }
        catch(SQLException e){
            return null;
        }
    }

    public ArrayList<User> doRetrieveByCourseName(String name){
        ArrayList<User> users = new ArrayList<>();
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement st = cn.prepareStatement("select distinct U.username, U.passwordHash, U.mail, " +
                    "U.name, U.surname, U.CF, U.birthDate, U.street, U.province, U.number, U.CAP, U.city, " +
                    "U.telephone, U.root "+
                    "from User U, Enrollment E, Course C " +
                    "where U.username = E.user AND E.course = C.id AND C.name=?");
            st.setString(1, name);
            ResultSet rs = st.executeQuery();
            User u = null;
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
                users.add(u);
            }
            rs.close();
            st.close();
            cn.close();
            return users;
        }
        catch(SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<User> doRetrieveByUsernameFragment(@NotNull String usernameFragment, int offset, int limit){
        ArrayList<User> users = new ArrayList<>();
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "select * from User U where lower(U.username) like ? limit ? offset ?;");
            ps.setString(1, "%" + usernameFragment.toLowerCase() + "%");
            ps.setInt(2, limit);
            ps.setInt(3, offset);
            ResultSet rs = ps.executeQuery();
            User u = null;
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
                users.add(u);
            }
            rs.close();
            ps.close();
            cn.close();
            return users;
        }
        catch(SQLException e){
            return null;
        }
    }

    public ArrayList<User> doRetrieveUserByUsernameFragmentAndCourse(@NotNull String usernameFragment, int offset,
                                                                     int limit, int courseId){
        ArrayList<User> users = new ArrayList<>();
        try{
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "select * from User U, Enrollment E where U.username = E.user AND E.course = ? AND lower(U.username) like ? limit ? offset ?;");
            ps.setInt(1, courseId);
            ps.setString(2, "%"+usernameFragment.toLowerCase()+"%");
            ps.setInt(3, limit);
            ps.setInt(4, offset);
            ResultSet rs = ps.executeQuery();
            User u = null;
            while (rs.next()){
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
                users.add(u);
            }
            rs.close();
            ps.close();
            cn.close();
            return users;
        }
        catch (SQLException e){
            return null;
        }
    }

    public ArrayList<User> doRetrieveAdminByUsernameFragment(@NotNull String usernameFragment, int offset, int limit){
        ArrayList<User> users = new ArrayList<>();
        try{
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "select * from User U where U.root = 1 AND lower(U.username) like ? limit ? offset ?;");
            ps.setString(1, "%"+usernameFragment.toLowerCase()+"%");
            ps.setInt(2, limit);
            ps.setInt(3, offset);
            ResultSet rs = ps.executeQuery();
            User u = null;
            while (rs.next()){
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
                users.add(u);
            }
            rs.close();
            ps.close();
            cn.close();
            return users;
        }
        catch (SQLException e){
            return null;
        }
    }

    public ArrayList<User> doRetrieveAllAdmin(){
        ArrayList<User> admins = new ArrayList<>();
        try{
            Connection cn = ConPool.getConnection();
            PreparedStatement st = cn.prepareStatement("select * from User u where u.root = 1");
            ResultSet rs = st.executeQuery();
            User u = null;
            while (rs.next()){
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
                admins.add(u);
            }
            rs.close();
            st.close();
            cn.close();
            return admins;
        }
        catch (SQLException e){
            return null;
        }
    }
}

