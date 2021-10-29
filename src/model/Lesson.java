package model;

import java.util.Objects;

public class Lesson {
    private String date;
    private String hour;
    private Course course;
    private String classroom;

    public Lesson() {
    }

    public Lesson(String date, String hour, Course course, String classroom) {
        this.date = date;
        this.hour = hour;
        this.course = course;
        this.classroom = classroom;
    }

    public String getDate() {
        return date;
    }

    public String getHour() {
        return hour;
    }

    public Course getCourse() {
        return course;
    }

    public String getClassroom() {
        return classroom;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Lesson lesson = (Lesson) o;
        return course == lesson.course &&
                date.equals(lesson.date) &&
                hour.equals(lesson.hour);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, hour, course);
    }
}
