package model;

import java.util.Objects;

public class DidacticMaterial {
    public DidacticMaterial(String url, Course c, String description){
        this.url = url;
        this.course = c;
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course c) {
        this.course = c;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DidacticMaterial that = (DidacticMaterial) o;
        return Objects.equals(url, that.url) &&
                Objects.equals(course, that.course);
    }

    @Override
    public int hashCode() {
        return Objects.hash(url, course);
    }

    @Override
    public String toString() {
        return "DidacticMaterial{" +
                "url='" + url + '\'' +
                ", course=" + course +
                ", description='" + description + '\'' +
                '}';
    }

    private String url;
    private Course course;
    private String description;
}
