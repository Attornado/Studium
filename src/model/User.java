package model;
import java.math.*;
import java.nio.charset.*;
import java.security.*;
import java.util.*;

public class User {

    public User(){

    }

    public User(String username, String mail, String name, String surname, String CF,
               String birthDate, String street, String province, String number, String city, String telephone,
               int CAP, boolean root) {
        this.username = username;
        this.mail = mail;
        this.name = name;
        this.surname = surname;
        this.CF = CF;
        this.birthDate = birthDate;
        this.street = street;
        this.province = province;
        this.number = number;
        this.city = city;
        this.telephone = telephone;
        this.CAP = CAP;
        this.root = root;
        this.passwordHash = "";
    }

    public User(String username, String password, String mail, String name, String surname, String CF,
                String birthDate, String street, String province, String number, String city, String telephone,
                int CAP, boolean root) {
        this.username = username;
        this.mail = mail;
        this.name = name;
        this.surname = surname;
        this.CF = CF;
        this.birthDate = birthDate;
        this.street = street;
        this.province = province;
        this.number = number;
        this.city = city;
        this.telephone = telephone;
        this.CAP = CAP;
        this.root = root;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            digest.reset();
            digest.update(password.getBytes(StandardCharsets.UTF_8));
            this.passwordHash = String.format("%040x", new BigInteger(1, digest.digest()));
        }
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            digest.reset();
            digest.update(password.getBytes(StandardCharsets.UTF_8));
            this.passwordHash = String.format("%040x", new BigInteger(1, digest.digest()));
        }
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getCF() {
        return CF;
    }

    public void setCF(String CF) {
        this.CF = CF;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public int getCAP() {
        return CAP;
    }

    public void setCAP(int CAP) {
        this.CAP = CAP;
    }

    public boolean isRoot() {
        return root;
    }

    public void setRoot(boolean root) {
        this.root = root;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return username.equals(user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", mail='" + mail + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", CF='" + CF + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", street='" + street + '\'' +
                ", province='" + province + '\'' +
                ", number='" + number + '\'' +
                ", city='" + city + '\'' +
                ", telephone=" + telephone +
                ", CAP=" + CAP +
                ", root=" + root +
                '}';
    }

    private String username, passwordHash, mail, name, surname, CF, birthDate, street, province, number, city, telephone;
    private boolean root;
    private int CAP;
}
