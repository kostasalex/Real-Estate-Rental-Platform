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
    private static final String DB_URL = "jdbc:mysql://localhost:3306/airbnbdb";
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
        }

        return Optional.empty();
    }

    @Override
    public Optional<Review> selectReviewByListingId(Integer Id) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM reviews WHERE listings_id = ?");) {
            stmt.setInt(1, Id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Review review = mapResultSetToReview(rs);
                    return Optional.of(review);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    @Override
    public int updateReview(Review review) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "UPDATE reviews SET rating = ?, comment = ?, date = ?, renters_id = ?, listings_id = ?, hosts_id = ? WHERE id = ?");) {
            stmt.setFloat(1, review.getRating());
            stmt.setString(2, review.getComment());
            stmt.setString(3, review.getDate());
            stmt.setString(4, review.getRenterId());
            stmt.setString(5, review.getListingId());
            stmt.setString(6, review.getHostId());
            stmt.setString(7, review.getId());

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
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
        }

        return false; // Invalid credentials
    }

    @Override
    public int insertReview(Review review) {

        review.setId(generateUniqueId()); // Generate a unique ID for the review

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "INSERT INTO reviews (id, rating, comment, date, renters_id, listings_id, hosts_id) VALUES (?, ?, ?, ?, ?, ?, ?)");) {
            stmt.setString(1, review.getId());
            stmt.setFloat(2, review.getRating());
            stmt.setString(3, review.getComment());
            stmt.setString(4, review.getDate());
            stmt.setString(5, review.getRenterId());
            stmt.setString(6, review.getListingId());
            stmt.setString(7, review.getHostId());

            return stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public Review getReviewById(String reviewId) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM reviews WHERE id = ?");) {
            stmt.setString(1, reviewId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToReview(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null; // Return null if the review is not found
    }

    @Override
    public List<Review> getReviewsByListing(String listingId) {
        List<Review> reviews = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM reviews WHERE listings_id = ?");) {
            stmt.setString(1, listingId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Review review = mapResultSetToReview(rs);
                    reviews.add(review);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return reviews;
    }

    @Override
    public int deleteReview(String reviewId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM reviews WHERE id = ?");) {
            stmt.setString(1, reviewId);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public int deleteReviewByListingId(Integer listingId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM reviews WHERE listings_id = ?");) {
            stmt.setInt(1, listingId);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

 

    private Review mapResultSetToReview(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        float rating = rs.getFloat("rating");
        String comment = rs.getString("comment");
        String date = rs.getString("date");
        String renterId = rs.getString("renters_id");
        String listingsId = rs.getString("listings_id");
        String hostId = rs.getString("hosts_id");

        return new Review(id, rating, comment, date, renterId, listingsId, hostId);
    }

    private String generateUniqueId() {
        return UUID.randomUUID().toString();
    }

}
