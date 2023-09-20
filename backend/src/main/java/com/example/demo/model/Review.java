package com.example.demo.model;

public class Review {
    private final String id;
    private final Float rating;
    private final String comment;
    private final String date;
    private final String renterId;
    private final String listingId;
    private final String hostId;

    public Review(String id, Float rating, String comment, String date, String renterId, String listingId,
            String hostId) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
        this.renterId = renterId;
        this.listingId = listingId;
        this.hostId = hostId;
    }

    public String getId() {
        return id;
    }

    public Float getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public String getDate() {
        return date;
    }

    public String getRenterId() {
        return renterId;
    }

    public String getListingId() {
        return listingId;
    }

    public String getHostId() {
        return hostId;
    }

    public void setId(String generateUniqueId) {
    }

}
