package com.example.demo.model;

import java.time.LocalDate;

public class Card {

    private final String id;
    private final String thumbnailUrl;
    private final String mediumUrl;
    private final float price;
    private final String roomType;
    private final int beds;
    private final int numberOfReviews;
    private final int reviewScoresRating;
    private final String street;
    private final String description;
    private final String name;
    private final String hostName;
    private final String hostPictureUrl;
    private final String amenities;
    private final int accommodates;
    private final int bathrooms;
    private final int bedrooms;
    private final String bedType;
    private final float longitude;
    private final float latitude;
    private final LocalDate hostSince;
    private final String hostLocation;
    private final String hostAbout;
    private final String hostResponseTime;
    private final int hostResponseRate;
    private final int hostListingsCount;

    public Card(String id, String thumbnailUrl, String mediumUrl, float price, String roomType, int beds, int numberOfReviews, int reviewScoresRating, String street, String description, String name, String hostName, String hostPictureUrl, String amenities, int accommodates, int bathrooms, int bedrooms, String bedType, float longitude, float latitude, LocalDate hostSince, String hostLocation, String hostAbout, String hostResponseTime, int hostResponseRate, int hostListingsCount) {
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
        this.bedType = bedType;
        this.longitude = longitude;
        this.latitude = latitude;
        this.hostSince = hostSince;
        this.hostLocation = hostLocation;
        this.hostAbout = hostAbout;
        this.hostResponseTime = hostResponseTime;
        this.hostResponseRate = hostResponseRate;
        this.hostListingsCount = hostListingsCount;
    }

    public String getId() {
        return id;
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
        return bedType;
    }

    public float getLongitude() {
        return longitude;
    }

    public float getLatitude() {
        return latitude;
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

}
