package model;
import org.jetbrains.annotations.*;
import java.sql.*;
import java.util.ArrayList;

public class CourseDAO {

    @Nullable
    public Course doRetrieveById(int id){
        try {
            Connection cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            Course course = null;
            ResultSet rs = st.executeQuery("SELECT * FROM Course C WHERE C.id=" + id);
            if (rs.next()) {
                String username = rs.getString("teacher");
                course = new Course(rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), null,
                        rs.getString("imagePath"));
                TeacherDAO teacherdao = new TeacherDAO();
                Teacher t = teacherdao.doRetrieveByUsername(username);
                course.setTeacher(t);
            }
            st.close();
            cn.close();
            return course;
        }catch (SQLException e){
            return null;
        }
    }

    @Nullable
    public Course doRetrieveByName(@NotNull String courseName){
        try {
            Connection cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            Course course = null;
            ResultSet rs = st.executeQuery("SELECT * FROM Course C WHERE C.name='" + courseName + "';");
            if(rs.next()) {
                String username = rs.getString("teacher");
                course = new Course(rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), null,
                        rs.getString("imagePath"));
                TeacherDAO teacherdao = new TeacherDAO();
                Teacher t = teacherdao.doRetrieveByUsername(username);
                course.setTeacher(t);
            }
            st.close();
            cn.close();
            return course;
        }
        catch (SQLException e){
            return null;
        }
    }

    public void doDeleteById(int id){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement("DELETE FROM Course WHERE id=?;");
            ps.setInt(1, id);
            ps.executeUpdate();
            ps.close();
            cn.close();
        }catch (SQLException e){
            throw new RuntimeException(e);
        }
    }

    public void doSave(@NotNull Course c) {
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "INSERT INTO Course(name, category, year, startDate, endDate, price, description, certificate," +
                            " teacher, imagePath) VALUES (?,?,?,?,?,?,?,?,?,?);");
            ps.setString(1, c.getName());
            ps.setString(2, c.getCategory());
            ps.setInt(3, c.getYear());
            ps.setString(4, c.getStartDate());
            ps.setString(5, c.getEndDate());
            ps.setDouble(6, c.getPrice());
            ps.setString(7, c.getDescription());
            ps.setString(8, c.getCertificate());
            ps.setString(9, c.getTeacher().getUsername());
            ps.setString(10, c.getImagePath());
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

    public void doUpdate(@NotNull Course c, @NotNull String oldName){
        try{
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement("update Course set name=?, category=?, year=?, startDate=?, " +
                    "endDate=?, price=?, description=?, teacher=?, imagePath=?, certificate=? where name=?;");
            ps.setString(1, c.getName());
            ps.setString(2, c.getCategory());
            ps.setInt(3, c.getYear());
            ps.setString(4, c.getStartDate());
            ps.setString(5, c.getEndDate());
            ps.setDouble(6, c.getPrice());
            ps.setString(7, c.getDescription());
            ps.setString(8, c.getTeacher().getUsername());
            ps.setString(9, c.getImagePath());
            ps.setString(10, c.getCertificate());
            ps.setString(11, oldName);
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

    @Nullable
    public ArrayList<Course> doRetrieveAll(){
        try {
            Connection cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            ArrayList<Course> courses = new ArrayList<>();
            ResultSet rs = st.executeQuery("SELECT * FROM Course WHERE 1=1;");
            while (rs.next()) {
                String username = rs.getString("teacher");
                TeacherDAO td = new TeacherDAO();
                Teacher t = td.doRetrieveByUsername(username);
                Course course = new Course(rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), t,
                        rs.getString("imagePath"));
                courses.add(course);
            }
            st.close();
            cn.close();
            return courses;
        }
        catch (SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<Course> doRetrieveByCategory(@NotNull String categoryName){
        try {
            Connection cn = ConPool.getConnection();
            Statement st = cn.createStatement();
            ArrayList<Course> courses = new ArrayList<>();
            ResultSet rs = st.executeQuery("SELECT * FROM Course WHERE category='" + categoryName + "';");
            while (rs.next()) {
                String username = rs.getString("teacher");
                TeacherDAO td = new TeacherDAO();
                Teacher t = td.doRetrieveByUsername(username);
                Course course = new Course(rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), t,
                        rs.getString("imagePath"));
                courses.add(course);
            }
            st.close();
            cn.close();
            return courses;
        }
        catch (SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<Course> doRetrieveByUser(@NotNull User u){
        try {
            Connection cn = model.ConPool.getConnection();
            Statement st = cn.createStatement();
            ArrayList<Course> courses = new ArrayList<>();
            ResultSet rs = st.executeQuery("SELECT DISTINCT * FROM Course c, Enrollment e " +
                    "WHERE e.course=c.id AND e.user='" + u.getUsername() + "';");
            while (rs.next()) {
                String username = rs.getString("teacher");
                Course course = new Course(rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), null,
                        rs.getString("imagePath"));
                TeacherDAO teacherdao = new TeacherDAO();
                Teacher t = teacherdao.doRetrieveByUsername(username);
                course.setTeacher(t);
                courses.add(course);
            }
            rs.close();
            st.close();
            cn.close();
            return courses;
        }
        catch (SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<Course> doRetrieveByTeacher(@NotNull String teacherUsername){
        try {
            Connection cn = ConPool.getConnection();
            TeacherDAO td = new TeacherDAO();
            ArrayList<Course> courses = new ArrayList<>();
            Teacher t = td.doRetrieveByUsername(teacherUsername);
            PreparedStatement ps = cn.prepareStatement("select * from Course where lower(teacher)=?");
            ResultSet rs;
            ps.setString(1, teacherUsername.toLowerCase());
            rs = ps.executeQuery();
            while (rs.next()) {
                Course course = new Course(
                        rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), t,
                        rs.getString("imagePath"));
                courses.add(course);
            }
            ps.close();
            cn.close();
            return courses;
        }
        catch (SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<Course> doRetrieveByTeacherFragment(@NotNull String teacherUsername, int offset, int limit){
        try{
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "select * from Course C where lower(C.teacher) = '"+teacherUsername+"' limit ? offset ?");
            ArrayList<Course> courses = new ArrayList<>();
            ps.setInt(1, limit);
            ps.setInt(2, offset);
            ResultSet rs = ps.executeQuery();
            while (rs.next()){
                String username = rs.getString("teacher");
                TeacherDAO td = new TeacherDAO();
                Teacher t = td.doRetrieveByUsername(username);
                Course course = new Course(
                        rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), t,
                        rs.getString("imagePath")
                );
                courses.add(course);
            }
            ps.close();
            cn.close();
            return courses;
        }
        catch (SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<Course> doRetrieveByNameFragment(@NotNull String nameFragment, int offset, int limit){
        try {
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(
                    "select * from Course C where lower(C.name) like ? limit ? offset ?;");
            ArrayList<Course> courses = new ArrayList<>();
            ps.setString(1, "%" + nameFragment.toLowerCase() + "%");
            ps.setInt(2, limit);
            ps.setInt(3, offset);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String username = rs.getString("teacher");
                TeacherDAO td = new TeacherDAO();
                Teacher t = td.doRetrieveByUsername(username);
                Course course = new Course(
                        rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), t,
                        rs.getString("imagePath"));
                courses.add(course);
            }
            ps.close();
            cn.close();
            return courses;
        }
        catch (SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<Course> doRetrieveByNameFragmentFilters(@NotNull String nameFragment, int maxPrice,
                                                             int offset, int limit, @NotNull String orderType){
        try {
            String stmt = "select * from Course C where lower(C.name) like ? ";
            if(maxPrice != 0)
                stmt += "AND C.price <= ? ";
            stmt +=  "order by C.price " + orderType + " limit ? offset ?;";
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(stmt);
            ArrayList<Course> courses = new ArrayList<>();
            ps.setString(1, "%" + nameFragment.toLowerCase() + "%");
            if(maxPrice != 0){
                ps.setInt(2, maxPrice);
                ps.setInt(3, limit);
                ps.setInt(4, offset);
            }
            else {
                ps.setInt(2, limit);
                ps.setInt(3, offset);
            }
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String username = rs.getString("teacher");
                TeacherDAO td = new TeacherDAO();
                Teacher t = td.doRetrieveByUsername(username);
                Course course = new Course(
                        rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), t,
                        rs.getString("imagePath")
                );
                courses.add(course);
            }
            ps.close();
            cn.close();
            return courses;
        }
        catch (SQLException e){
            return null;
        }
    }

    @Nullable
    public ArrayList<Course> doRetrieveByDescriptionFragmentFilters(@NotNull String descriptionFragment, int maxPrice,
                                                                    int offset, int limit, @NotNull String orderType){
        try {
            String stmt = "select * from Course C where lower(C.description) like ? ";
            if(maxPrice != 0)
                stmt += "AND C.price <= ? ";
            stmt += "order by C.price " + orderType + " limit ? offset ?;";
            Connection cn = ConPool.getConnection();
            PreparedStatement ps = cn.prepareStatement(stmt);
            ArrayList<Course> courses = new ArrayList<>();
            ps.setString(1, "%" + descriptionFragment.toLowerCase() + "%");
            if(maxPrice != 0){
                ps.setInt(2, maxPrice);
                ps.setInt(3, limit);
                ps.setInt(4, offset);
            }
            else {
                ps.setInt(2, limit);
                ps.setInt(3, offset);
            }
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String username = rs.getString("teacher");
                TeacherDAO td = new TeacherDAO();
                Teacher t = td.doRetrieveByUsername(username);
                Course course = new Course(
                        rs.getInt("id"), rs.getString("name"),
                        rs.getString("category"), rs.getInt("year"),
                        rs.getString("startDate"), rs.getString("endDate"),
                        rs.getDouble("price"), rs.getString("description"),
                        rs.getString("certificate"), rs.getInt("numEnrolled"), t,
                        rs.getString("imagePath")
                );
                courses.add(course);
            }
            ps.close();
            cn.close();
            return courses;
        }
        catch (SQLException e){
            return null;
        }
    }
}
