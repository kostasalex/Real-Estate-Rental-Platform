package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.dao.UserInterface;

@RestController
@CrossOrigin(origins = "https://localhost:8443", maxAge = 3600)
public class UserController {

    private final UserInterface userDao;

    public UserController(UserInterface userDao) {
        this.userDao = userDao;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        // Check if the user already exists
        if (userDao.selectUserByEmail(user.getEmail()).isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Email already registered. Please use a different email.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } else {
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
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        // Check if the user exists and the credentials are correct
        Map<String, Object> userDetails = userDao.authenticateUser(user.getEmail(), user.getPassword());
        if (userDetails != null) {
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/become-host")
    public ResponseEntity<?> updateHostApplication(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");

        int rowsAffected = userDao.updateHostApplication(userId, 1);
        if (rowsAffected > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/approve-application")
    public ResponseEntity<?> approveHostApplication(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");

        int rowsAffected = userDao.updateHostApplication(userId, 2);
        if (rowsAffected > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/api/v1/deleteUserByUserId/{Id}")
    public ResponseEntity<String> deleteUserByUserId(@PathVariable("Id") Integer Id) {
        int result = userDao.deleteUserByUserId(Id);
        if (result > 0) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting User.");
        }
    }

    

}
