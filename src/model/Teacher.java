package model;

public class Teacher extends User {

    public Teacher(){

    }

    public Teacher(User u, String curriculum){
        super(u.getUsername(), u.getMail(), u.getName(), u.getSurname(),
                u.getCF(), u.getBirthDate(), u.getStreet(), u.getProvince(), u.getNumber(), u.getCity(),
                u.getTelephone(), u.getCAP(), u.isRoot());
        this.curriculum=curriculum;
        this.setPasswordHash(u.getPasswordHash());
    }

    public Teacher(String username, String password, String mail, String name, String surname, String CF,
                   String birthDate, String street, String province, String number, String city, String telephone,
                   int CAP, boolean root, String curriculum) {
        super(username, password, mail, name, surname, CF, birthDate, street, province, number, city, telephone, CAP,
                root);
        this.curriculum = curriculum;
    }

    public String getCurriculum() { return curriculum;
    }

    public void setCurriculum(String curriculum) {
        this.curriculum = curriculum;
    }

    private String curriculum;
}
