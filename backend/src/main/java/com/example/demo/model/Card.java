package com.example.demo.model;

import java.time.LocalDate;

public class Card {

    private String id;
    private String thumbnail_url;
    private String medium_url;
    private float price;
    private String roomType;
    private int beds;
    private int numberOfReviews;
    private int reviewScoresRating;
    private String street;
    private String description;
    private String name;

    private String amenities;
    private int accommodates;
    private int bathrooms;
    private int bedrooms;
    private String bed_type;
    private float longitude;
    private float latitude;
    private String hosts_id;
    private String rentalRules;
    private int size;
    private String accessing_info;
    private int minimum_nights;
    private int price_per_additional_guest;

    public Card(String id, String thumbnailUrl, String mediumUrl, float price, String roomType, int beds,
            int numberOfReviews, int reviewScoresRating, String street, String description, String name,
            String amenities, int accommodates, int bathrooms, int bedrooms, String bed_type, float longitude,
            float latitude, String hostId, String rentalRules, int size, String accessing_info, int minimum_nights,
            int price_per_additional_guest) {
        this.id = id;
        this.thumbnail_url = thumbnailUrl;
        this.medium_url = mediumUrl;
        this.price = price;
        this.roomType = roomType;
        this.beds = beds;
        this.numberOfReviews = numberOfReviews;
        this.reviewScoresRating = reviewScoresRating;
        this.street = street;
        this.description = description;
        this.name = name;
        this.amenities = amenities;
        this.accommodates = accommodates;
        this.bathrooms = bathrooms;
        this.bedrooms = bedrooms;
        this.bed_type = bed_type;
        this.longitude = longitude;
        this.latitude = latitude;
        this.hosts_id = hostId;
        this.rentalRules = rentalRules;
        this.size = size;
        this.accessing_info = accessing_info;
        this.minimum_nights = minimum_nights;
        this.price_per_additional_guest = price_per_additional_guest;
    }

    public String getId() {
        return id;
    }

    // Add a setter for the id field
    public void setId(String id) {
        this.id = id;
    }

    public String getthumbnail_url() {
        return thumbnail_url;
    }

    public String getmedium_url() {
        return medium_url;
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

    public String getbed_type() {
        return bed_type;
    }

    public float getLongitude() {
        return longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public String gethosts_id() {
        return hosts_id;
    }

    public String getRentalRules() {
        return rentalRules;
    }

    public int getSize() {
        return size;
    }

    public String getaccessing_info() {
        return accessing_info;
    }

    public int getminimum_nights() {
        return minimum_nights;
    }

    public int getprice_per_additional_guest() {
        return price_per_additional_guest;
    }

}
