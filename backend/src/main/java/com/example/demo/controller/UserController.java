package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

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

    @PostMapping("/updateVisitedListings")
    public ResponseEntity<Map<String, Object>> updateVisitedListings(@RequestBody Map<String, Object> payload) {
        Integer userId = Integer.parseInt(payload.get("userId").toString());
        String cardId = payload.get("cardId").toString();

        // Fetch the current user details from the database
        Optional<User> currentUserOpt = userDao.selectUserByUserId(userId);
        if (currentUserOpt.isPresent()) {
            User currentUser = currentUserOpt.get();
            String visitedListings = currentUser.getVisitedListings();

            if (visitedListings == null || visitedListings.isEmpty()) {
                visitedListings = cardId;
            } else {
                // Split the current listings, add the new one, and then join them again
                List<String> listings = new ArrayList<>(Arrays.asList(visitedListings.split(",")));

                if (!listings.contains(cardId)) {
                    listings.add(cardId);
                    visitedListings = String.join(",", listings);
                }
            }

            int rowsAffected = userDao.updateUserVisitedListings(userId, visitedListings);
            if (rowsAffected > 0) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Visited listings updated successfully");
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @GetMapping("/visitedListings/{userId}")
    public ResponseEntity<String> getVisitedListingsByUserId(@PathVariable("userId") Integer userId) {
        Optional<User> userOpt = userDao.selectUserByUserId(userId);
        if (userOpt.isPresent()) {
            String visitedListings = userOpt.get().getVisitedListings();
            if (visitedListings != null && !visitedListings.isEmpty()) {
                return ResponseEntity.ok(visitedListings);
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No visited listings found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

}
