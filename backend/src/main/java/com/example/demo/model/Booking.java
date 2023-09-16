package com.example.demo.model;

import java.sql.Date;

public class Booking {
    private Integer id;
    private Integer hosts_id;
    private Integer renters_id;
    private Integer listings_id;
    private Date departure_date;
    private Date arrival_date;
    private Integer trueBooking;

    public Booking(Integer id, Integer hostsId, Integer rentersId, Integer listingsId, Date departureDate,
            Date arrivalDate, Integer trueBooking) {
        this.id = id;
        this.hosts_id = hostsId;
        this.renters_id = rentersId;
        this.listings_id = listingsId;
        this.departure_date = departureDate;
        this.arrival_date = arrivalDate;
        this.trueBooking = trueBooking;
    }

    public Integer getId() {
        return id;
    }

    public Integer gethosts_id() {
        return hosts_id;
    }

    public Integer getrenters_id() {
        return renters_id;
    }

    public Integer getlistings_id() {
        return listings_id;
    }

    public Date getdeparture_date() {
        return departure_date;
    }

    public Date getarrival_date() {
        return arrival_date;
    }

    public Integer getTrueBooking() {
        return trueBooking;
    }
}
