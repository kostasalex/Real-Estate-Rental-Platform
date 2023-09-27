package com.example.demo.controller;

import com.example.demo.dao.BookingInterface;
import com.example.demo.model.Booking;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@RestController
@CrossOrigin(origins = "https://localhost:8443")
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

    @RequestMapping(method = RequestMethod.DELETE, path = "/api/v1/deleteBooking/{Id}")
    public ResponseEntity<String> deleteBookingById(@PathVariable("Id") Integer Id) {
        int result = bookingDao.deleteBookingById(Id);
        if (result > 0) {
            return ResponseEntity.ok("Bookings deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting bookings.");
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/api/v1/deleteBookingByListingId/{listingId}")
    public ResponseEntity<String> deleteBookingByListingId(@PathVariable("listingId") Integer listingId) {
        int result = bookingDao.deleteBookingByListingId(listingId);
        if (result > 0) {
            return ResponseEntity.ok("Bookings deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting bookings.");
        }
    }

    @PostMapping("/api/v1/bookings/checkAvailability")
    public List<Booking> checkAvailability(@RequestBody Map<String, Object> availabilityCheck) {
        // Retrieve values as Strings
        String listingsIdString = (String) availabilityCheck.get("listings_id");
        String arrivalDateString = (String) availabilityCheck.get("arrival_date");
        String departureDateString = (String) availabilityCheck.get("departure_date");

        // Parse listings_id to Integer
        Integer listingsId = null;
        try {
            listingsId = Integer.parseInt(listingsIdString);
        } catch (NumberFormatException e) {
            // Handle the parsing exception if needed
            e.printStackTrace();
        }

        // Convert date strings to Date objects
        Date arrivalDate = null;
        Date departureDate = null;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            arrivalDate = dateFormat.parse(arrivalDateString);
            departureDate = dateFormat.parse(departureDateString);
        } catch (ParseException e) {
            // Handle the parsing exception if needed
            e.printStackTrace();
        }

        return bookingDao.checkAvailability(listingsId, arrivalDate, departureDate);
    }

}
