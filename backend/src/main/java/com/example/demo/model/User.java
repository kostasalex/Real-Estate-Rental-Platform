package com.example.demo.model;

import java.time.LocalDate;

public class User {
    private String id;
    private String email;
    private String first_name;
    private String last_name;
    private String phone_number;
    private String address;
    private String password;
    private String register_date;
    private String is_admin;
    private String host_application;
    private String image_url;
    private LocalDate hostSince;
    private String hostAbout;
    private String hostResponseTime;
    private int hostResponseRate;
    private int hostListingsCount;
    private String visited_listings;

    public User(String id, String email, String first_name, String last_name, String phone_number,
            String address, String password, String register_date, String is_admin, String host_application,
            String image_url, LocalDate hostSince, String hostAbout, String hostResponseTime, int hostResponseRate,
            int hostListingsCount, String visitedListings) {
        this.id = id;
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
        this.hostSince = hostSince;
        this.hostAbout = hostAbout;
        this.hostResponseTime = hostResponseTime;
        this.hostResponseRate = hostResponseRate;
        this.hostListingsCount = hostListingsCount;
        this.visited_listings = visitedListings;
    }

    public String getId() {
        return id;
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

    public LocalDate getHostSince() {
        return hostSince;
    }

    public String getHostAbout() {
        return hostAbout;
    }

    public String getHostResponseTime() {
        return hostResponseTime;
    }

    public int getHostResponseRate() {
        return hostResponseRate;
    }

    public int getHostListingsCount() {
        return hostListingsCount;
    }

    public String getVisitedListings() {
        return visited_listings;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFirstName(String first_name) {
        this.first_name = first_name;
    }

    public void setLastName(String last_name) {
        this.last_name = last_name;
    }

    public void setPhoneNumber(String phone_number) {
        this.phone_number = phone_number;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setHostApplication(String host_application) {
        this.host_application = host_application;
    }

    public void setImageUrl(String image_url) {
        this.image_url = image_url;
    }

    public void setHostSince(LocalDate hostSince) {
        this.hostSince = hostSince;
    }

    public void setHostAbout(String hostAbout) {
        this.hostAbout = hostAbout;
    }

    public void setHostResponseTime(String hostResponseTime) {
        this.hostResponseTime = hostResponseTime;
    }

    public void setHostResponseRate(int hostResponseRate) {
        this.hostResponseRate = hostResponseRate;
    }

    public void setHostListingsCount(int hostListingsCount) {
        this.hostListingsCount = hostListingsCount;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", email=" + email + ", first_name=" + first_name
                + ", last_name=" + last_name + ", phone_number=" + phone_number + ", address=" + address
                + ", password=" + password + ", register_date=" + register_date + ", is_admin=" + is_admin
                + ", host_application=" + host_application + ", image_url=" + image_url + "]";
    }
}
