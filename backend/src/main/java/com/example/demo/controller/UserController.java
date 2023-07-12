package com.example.demo.controller;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.dao.UserInterface;

@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class UserController {

    private final UserInterface userDao;

    public UserController(UserInterface userDao) {
        this.userDao = userDao;
    }

    @PostMapping("/api/v1/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if the user already exists
        if (userDao.selectUserByEmail(user.getEmail()).isPresent()) {
            System.out.print(user.getEmail());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already registered. Please use a different email.");
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
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        // Check if the user exists and the credentials are correct
        Map<String, Object> userDetails = userDao.authenticateUser(user.getEmail(), user.getPassword());
        if (userDetails != null) {
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}
