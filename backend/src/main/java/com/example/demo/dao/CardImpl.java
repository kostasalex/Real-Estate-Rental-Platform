package com.example.demo.dao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

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
								"beds = ?, number_of_reviews = ?, review_scores_rating = ?, street = ?, description = ?, name = ?, "
								+
								"amenities = ?, accommodates = ?, bathrooms = ?, bedrooms = ?, bed_type = ?, " +
								"longitude = ?, latitude = ?, hosts_id = ?, rentalRules = ?, size = ?, accessing_info = ?, minimum_nights = ?, price_per_additional_guest = ? WHERE id = ?")) {
			stmt.setString(1, card.getthumbnail_url());
			stmt.setString(2, card.getmedium_url());
			stmt.setFloat(3, card.getPrice());
			stmt.setString(4, card.getRoomType());
			stmt.setInt(5, card.getBeds());
			stmt.setInt(6, card.getNumberOfReviews());
			stmt.setInt(7, card.getReviewScoresRating());
			stmt.setString(8, card.getStreet());
			stmt.setString(9, card.getDescription());
			stmt.setString(10, card.getName());
			stmt.setString(11, card.getAmenities());
			stmt.setInt(12, card.getAccommodates());
			stmt.setInt(13, card.getBathrooms());
			stmt.setInt(14, card.getBedrooms());
			stmt.setString(15, card.getbed_type());
			stmt.setFloat(16, card.getLongitude());
			stmt.setFloat(17, card.getLatitude());
			stmt.setString(18, card.gethosts_id());
			stmt.setString(19, card.getRentalRules());
			stmt.setInt(20, card.getSize());
			stmt.setString(21, card.getaccessing_info());
			stmt.setInt(22, card.getminimum_nights());
			stmt.setFloat(23, card.getprice_per_additional_guest());
			stmt.setString(24, card.getId());

			rowsAffected = stmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
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
		int generatedId = -1; // Default to an invalid value
		try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
				PreparedStatement stmt = conn.prepareStatement(
						"INSERT INTO listings (thumbnail_url, medium_url, price, room_type, beds, number_of_reviews, review_scores_rating, street, description, name, "
								+ "amenities, accommodates, bathrooms, bedrooms, bed_type, longitude, latitude, hosts_id, rentalRules, size, accessing_info, minimum_nights, price_per_additional_guest) "
								+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
						Statement.RETURN_GENERATED_KEYS)) {

			stmt.setString(1, card.getthumbnail_url());
			stmt.setString(2, card.getmedium_url());
			stmt.setFloat(3, card.getPrice());
			stmt.setString(4, card.getRoomType());
			stmt.setInt(5, card.getBeds());
			stmt.setInt(6, card.getNumberOfReviews());
			stmt.setInt(7, card.getReviewScoresRating());
			stmt.setString(8, card.getStreet());
			stmt.setString(9, card.getDescription());
			stmt.setString(10, card.getName());
			stmt.setString(11, card.getAmenities());
			stmt.setInt(12, card.getAccommodates());
			stmt.setInt(13, card.getBathrooms());
			stmt.setInt(14, card.getBedrooms());
			stmt.setString(15, card.getbed_type());
			stmt.setFloat(16, card.getLongitude());
			stmt.setFloat(17, card.getLatitude());
			stmt.setString(18, card.gethosts_id());
			stmt.setString(19, card.getRentalRules());
			stmt.setInt(20, card.getSize());
			stmt.setString(21, card.getaccessing_info());
			stmt.setInt(22, card.getminimum_nights());
			stmt.setFloat(23, card.getprice_per_additional_guest());
			int rowsAffected = stmt.executeUpdate();

			if (rowsAffected > 0) {
				try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
					if (generatedKeys.next()) {
						generatedId = generatedKeys.getInt(1);
					}
				}
			}

		} catch (SQLException e) {
			e.printStackTrace();
			// Handle the exception as needed
		}

		return generatedId;
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
			// System.out.println(query);

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
		} else if (amenity.equalsIgnoreCase("wifi")) {
			return "Wireless Internet";
		} else if (amenity.equalsIgnoreCase("airconditioning")) {
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
		String amenities = rs.getString("amenities");
		int accommodates = rs.getInt("accommodates");
		int bathrooms = rs.getInt("bathrooms");
		int bedrooms = rs.getInt("bedrooms");
		String bed_type = rs.getString("bed_type");
		float longitude = rs.getFloat("longitude");
		float latitude = rs.getFloat("latitude");
		String hostId = rs.getString("hosts_id");
		String rentalRules = rs.getString("rentalRules");
		int size = rs.getInt("size");
		String accessing_info = rs.getString("accessing_info");
		int minimum_nights = rs.getInt("minimum_nights");
		int price_per_additional_guest = rs.getInt("price_per_additional_guest");

		return new Card(id, thumbnailUrl, mediumUrl, price, roomType, beds, numberOfReviews, reviewScoresRating, street,
				description, name, amenities, accommodates, bathrooms, bedrooms, bed_type,
				longitude, latitude, hostId, rentalRules, size, accessing_info, minimum_nights,
				price_per_additional_guest);
	}

	public List<String> getDistinctCountries() {
		List<String> countries = new ArrayList<>();
		String query = "SELECT DISTINCT TRIM(SUBSTRING_INDEX(street, ',', -1)) AS country FROM listings";
		try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(query)) {
			while (rs.next()) {
				countries.add(rs.getString("country"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			// Handle the exception as needed
		}
		return countries;
	}

	public List<String> getDistinctCities() {
		List<String> cities = new ArrayList<>();
		String query = "SELECT DISTINCT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(street, ',', -3), ',', 1)) AS city FROM listings";
		try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(query)) {
			while (rs.next()) {
				cities.add(rs.getString("city"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			// Handle the exception as needed
		}
		return cities;
	}

	public List<String> getDistinctStreets() {
		List<String> streets = new ArrayList<>();
		String query = "SELECT DISTINCT TRIM(SUBSTRING_INDEX(street, ',', 1)) AS street FROM listings";
		try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(query)) {
			while (rs.next()) {
				streets.add(rs.getString("street"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			// Handle the exception as needed
		}
		return streets;
	}

	@Override
	public List<Card> getListingsByUserId(String userId) {
		List<Card> listings = new ArrayList<>();

		try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
				PreparedStatement stmt = conn.prepareStatement("SELECT * FROM listings WHERE hosts_id = ?")) {
			stmt.setString(1, userId);
			try (ResultSet rs = stmt.executeQuery()) {
				while (rs.next()) {
					Card card = mapResultSetToCard(rs);
					listings.add(card);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			// Handle the exception as needed
		}

		return listings;
	}

}
