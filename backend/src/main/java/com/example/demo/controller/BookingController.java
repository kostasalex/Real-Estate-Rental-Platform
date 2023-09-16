package com.example.demo.controller;

import com.example.demo.dao.BookingInterface;
import com.example.demo.model.Booking;

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

}
