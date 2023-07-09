package com.example.demo.model;

public class User {
    private final String id;
    private final String username;
    private final String email;
    private final String firstName;
    private final String lastName;
    private final String phoneNumber;
    private final String address;
    private final String password;
    private final String registerDate;
    private final String isAdmin;
    private final String hostApplication;
    private final String imageUrl;

    public User(String id, String username, String email, String firstName, String lastName, String phoneNumber,
            String address, String password, String registerDate, String isAdmin, String hostApplication,
            String imageUrl) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.password = password;
        this.registerDate = registerDate;
        this.isAdmin = isAdmin;
        this.hostApplication = hostApplication;
        this.imageUrl = imageUrl;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public String getPassword() {
        return password;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public String getIsAdmin() {
        return isAdmin;
    }

    public String getHostApplication() {
        return hostApplication;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getUserType() {
        return (hostApplication.equals("2")) ? "Host" : "Seeker";
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", email=" + email + ", firstName=" + firstName
                + ", lastName=" + lastName + ", phoneNumber=" + phoneNumber + ", address=" + address + ", password="
                + password + ", registerDate=" + registerDate + ", isAdmin=" + isAdmin + ", hostApplication="
                + hostApplication + ", imageUrl=" + imageUrl + "]";
    }
}
