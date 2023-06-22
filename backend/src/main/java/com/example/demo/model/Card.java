package com.example.demo.model;

import java.util.UUID;

public class Card {

    private final UUID cardUid;
    private final String thumbnailUrl;
    private final String roomType;
    private final String street;
    private final String description;
    private final String name;
    private final String hostName;
    private final String hostPictureUrl;
    private final String amenities;
    private final String bedType;
    private final String hostSince;
    private final String hostLocation;
    private final String hostAbout;
    private final String hostResponceTime;
    private final Integer hostResponceRate;
    private final Integer hostListingsCount;
    private final Integer price;
    private final Integer accommodates;
    private final Integer bathrooms;
    private final Integer bedrooms;
    private final Integer beds;
    private final Integer numberOfReviews;
    private final Integer reviewScoresRating;
    private final Float longitude;
    private final Float latitude;


    public Card(UUID cardUid, String thumbnailUrl, String roomType, String street, String description, String name,
        String hostName, String hostPictureUrl, String amenities, String bedType, String hostSince,
        String hostLocation, String hostAbout, String hostResponceTime, Integer hostResponceRate,
        Integer hostListingsCount, Integer price, Integer accommodates, Integer bathrooms, Integer bedrooms,
        Integer beds, Integer numberOfReviews, Integer reviewScoresRating, Float longitude, Float latitude) {
        this.cardUid = cardUid;
        this.thumbnailUrl = thumbnailUrl;
        this.roomType = roomType;
        this.street = street;
        this.description = description;
        this.name = name;
        this.hostName = hostName;
        this.hostPictureUrl = hostPictureUrl;
        this.amenities = amenities;
        this.bedType = bedType;
        this.hostSince = hostSince;
        this.hostLocation = hostLocation;
        this.hostAbout = hostAbout;
        this.hostResponceTime = hostResponceTime;
        this.hostResponceRate = hostResponceRate;
        this.hostListingsCount = hostListingsCount;
        this.price = price;
        this.accommodates = accommodates;
        this.bathrooms = bathrooms;
        this.bedrooms = bedrooms;
        this.beds = beds;
        this.numberOfReviews = numberOfReviews;
        this.reviewScoresRating = reviewScoresRating;
        this.longitude = longitude;
        this.latitude = latitude;
    }


    public UUID getCardUid() {
        return cardUid;
    }


    public String getThumbnailUrl() {
        return thumbnailUrl;
    }


    public String getRoomType() {
        return roomType;
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


    public String getBedType() {
        return bedType;
    }


    public String getHostSince() {
        return hostSince;
    }


    public String getHostLocation() {
        return hostLocation;
    }


    public String getHostAbout() {
        return hostAbout;
    }


    public String getHostResponceTime() {
        return hostResponceTime;
    }


    public Integer getHostResponceRate() {
        return hostResponceRate;
    }


    public Integer getHostListingsCount() {
        return hostListingsCount;
    }


    public Integer getPrice() {
        return price;
    }


    public Integer getAccommodates() {
        return accommodates;
    }


    public Integer getBathrooms() {
        return bathrooms;
    }


    public Integer getBedrooms() {
        return bedrooms;
    }


    public Integer getBeds() {
        return beds;
    }


    public Integer getNumberOfReviews() {
        return numberOfReviews;
    }


    public Integer getReviewScoresRating() {
        return reviewScoresRating;
    }


    public Float getLongitude() {
        return longitude;
    }


    public Float getLatitude() {
        return latitude;
    }


    @Override
    public String toString() {
        return "Card [cardUid=" + cardUid + ", thumbnailUrl=" + thumbnailUrl + ", roomType=" + roomType + ", street="
                + street + ", description=" + description + ", name=" + name + ", hostName=" + hostName
                + ", hostPictureUrl=" + hostPictureUrl + ", amenities=" + amenities + ", bedType=" + bedType
                + ", hostSince=" + hostSince + ", hostLocation=" + hostLocation + ", hostAbout=" + hostAbout
                + ", hostResponceTime=" + hostResponceTime + ", hostResponceRate=" + hostResponceRate
                + ", hostListingsCount=" + hostListingsCount + ", price=" + price + ", accommodates=" + accommodates
                + ", bathrooms=" + bathrooms + ", bedrooms=" + bedrooms + ", beds=" + beds + ", numberOfReviews="
                + numberOfReviews + ", reviewScoresRating=" + reviewScoresRating + ", longitude=" + longitude
                + ", latitude=" + latitude + "]";
    }

    

   
}
