package com.example.demo.dao;

import com.example.demo.model.Booking;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public interface BookingInterface {
    List<Booking> getAllBookings();

    Optional<Booking> getBookingById(Integer id);

    int updateBooking(Booking booking);

    int deleteBookingById(Integer id);

    int insertBooking(Booking booking);
}
