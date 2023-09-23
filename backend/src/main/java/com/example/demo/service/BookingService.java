package com.example.demo.service;

import com.example.demo.dao.BookingInterface;
import com.example.demo.model.Booking;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private BookingInterface bookingInterface;

    public BookingService(BookingInterface bookingInterface) {
        this.bookingInterface = bookingInterface;
    }

    public List<Booking> getAllBookings() {
        return bookingInterface.getAllBookings();
    }

    public Optional<Booking> getBooking(Integer id) {
        return bookingInterface.getBookingById(id);
    }


    public int updateBooking(Booking booking) {
        Optional<Booking> optionalBooking = getBooking(booking.getId());
        if (optionalBooking.isPresent()) {
            bookingInterface.updateBooking(booking);
            return 1;
        }
        return -1;
    }

    public int removeBooking(Integer id) {
        Optional<Booking> optionalBooking = getBooking(id);
        if (optionalBooking.isPresent()) {
            bookingInterface.deleteBookingById(id);
            return 1;
        }
        return -1;
    }

        public int removeBookingListing(Integer id) {
        Optional<Booking> optionalBooking = getBooking(id);
        if (optionalBooking.isPresent()) {
            bookingInterface.deleteBookingByListingId(id);
            return 1;
        }
        return -1;
    }

    public int insertBooking(Booking booking) {
        return bookingInterface.insertBooking(booking);
    }
}
