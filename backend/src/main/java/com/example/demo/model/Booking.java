package com.example.demo.model;

import java.sql.Date;

public class Booking {
    private final Integer id;
    private final Integer hostsId;
    private final Integer rentersId;
    private final Integer listingsId;
    private final Date departureDate;
    private final Date arrivalDate;
    private final Integer trueBooking;

    public Booking(Integer id, Integer hostsId, Integer rentersId, Integer listingsId, Date departureDate,
            Date arrivalDate, Integer trueBooking) {
        this.id = id;
        this.hostsId = hostsId;
        this.rentersId = rentersId;
        this.listingsId = listingsId;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.trueBooking = trueBooking;
    }

    public Integer getId() {
        return id;
    }

    public Integer getHostsId() {
        return hostsId;
    }

    public Integer getRentersId() {
        return rentersId;
    }

    public Integer getListingsId() {
        return listingsId;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public Integer getTrueBooking() {
        return trueBooking;
    }
}
