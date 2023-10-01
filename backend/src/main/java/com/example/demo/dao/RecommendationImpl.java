package com.example.demo.dao;

import com.example.demo.model.Booking;
import com.example.demo.model.Card;
import com.example.demo.model.User;
import org.springframework.stereotype.Component;
import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Set;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class RecommendationImpl implements RecommendationInterface {

    // Assuming you have the Booking DAO autowired here
    @Autowired
    private BookingImpl bookingDao;
    @Autowired
    private CardImpl cardDao;
    @Autowired
    private UserImpl userDao;

    int topNUsers = 3;
    int maxListings = 10;
    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/airbnbdb";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "123456789";

    public List<Integer> recommendListingsForUser(int userId, List<Integer> userPreferableListings, int n) {
        // 'n' is the number of top similar users you want to consider
        System.out.println(
                "Recommending for user ID: " + userId + " with user preferable listings: " + userPreferableListings);

        Map<Integer, List<Integer>> allUsersListings = getAllUsersPreferableListings();
        allUsersListings.remove(userId);

        // Print all users and their listings
        // System.out.println("All users and their listings: " + allUsersListings);

        Set<Integer> allListingIds = new HashSet<>();
        for (List<Integer> listings : allUsersListings.values()) {
            allListingIds.addAll(listings);
        }
        allListingIds.addAll(userPreferableListings);

        List<Double> userVector = toBinaryVector(userPreferableListings, allListingIds);

        Map<Integer, Double> userSimilarities = new HashMap<>();
        for (Map.Entry<Integer, List<Integer>> entry : allUsersListings.entrySet()) {
            List<Double> otherUserVector = toBinaryVector(entry.getValue(), allListingIds);
            double similarity = cosineSimilarity(userVector, otherUserVector);
            userSimilarities.put(entry.getKey(), similarity);
        }

        List<Map.Entry<Integer, Double>> sortedUsers = userSimilarities.entrySet().stream()
                .sorted(Map.Entry.<Integer, Double>comparingByValue().reversed())
                .collect(Collectors.toList());

        // Print top n users and their listings
        System.out.println("Top " + n + " users and their listings:");
        for (int i = 0; i < n && i < sortedUsers.size(); i++) {
            System.out.println("User ID: " + sortedUsers.get(i).getKey() + ", Listings: "
                    + allUsersListings.get(sortedUsers.get(i).getKey()));
        }

        Set<Integer> recommendedListings = new HashSet<>();
        int count = 0;
        for (Map.Entry<Integer, Double> user : sortedUsers) {
            if (count >= n) {
                break;
            }
            recommendedListings.addAll(allUsersListings.get(user.getKey()));
            count++;
        }

        // Don't suggest listings that user allready interacted with.
        recommendedListings.removeAll(userPreferableListings);
        // Convert the set to a list and get the first 8 elements
        List<Integer> finalRecommendations = new ArrayList<>(recommendedListings);
        if (finalRecommendations.size() > maxListings) {
            finalRecommendations = finalRecommendations.subList(0, maxListings);
        }

        return finalRecommendations;

    }

    private List<Double> toBinaryVector(List<Integer> userListingIds, Set<Integer> allListingIds) {
        List<Double> vector = new ArrayList<>();
        for (Integer listingId : allListingIds) {
            vector.add(userListingIds.contains(listingId) ? 1.0 : 0.0);
        }
        return vector;
    }

    private double cosineSimilarity(List<Double> v1, List<Double> v2) {
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < v1.size(); i++) {
            dotProduct += v1.get(i) * v2.get(i);
            normA += Math.pow(v1.get(i), 2);
            normB += Math.pow(v2.get(i), 2);
        }

        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    @Override
    public List<Card> getListingsByGuest(List<Integer> ids) {
        List<Card> listings = new ArrayList<>();
        List<Integer> listingIds = new ArrayList<>();
        listingIds = ids;

        if (listingIds.isEmpty()) {
            int n = 10;
            listingIds = bookingDao.getMostBookedListingIds(n);
        } else {
            System.out.println("Entering recommendListingsForUser method");

            listingIds = recommendListingsForUser(0, listingIds, topNUsers);
        }
        for (int id : ids) {
            Optional<Card> card = cardDao.selectCardByCardId(Integer.toString(id));
            card.ifPresent(listings::add);
        }

        return listings;
    }

    @Override
    public List<Card> getListingsByUser(int userId) {

        List<Card> listings = new ArrayList<>();
        List<Integer> listingIds = getUserPreferableListings(userId);
        System.out.println(listingIds);
        // If no bookings were found, get top N most booked listings
        if (listingIds.isEmpty()) {
            int n = 10;
            listingIds = bookingDao.getMostBookedListingIds(n);
        } else {
            System.out.println("Entering recommendListingsForUser method");

            listingIds = recommendListingsForUser(userId, listingIds, topNUsers);
        }

        // Get cards from listingsid
        for (int id : listingIds) {
            Optional<Card> card = cardDao.selectCardByCardId(Integer.toString(id));
            card.ifPresent(listings::add);
        }

        return listings;
    }

    private List<Integer> getUserPreferableListings(int userId) {

        List<Booking> bookings = bookingDao.getBookingsByRenterId(userId);

        List<Integer> listingIds = new ArrayList<>();
        for (Booking booking : bookings) {
            listingIds.add(booking.getlistings_id());
        }

        // If no bookings were found, get visited listings
        if (listingIds.isEmpty()) {
            List<String> visitedListingStrings = userDao.getUserVisitedListings(userId);
            for (String visitedListing : visitedListingStrings) {
                listingIds.add(Integer.parseInt(visitedListing));
            }
        }

        return listingIds;
    }

    // Assuming you have a method that maps the ResultSet to a Card
    private Card mapResultSetToCard(ResultSet rs) throws SQLException {
        // Implement the mapping logic here...
        return null;
    }

    public Map<Integer, List<Integer>> getAllUsersPreferableListings() {
        List<User> allUsers = userDao.selectAllUsers();
        Map<Integer, List<Integer>> userToListingIdsMap = new HashMap<>();

        for (User user : allUsers) {
            Integer userId = Integer.parseInt(user.getId()); // Convert the user's ID to an Integer
            List<Integer> userListingIds = getUserPreferableListings(userId);

            // Only add the user to the map if they have listings
            if (!userListingIds.isEmpty()) {
                userToListingIdsMap.put(userId, userListingIds);
            }
        }
        return userToListingIdsMap;
    }

}
