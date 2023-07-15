package com.example.demo.controller;

import java.util.HashMap;
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
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        // Check if the user already exists
        if (userDao.selectUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email already registered. Please use a different email."));
        }

        // You can perform additional validations on the user data here

        // Save the user to the database
        int newUserId = userDao.insertUser(user);
        if (newUserId > 0) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("id", newUserId);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
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

    @PostMapping("/api/v1/become-host")
    public ResponseEntity<?> updateHostApplication(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");

        int rowsAffected = userDao.updateHostApplication(userId, 1);
        if (rowsAffected > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/api/v1/approve-application")
    public ResponseEntity<?> approveHostApplication(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");

        int rowsAffected = userDao.updateHostApplication(userId, 2);
        if (rowsAffected > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
