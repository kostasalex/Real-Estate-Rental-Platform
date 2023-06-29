package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.dao.UserDao;

@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class UserController {

    private final UserDao userDao;

    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @PostMapping("/api/v1/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if the user already exists
        if (userDao.selectUserByUserId(user.getId()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }

        // You can perform additional validations on the user data here

        // Save the user to the database
        int rowsAffected = userDao.insertUser(user.getId(), user);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("User registered successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user");
        }
    }

    @PostMapping("/api/v1/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        // Check if the user exists and the credentials are correct
        if (userDao.authenticateUser(user.getEmail(), user.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
