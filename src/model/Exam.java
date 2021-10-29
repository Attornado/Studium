package model;
import java.util.Objects;

public class Exam {

    public Exam(){

    }

    public Exam(String date, String hour, Course course, String classroom){
        this.date = date;
        this.hour = hour;
        this.course = course;
        this.classroom = classroom;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Exam exam = (Exam) o;
        return hour == exam.hour &&
                Objects.equals(date, exam.date) &&
                Objects.equals(course, exam.course);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, hour, course);
    }

    private String date;
    private String hour;
    private Course course;
    private String classroom;
}
