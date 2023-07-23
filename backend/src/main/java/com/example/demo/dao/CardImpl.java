package com.example.demo.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Component;
import com.example.demo.model.Card;

@Component
public class CardImpl implements CardInterface {

	// Database connection details
	private static final String DB_URL = "jdbc:mysql://localhost:3306/airbnbdb";
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
								"host_response_rate = ?, host_listings_count = ?, hosts_id = ? WHERE id = ?");) {
			stmt.setString(1, card.getThumbnailUrl());
			stmt.setString(2, card.getMediumUrl());
			stmt.setFloat(3, card.getPrice());
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
			stmt.setInt(15, card.getBathrooms());
			stmt.setInt(16, card.getBedrooms());
			stmt.setString(17, card.getBedType());
			stmt.setFloat(18, card.getLongitude());
			stmt.setFloat(19, card.getLatitude());
			stmt.setDate(20, Date.valueOf(card.getHostSince()));
			stmt.setString(21, card.getHostLocation());
			stmt.setString(22, card.getHostAbout());
			stmt.setString(23, card.getHostResponseTime());
			stmt.setInt(24, card.getHostResponseRate());
			stmt.setInt(25, card.getHostListingsCount());
			stmt.setString(26, card.gethosts_id());
			stmt.setString(27, card.getId());

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

	public int insertCardImp(Card card) {
		int rowsAffected = 0;
		try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
				PreparedStatement stmt = conn.prepareStatement(
						"INSERT INTO listings (thumbnail_url, medium_url, price, room_type, beds, number_of_reviews, review_scores_rating, street, description, name, host_name, "
								+
								"host_picture_url, amenities, accommodates, bathrooms, bedrooms, bed_type, longitude, latitude, host_since, host_location, host_about, host_response_time, "
								+
								"host_response_rate, host_listings_count, hosts_id,id) " +
								"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");) {
			stmt.setString(1, card.getThumbnailUrl());
			stmt.setString(2, card.getMediumUrl());
			stmt.setFloat(3, card.getPrice());
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
			stmt.setInt(15, card.getBathrooms());
			stmt.setInt(16, card.getBedrooms());
			stmt.setString(17, card.getBedType());
			stmt.setFloat(18, card.getLongitude());
			stmt.setFloat(19, card.getLatitude());

			// Handle the case when hostSince is null
			LocalDate hostSince = card.getHostSince();
			if (hostSince != null) {
				stmt.setDate(20, Date.valueOf(hostSince));
			} else {
				stmt.setNull(20, Types.DATE); // Set the field as NULL in the database
			}

			stmt.setString(21, card.getHostLocation());
			stmt.setString(22, card.getHostAbout());
			stmt.setString(23, card.getHostResponseTime());
			stmt.setInt(24, card.getHostResponseRate());
			stmt.setInt(25, card.getHostListingsCount());
			stmt.setString(26, card.gethosts_id());
			stmt.setString(27, card.getId()); // Add the missing parameter for card.getId()

			rowsAffected = stmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			// Handle the exception as needed
		}

		return rowsAffected;
	}

	public List<Card> searchCards(String filters) {
		List<Card> cards = new ArrayList<>();

		// Parse the filters JSON string
		JsonNode filtersJson;
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			filtersJson = objectMapper.readTree(filters);

			String location = filtersJson.get("location").asText();
			String guests = filtersJson.get("guests").asText();
			String maxPrice = filtersJson.get("maxPrice").asText();

			List<String> roomTypes = getSelectedValues(filtersJson.get("roomType"));
			List<String> amenities = getSelectedValues(filtersJson.get("amenities"));

			StringBuilder queryBuilder = new StringBuilder();
			queryBuilder.append("SELECT * FROM listings WHERE 1=1");

			if (!location.isEmpty()) {
				// Split the location into individual words
				String[] locationWords = location.split("\\s+");
				for (String word : locationWords) {
					queryBuilder.append(" AND street LIKE '%").append(word).append("%'");
				}
			}

			if (!guests.isEmpty()) {
				// Assuming 'guests' column is the number of guests allowed
				queryBuilder.append(" AND accommodates >= ").append(guests);
			}

			if (!maxPrice.isEmpty() && Integer.parseInt(maxPrice) > 0) {
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
					String amenity = amenities.get(i);
					String mappedAmenity = mapAmenity(amenity);

					queryBuilder.append("LOWER(amenities) LIKE '%").append(mappedAmenity.toLowerCase()).append("%'");

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

	private String mapAmenity(String amenity) {
		// Map the amenities to their corresponding values
		if (amenity.equalsIgnoreCase("TV")) {
			return "TV";
		} else if (amenity.equalsIgnoreCase("Internet")) {
			return "Wireless Internet";
		} else if (amenity.equalsIgnoreCase("Air_Conditioning")) {
			return "Air Conditioning";
		} else if (amenity.equalsIgnoreCase("Kitchen")) {
			return "Kitchen";
		} else if (amenity.equalsIgnoreCase("Heating")) {
			return "Heating";
		} else if (amenity.equalsIgnoreCase("Family_Kid_Friendly")) {
			return "Family/Kid Friendly";
		} else if (amenity.equalsIgnoreCase("Washer")) {
			return "Washer";
		} else if (amenity.equalsIgnoreCase("Shampoo")) {
			return "Shampoo";
		} else if (amenity.equalsIgnoreCase("Parking")) {
			return "Parking";
		} else if (amenity.equalsIgnoreCase("Elevator")) {
			return "Elevator";
		}
		// Add more mappings as needed

		// If no mapping is found, return the original amenity
		return amenity;
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
		float price = rs.getFloat("price");
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
		int bathrooms = rs.getInt("bathrooms");
		int bedrooms = rs.getInt("bedrooms");
		String bed_type = rs.getString("bed_type");
		float lng = rs.getFloat("longitude");
		float lat = rs.getFloat("latitude");
		LocalDate hostSince = rs.getDate("host_since").toLocalDate();
		String hostLocation = rs.getString("host_location");
		String hostAbout = rs.getString("host_about");
		String hostResponseTime = rs.getString("host_response_time");
		int hostResponseRate = rs.getInt("host_response_rate");
		int hostListingsCount = rs.getInt("host_listings_count");
		String hostId = rs.getString("hosts_id");

		return new Card(id, thumbnailUrl, mediumUrl, price, roomType, beds, numberOfReviews, reviewScoresRating, street,
				description, name, hostName, hostPictureUrl, amenities, accommodates, bathrooms, bedrooms, bed_type,
				lng, lat, hostSince, hostLocation, hostAbout, hostResponseTime, hostResponseRate,
				hostListingsCount, hostId);
	}
}
