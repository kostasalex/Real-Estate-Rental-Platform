package com.example.demo.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;
import com.example.demo.model.Card;

@Component
public class CardImpl implements CardInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/rentspot_db";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "123456789";

    @Override
    public List<Card> selectAllCards() {
        List<Card> cards = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM listings");) {
            while (rs.next()) {
                Card card = mapResultSetToCard(rs);
                cards.add(card);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return cards;

    }

    @Override
    public Optional<Card> selectCardByCardId(String cardId) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM listings WHERE id = ?");) {
            stmt.setString(1, cardId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Card card = mapResultSetToCard(rs);
                    return Optional.of(card);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return Optional.empty();
    }

    @Override
    public int updateCard(Card card) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "UPDATE listings SET thumbnail_url = ?, medium_url = ?, price = ?, room_type = ?, " +
                                "beds = ?, number_of_reviews = ?, review_scores_rating = ?, street = ?, description = ?, name = ?, host_name = ?, "
                                +
                                "host_picture_url = ?, amenities = ?, accommodates = ?, bathrooms = ?, bedrooms = ?, bed_type = ?, "
                                +
                                "longitude = ?, latitude = ?, host_since = ?, host_location = ?, host_about = ?, host_response_time = ?, "
                                +
                                "host_response_rate = ?, host_listings_count = ? WHERE id = ?");) {
            stmt.setString(1, card.getThumbnailUrl());
            stmt.setString(2, card.getMediumUrl());
            stmt.setBigDecimal(3, card.getPrice());
            stmt.setString(4, card.getRoomType());
            stmt.setInt(5, card.getBeds());
            stmt.setInt(6, card.getNumberOfReviews());
            stmt.setInt(7, card.getReviewScoresRating());
            stmt.setString(8, card.getStreet());
            stmt.setString(9, card.getDescription());
            stmt.setString(10, card.getName());
            stmt.setString(11, card.getHostName());
            stmt.setString(12, card.getHostPictureUrl());
            stmt.setString(13, card.getAmenities());
            stmt.setInt(14, card.getAccommodates());
            stmt.setBigDecimal(15, card.getBathrooms());
            stmt.setInt(16, card.getBedrooms());
            stmt.setString(17, card.getBedType());
            stmt.setBigDecimal(18, card.getLongitude());
            stmt.setBigDecimal(19, card.getLatitude());
            stmt.setDate(20, Date.valueOf(card.getHostSince()));
            stmt.setString(21, card.getHostLocation());
            stmt.setString(22, card.getHostAbout());
            stmt.setString(23, card.getHostResponseTime());
            stmt.setBigDecimal(24, card.getHostResponseRate());
            stmt.setInt(25, card.getHostListingsCount());
            stmt.setString(26, card.getId());

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return rowsAffected;
    }

    @Override
    public int deleteCardByCardId(String cardId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM listings WHERE id = ?");) {
            stmt.setString(1, cardId);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return rowsAffected;
    }

    @Override
    public int insertCard(String cardId, Card card) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("INSERT INTO listings (id, thumbnail_url, medium_url, price, " +
                                "room_type, beds, number_of_reviews, review_scores_rating, street, description, name, host_name, "
                                +
                                "host_picture_url, amenities, accommodates, bathrooms, bedrooms, bed_type, longitude, latitude, "
                                +
                                "host_since, host_location, host_about, host_response_time, host_response_rate, host_listings_count) "
                                +
                                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");) {
            stmt.setString(1, cardId);
            stmt.setString(2, card.getThumbnailUrl());
            stmt.setString(3, card.getMediumUrl());
            stmt.setBigDecimal(4, card.getPrice());
            stmt.setString(5, card.getRoomType());
            stmt.setInt(6, card.getBeds());
            stmt.setInt(7, card.getNumberOfReviews());
            stmt.setInt(8, card.getReviewScoresRating());
            stmt.setString(9, card.getStreet());
            stmt.setString(10, card.getDescription());
            stmt.setString(11, card.getName());
            stmt.setString(12, card.getHostName());
            stmt.setString(13, card.getHostPictureUrl());
            stmt.setString(14, card.getAmenities());
            stmt.setInt(15, card.getAccommodates());
            stmt.setBigDecimal(16, card.getBathrooms());
            stmt.setInt(17, card.getBedrooms());
            stmt.setString(18, card.getBedType());
            stmt.setBigDecimal(19, card.getLongitude());
            stmt.setBigDecimal(20, card.getLatitude());
            stmt.setDate(21, Date.valueOf(card.getHostSince()));
            stmt.setString(22, card.getHostLocation());
            stmt.setString(23, card.getHostAbout());
            stmt.setString(24, card.getHostResponseTime());
            stmt.setBigDecimal(25, card.getHostResponseRate());
            stmt.setInt(26, card.getHostListingsCount());

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return rowsAffected;
    }

    @Override
    public List<Card> searchCards(String filters) {
        List<Card> cards = new ArrayList<>();

        // Parse the filters JSON string
        JsonNode filtersJson;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            filtersJson = objectMapper.readTree(filters);

            String location = filtersJson.get("location").asText();
            // String arrive = filtersJson.get("arrive").asText();
            // String leave = filtersJson.get("leave").asText();
            String guests = filtersJson.get("guests").asText();
            String maxPrice = filtersJson.get("maxPrice").asText();

            List<String> roomTypes = getSelectedValues(filtersJson.get("roomType"));
            List<String> amenities = getSelectedValues(filtersJson.get("amenities"));

            StringBuilder queryBuilder = new StringBuilder();
            queryBuilder.append("SELECT * FROM listings WHERE 1=1");

            if (!location.isEmpty()) {
                queryBuilder.append(" AND street LIKE '%").append(location).append("%'");
            }

            /*
             * if (!arrive.isEmpty() && !leave.isEmpty()) {
             * // Assuming 'date' column is the check-in or check-out date
             * queryBuilder.append(" AND (date >= '").append(arrive).
             * append("' AND date <= '").append(leave)
             * .append("')");
             * }
             */

            if (!guests.isEmpty()) {
                // Assuming 'guests' column is the number of guests allowed
                queryBuilder.append(" AND accommodates >= ").append(guests);
            }

            if (!maxPrice.isEmpty()) {
                // Assuming 'price' column is the price per night
                queryBuilder.append(" AND price <= ").append(maxPrice);
            }

            if (!roomTypes.isEmpty()) {
                queryBuilder.append(" AND (");
                for (int i = 0; i < roomTypes.size(); i++) {
                    queryBuilder.append("room_type LIKE '%").append(roomTypes.get(i)).append("%'");
                    if (i < roomTypes.size() - 1) {
                        queryBuilder.append(" OR ");
                    }
                }
                queryBuilder.append(")");
            }

            if (!amenities.isEmpty()) {
                queryBuilder.append(" AND (");
                for (int i = 0; i < amenities.size(); i++) {
                    queryBuilder.append("amenities LIKE '%").append(amenities.get(i)).append("%'");
                    if (i < amenities.size() - 1) {
                        queryBuilder.append(" AND ");
                    }
                }
                queryBuilder.append(")");
            }

            String query = queryBuilder.toString();
            System.out.println(query);

            try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                    Statement stmt = conn.createStatement();
                    ResultSet rs = stmt.executeQuery(query)) {
                while (rs.next()) {
                    Card card = mapResultSetToCard(rs);
                    cards.add(card);
                }
            } catch (SQLException e) {
                e.printStackTrace();
                // Handle the exception as needed
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return cards;
    }

    private List<String> getSelectedValues(JsonNode node) {
        List<String> values = new ArrayList<>();
        if (node != null && node.isObject()) {
            node.fields().forEachRemaining(entry -> {
                if (entry.getValue().asBoolean()) {
                    values.add(entry.getKey());
                }
            });
        }
        return values;
    }

    private Card mapResultSetToCard(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String thumbnailUrl = rs.getString("thumbnail_url");
        String mediumUrl = rs.getString("medium_url");
        BigDecimal price = rs.getBigDecimal("price");
        String roomType = rs.getString("room_type");
        int beds = rs.getInt("beds");
        int numberOfReviews = rs.getInt("number_of_reviews");
        int reviewScoresRating = rs.getInt("review_scores_rating");
        String street = rs.getString("street");
        String description = rs.getString("description");
        String name = rs.getString("name");
        String hostName = rs.getString("host_name");
        String hostPictureUrl = rs.getString("host_picture_url");
        String amenities = rs.getString("amenities");
        int accommodates = rs.getInt("accommodates");
        BigDecimal bathrooms = rs.getBigDecimal("bathrooms");
        int bedrooms = rs.getInt("bedrooms");
        String bedType = rs.getString("bed_type");
        BigDecimal longitude = rs.getBigDecimal("longitude");
        BigDecimal latitude = rs.getBigDecimal("latitude");
        LocalDate hostSince = rs.getDate("host_since").toLocalDate();
        String hostLocation = rs.getString("host_location");
        String hostAbout = rs.getString("host_about");
        String hostResponseTime = rs.getString("host_response_time");
        BigDecimal hostResponseRate = rs.getBigDecimal("host_response_rate");
        int hostListingsCount = rs.getInt("host_listings_count");

        return new Card(id, thumbnailUrl, mediumUrl, price, roomType, beds, numberOfReviews, reviewScoresRating,
                street, description, name, hostName, hostPictureUrl, amenities, accommodates, bathrooms, bedrooms,
                bedType, longitude, latitude, hostSince, hostLocation, hostAbout, hostResponseTime, hostResponseRate,
                hostListingsCount);
    }
}
