package com.example.demo.model;

public class User {
    private final String id;
    private final String username;
    private final String email;
    private final String first_name;
    private final String last_name;
    private final String phone_number;
    private final String address;
    private final String password;
    private final String register_date;
    private final String is_admin;
    private final String host_application;
    private final String image_url;

    public User(String id, String username, String email, String first_name, String last_name, String phone_number,
            String address, String password, String register_date, String is_admin, String host_application,
            String image_url) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.address = address;
        this.password = password;
        this.register_date = register_date;
        this.is_admin = is_admin;
        this.host_application = host_application;
        this.image_url = image_url;
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
        return first_name;
    }

    public String getLastName() {
        return last_name;
    }

    public String getPhoneNumber() {
        return phone_number;
    }

    public String getAddress() {
        return address;
    }

    public String getPassword() {
        return password;
    }

    public String getRegisterDate() {
        return register_date;
    }

    public String getIsAdmin() {
        return is_admin;
    }

    public String getHostApplication() {
        return host_application;
    }

    public String getimage_url() {
        return image_url;
    }

    public String getUserType() {
        return (host_application.equals("2")) ? "Host" : "Seeker";
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", email=" + email + ", first_name=" + first_name
                + ", last_name=" + last_name + ", phone_number=" + phone_number + ", address=" + address
                + ", password=" + password + ", register_date=" + register_date + ", is_admin=" + is_admin
                + ", host_application=" + host_application + ", image_url=" + image_url + "]";
    }
}
