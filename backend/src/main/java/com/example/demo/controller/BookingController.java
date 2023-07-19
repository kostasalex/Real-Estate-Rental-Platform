package com.example.demo.controller;

import com.example.demo.dao.BookingInterface;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingInterface bookingDao;

    public BookingController(BookingInterface bookingDao) {
        this.bookingDao = bookingDao;
    }
}
