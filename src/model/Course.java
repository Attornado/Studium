package model;


import java.util.Objects;

public class Course {
    public Course(String name, String category, int year, String startDate, String endDate,
                  double price, String description, String certificate, int numEnrolled, Teacher teacher,
                  String imagePath){
        this.name = name;
        this.category = category;
        this.year = year;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.description = description;
        this.certificate = certificate;
        this.teacher = teacher;
        this.numEnrolled = numEnrolled;
        this.imagePath = imagePath;
    }

    public Course(int id, String name, String category, int year, String startDate, String endDate,
                  double price, String description, String certificate, int numEnrolled, Teacher teacher,
                  String imagePath){
        this.name = name;
        this.category = category;
        this.year = year;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.description = description;
        this.certificate = certificate;
        this.teacher = teacher;
        this.id = id;
        this.numEnrolled = numEnrolled;
        this.imagePath = imagePath;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public int getYear() {
        return year;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getCertificate() {
        return certificate;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public void setTeacher(Teacher t) {
        this.teacher = t;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumEnrolled() {
        return numEnrolled;
    }

    public void setNumEnrolled(int numEnrolled) {
        this.numEnrolled = numEnrolled;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course) o;
        return id == course.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", year=" + year +
                ", numEnrolled=" + numEnrolled +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", certificate='" + certificate + '\'' +
                ", teacher=" + teacher +
                ", imagePath='" + imagePath + '\'' +
                '}';
    }

    private int id;
    private String name;
    private String category;
    private int year;
    private int numEnrolled;
    private String startDate;
    private String endDate;
    private double price;
    private String description;
    private String certificate;
    private Teacher teacher;
    private String imagePath;
}
