package com.example.demo.controller;

import com.example.demo.dao.BookingInterface;
import com.example.demo.model.Booking;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingInterface bookingDao;

    public BookingController(BookingInterface bookingDao) {
        this.bookingDao = bookingDao;
    }

    @PostMapping("/api/v1/insertBooking")
    public ResponseEntity<Booking> insertBooking(@RequestBody Booking booking) {
        int result = bookingDao.insertBooking(booking);
        if (result > 0) {
            return ResponseEntity.ok(booking);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/v1/bookings/byListing/{listingsId}")
    public List<Booking> fetchBookingsByListingId(@PathVariable("listingsId") Integer listingsId,
            @RequestParam("trueBooking") Integer trueBooking) {
        return bookingDao.getBookings(listingsId, trueBooking);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/api/v1/deleteBookings/{hostsId}")
    public ResponseEntity<String> deleteBookingsByHostId(@PathVariable("hostsId") Integer hostsId,
            @RequestParam("trueBooking") Integer trueBooking) {
        int result = bookingDao.deleteBookingsByHostId(hostsId, trueBooking);
        if (result > 0) {
            return ResponseEntity.ok("Bookings deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting bookings.");
        }
    }

}
