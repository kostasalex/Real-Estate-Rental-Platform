package com.example.demo.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Component;
import com.example.demo.model.Review;

@Component
public class ReviewImpl implements ReviewInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/rentspot_db";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "123456789";

    @Override
    public List<Review> selectAllReviews() {
        List<Review> reviews = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM reviews");) {
            while (rs.next()) {
                Review review = mapResultSetToReview(rs);
                reviews.add(review);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return reviews;
    }

    @Override
    public Optional<Review> selectReviewByReviewId(String reviewId) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM reviews WHERE id = ?");) {
            stmt.setString(1, reviewId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Review review = mapResultSetToReview(rs);
                    return Optional.of(review);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return Optional.empty();
    }

    @Override
    public int updateReview(Review review) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "UPDATE reviews SET rating = ?, comment = ?, date = ?, renter_id = ?, listings_id = ?, host_id = ? WHERE id = ?");) {
            stmt.setInt(1, review.getRating());
            stmt.setString(2, review.getComment());
            stmt.setString(3, review.getDate());
            stmt.setString(4, review.getRenterId());
            stmt.setString(5, review.getListingId());
            stmt.setString(6, review.getHostId());
            stmt.setString(7, review.getId());

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return rowsAffected;
    }

    @Override
    public int deleteReviewByReviewId(String reviewId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM reviews WHERE id = ?");) {
            stmt.setString(1, reviewId);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return rowsAffected;
    }

    @Override
    public boolean authenticateReview(String email, String password) {

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("SELECT * FROM reviews WHERE email = ? AND password = ?");) {
            stmt.setString(1, email);
            stmt.setString(2, password);
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next(); // Returns true if the query has a result, indicating valid credentials
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return false; // Invalid credentials
    }

    @Override
    public int insertReview(String reviewId, Review review) {

        reviewId = generateUniqueId();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "INSERT INTO reviews (id, rating, comment, date, renter_id, listings_id, host_id) VALUES (?, ?, ?, ?, ?, ?, ?)");) {
            stmt.setString(1, review.getId());
            stmt.setInt(2, review.getRating());
            stmt.setString(3, review.getComment());
            stmt.setString(4, review.getDate());
            stmt.setString(5, review.getRenterId());
            stmt.setString(6, review.getListingId());
            stmt.setString(7, review.getHostId());

            return stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return 0;
    }

    private Review mapResultSetToReview(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        int rating = rs.getInt("rating");
        String comment = rs.getString("comment");
        String date = rs.getString("date");
        String renterId = rs.getString("renter_id");
        String listingsId = rs.getString("listings_id");
        String hostId = rs.getString("host_id");

        return new Review(id, rating, comment, date, renterId, listingsId, hostId);
    }

    private String generateUniqueId() {
        return UUID.randomUUID().toString();
    }

}
