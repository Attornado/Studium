package model;
import java.util.*;

public class Enrollment {

    public Enrollment(){

    }

    public Enrollment(String username, int idCourse) {
        this.username = username;
        this.idCourse = idCourse;
        this.passed = false;
    }

    public Enrollment(String username, int idCourse, boolean passed) {
        this.username = username;
        this.idCourse = idCourse;
        this.passed = passed;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getIdCourse() {
        return idCourse;
    }

    public void setIdCourse(int idCourse) {
        this.idCourse = idCourse;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Enrollment that = (Enrollment) o;
        return idCourse == that.idCourse &&
                passed == that.passed &&
                username.equals(that.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, idCourse, passed);
    }

    @Override
    public String toString() {
        return "Enrollment{" +
                "username='" + username + '\'' +
                ", idCourse=" + idCourse +
                ", passed=" + passed +
                '}';
    }

    private String username;
    private int idCourse;
    private boolean passed;
}
