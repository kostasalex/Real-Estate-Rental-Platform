package com.example.demo.resource;

import com.example.demo.model.Booking;
import com.example.demo.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/bookings")
public class BookingResource {

    private BookingService bookingService;

    public BookingResource(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Booking> fetchBookings() {
        return bookingService.getAllBookings();
    }

    @RequestMapping(method = RequestMethod.GET, path = "{bookingId}")
    public Booking fetchBooking(@PathVariable("bookingId") Integer bookingId) {
        return bookingService.getBooking(bookingId).orElse(null);
    }
}
