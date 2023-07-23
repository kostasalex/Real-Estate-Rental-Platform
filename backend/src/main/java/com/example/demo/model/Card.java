package com.example.demo.model;

import java.time.LocalDate;

public class Card {

    private String id;
    private String thumbnailUrl;
    private String mediumUrl;
    private float price;
    private String roomType;
    private int beds;
    private int numberOfReviews;
    private int reviewScoresRating;
    private String street;
    private String description;
    private String name;
    private String hostName;
    private String hostPictureUrl;
    private String amenities;
    private int accommodates;
    private int bathrooms;
    private int bedrooms;
    private String bed_type;
    private float lng;
    private float lat;
    private LocalDate hostSince;
    private String hostLocation;
    private String hostAbout;
    private String hostResponseTime;
    private int hostResponseRate;
    private int hostListingsCount;
    private String hosts_id;

    public Card() {
    }

    public Card(String id, String thumbnailUrl, String mediumUrl, float price, String roomType, int beds,
            int numberOfReviews, int reviewScoresRating, String street, String description, String name,
            String hostName, String hostPictureUrl, String amenities, int accommodates, int bathrooms,
            int bedrooms, String bed_type, float lng, float lat, LocalDate hostSince,
            String hostLocation, String hostAbout, String hostResponseTime, int hostResponseRate,
            int hostListingsCount, String hosts_id) {
        this.id = id;
        this.thumbnailUrl = thumbnailUrl;
        this.mediumUrl = mediumUrl;
        this.price = price;
        this.roomType = roomType;
        this.beds = beds;
        this.numberOfReviews = numberOfReviews;
        this.reviewScoresRating = reviewScoresRating;
        this.street = street;
        this.description = description;
        this.name = name;
        this.hostName = hostName;
        this.hostPictureUrl = hostPictureUrl;
        this.amenities = amenities;
        this.accommodates = accommodates;
        this.bathrooms = bathrooms;
        this.bedrooms = bedrooms;
        this.bed_type = bed_type;
        this.lng = lng;
        this.lat = lat;
        this.hostSince = hostSince;
        this.hostLocation = hostLocation;
        this.hostAbout = hostAbout;
        this.hostResponseTime = hostResponseTime;
        this.hostResponseRate = hostResponseRate;
        this.hostListingsCount = hostListingsCount;
        this.hosts_id = hosts_id;
    }


    public String getId() {
        return id;
    }

    // Add a setter for the id field
    public void setId(String id) {
        this.id = id;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public String getMediumUrl() {
        return mediumUrl;
    }

    public float getPrice() {
        return price;
    }

    public String getRoomType() {
        return roomType;
    }

    public int getBeds() {
        return beds;
    }

    public int getNumberOfReviews() {
        return numberOfReviews;
    }

    public int getReviewScoresRating() {
        return reviewScoresRating;
    }

    public String getStreet() {
        return street;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public String getHostName() {
        return hostName;
    }

    public String getHostPictureUrl() {
        return hostPictureUrl;
    }

    public String getAmenities() {
        return amenities;
    }

    public int getAccommodates() {
        return accommodates;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public String getBedType() {
        return bed_type;
    }

    public float getLongitude() {
        return lng;
    }

    public float getLatitude() {
        return lat;
    }

    public LocalDate getHostSince() {
        return hostSince;
    }

    public String getHostLocation() {
        return hostLocation;
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

    public String gethosts_id() {
        return hosts_id;
    }

}
