package com.example.demo.model;

import java.math.BigDecimal;
import java.util.List;

public class FilterModel {
    private String location;
    private String arrive;
    private String leave;
    private String guests;
    private BigDecimal maxPrice;
    private List<String> roomType;
    private List<String> amenities;

    // Add getters and setters for the fields

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getArrive() {
        return arrive;
    }

    public void setArrive(String arrive) {
        this.arrive = arrive;
    }

    public String getLeave() {
        return leave;
    }

    public void setLeave(String leave) {
        this.leave = leave;
    }

    public String getGuests() {
        return guests;
    }

    public void setGuests(String guests) {
        this.guests = guests;
    }

    public BigDecimal getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(BigDecimal maxPrice) {
        this.maxPrice = maxPrice;
    }

    public List<String> getRoomType() {
        return roomType;
    }

    public void setRoomType(List<String> roomType) {
        this.roomType = roomType;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }
}
