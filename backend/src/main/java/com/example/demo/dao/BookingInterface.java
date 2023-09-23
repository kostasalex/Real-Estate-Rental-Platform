package com.example.demo.dao;

import com.example.demo.model.Booking;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public interface BookingInterface {
    List<Booking> getAllBookings();

    Optional<Booking> getBookingById(Integer id);

    Optional<Booking> getBookingByListingId(Integer id);

    int updateBooking(Booking booking);

    int deleteBookingById(Integer id);

    int insertBooking(Booking booking);

    List<Booking> getBookings(Integer listingsId, Integer trueBooking);

    int deleteBookingsByHostId(Integer hostsId, Integer trueBooking);

    int deleteBookingByListingId(Integer listingId);
}
