package model;
import org.jetbrains.annotations.*;
import java.util.*;

public class Cart {

    public Cart(){
        this.courses = new HashMap<>();
        this.nameMap = new HashMap<>();
        this.totalPrice = 0;
    }

    public boolean isEmpty(){
        return this.courses.isEmpty();
    }

    public boolean addCourse(@NotNull Course c){
        if(courses.get(c.getId()) == null)
            this.totalPrice += c.getPrice();
        this.courses.putIfAbsent(c.getId(), c);
        return this.nameMap.putIfAbsent(c.getName(), c.getId()) == null; //ritorna null se l'elemento
    }

    public boolean removeCourse(@NotNull Course c){
        Course removed = courses.remove(c.getId());
        if(removed != null) {
            this.nameMap.remove(removed.getName());
            this.totalPrice -= removed.getPrice();
            return true;
        }
        return false;
    }

    public boolean removeCourse(@NotNull String name){
        Course removed = courses.remove(nameMap.get(name));
        if(removed != null) {
            this.nameMap.remove(removed.getName());
            this.totalPrice -= removed.getPrice();
            return true;
        }
        return false;
    }

    public boolean removeCourse(int id){
        Course removed = courses.remove(id);
        if(removed != null) {
            this.nameMap.remove(removed.getName());
            this.totalPrice -= removed.getPrice();
            return true;
        }
        return false;
    }

    public double getTotalPrice(){
        return this.totalPrice;
    }

    public @Nullable Course getCourse(int id){
        return courses.get(id);
    }

    public @Nullable Course getCourse(@NotNull String name){
        return courses.get(nameMap.get(name));
    }

    public @NotNull ArrayList<String> getNameList(){
        Set<String> nameSet = nameMap.keySet();
        return new ArrayList<>(nameSet);
    }


    public double empty(){
        double oldTotalPrice = this.totalPrice;
        this.nameMap = new HashMap<>();
        this.courses = new HashMap<>();
        this.totalPrice = 0;
        return  oldTotalPrice;
    }

    private @NotNull HashMap<String, Integer> nameMap;
    private @NotNull HashMap<Integer, Course> courses;
    private double totalPrice;
}
