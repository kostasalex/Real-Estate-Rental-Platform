package com.example.demo.dao;

import java.sql.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.stereotype.Component;
import com.example.demo.model.User;

@Component
public class UserImpl implements UserInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/airbnbdb";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "123456789";

    @Override
    public List<User> selectAllUsers() {
        List<User> users = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM users");) {
            while (rs.next()) {
                User user = mapResultSetToUser(rs);
                users.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }

    @Override
    public Optional<User> selectUserByUserId(Integer userId) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");) {
            stmt.setInt(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    User user = mapResultSetToUser(rs);
                    return Optional.of(user);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    @Override
    public Optional<User> selectUserByEmail(String userEmail) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE email = ?");) {
            stmt.setString(1, userEmail);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    User user = mapResultSetToUser(rs);
                    return Optional.of(user);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    @Override
    public int updateUser(Integer userId, User user) {
        int rowsAffected = 0;

        // Fetch the current user details from the database
        Optional<User> currentUserOpt = selectUserByUserId(userId);
        if (!currentUserOpt.isPresent()) {
            return 0; // User not found
        }
        User currentUser = currentUserOpt.get();

        // Update the fields of currentUser with the values from the request, but only
        // if they are present
        if (user.getEmail() != null) {
            currentUser.setEmail(user.getEmail());
        }
        if (user.getFirstName() != null) {
            currentUser.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
            currentUser.setLastName(user.getLastName());
        }
        if (user.getPhoneNumber() != null) {
            currentUser.setPhoneNumber(user.getPhoneNumber());
        }
        if (user.getAddress() != null) {
            currentUser.setAddress(user.getAddress());
        }
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            currentUser.setPassword(user.getPassword());
        }

        currentUser.setImageUrl(user.getimage_url());

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "UPDATE users SET email = ?, first_name = ?, last_name = ?, phone_number = ?, address = ?, password = ?, image_url = ? WHERE id = ?");) {
            stmt.setString(1, currentUser.getEmail());
            stmt.setString(2, currentUser.getFirstName());
            stmt.setString(3, currentUser.getLastName());
            stmt.setString(4, currentUser.getPhoneNumber());
            stmt.setString(5, currentUser.getAddress());
            stmt.setString(6, currentUser.getPassword());
            stmt.setString(7, currentUser.getimage_url());
            stmt.setInt(8, userId);

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public int deleteUserByUserId(Integer userId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM users WHERE id = ?");) {
            stmt.setInt(1, userId);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public Map<String, Object> authenticateUser(String email, String password) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("SELECT * FROM users WHERE email = ? AND password = ?");) {
            stmt.setString(1, email);
            stmt.setString(2, password);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    int id = rs.getInt("id");
                    String firstName = rs.getString("first_name");
                    int hostApplication = rs.getInt("host_application");
                    String userType = (hostApplication == 2) ? "Host" : "Seeker";
                    int isAdmin = rs.getInt("is_admin");
                    if (isAdmin == 1)
                        userType = "Admin";
                    if (hostApplication == 1)
                        userType = "PendingHost";
                    // Create a map to hold the user information
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", id);
                    userMap.put("firstName", firstName);
                    userMap.put("userType", userType);

                    return userMap;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null; // Invalid credentials or user not found
    }

    @Override
    public int insertUser(User user) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "INSERT INTO users (email, password, address, register_date, is_admin, host_application, image_url, first_name, last_name, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        Statement.RETURN_GENERATED_KEYS);) {

            stmt.setString(1, user.getEmail());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getAddress());

            LocalDate currentDate = LocalDate.now();
            String formattedDate = currentDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            stmt.setString(4, formattedDate);
            stmt.setInt(5, 0);
            stmt.setString(6, user.getHostApplication());
            stmt.setString(7, user.getimage_url());
            stmt.setString(8, user.getFirstName());
            stmt.setString(9, user.getLastName());
            stmt.setString(10, user.getPhoneNumber());

            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected > 0) {
                ResultSet generatedKeys = stmt.getGeneratedKeys();
                if (generatedKeys.next()) {
                    return generatedKeys.getInt(1); // Return the generated user ID
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0; // Return 0 if the insertion fails
    }

    private User mapResultSetToUser(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String phoneNumber = rs.getString("phone_number");
        String lastName = rs.getString("last_name");
        String firstName = rs.getString("first_name");
        String imageUrl = rs.getString("image_url");
        String hostApplication = rs.getString("host_application");
        String isAdmin = rs.getString("is_admin");
        String registerDate = rs.getString("register_date");
        String address = rs.getString("address");
        String password = rs.getString("password");
        String email = rs.getString("email");
        java.sql.Date sqlDate = rs.getDate("host_since");
        LocalDate hostSince = (sqlDate != null) ? sqlDate.toLocalDate() : null;
        String hostAbout = rs.getString("host_about");
        String hostResponseTime = rs.getString("host_response_time");
        int hostResponseRate = rs.getInt("host_response_rate");
        int hostListingsCount = rs.getInt("host_listings_count");
        String visitedListings = rs.getString("visited_listings");

        return new User(id, email, firstName, lastName, phoneNumber, address, password,
                registerDate, isAdmin, hostApplication, imageUrl, hostSince, hostAbout, hostResponseTime,
                hostResponseRate, hostListingsCount, visitedListings);
    }

    @Override
    public int updateHostApplication(String userId, int hostApplication) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("UPDATE users SET host_application = ? WHERE id = ?");) {
            stmt.setInt(1, hostApplication);
            stmt.setString(2, userId);

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public List<Map<String, Object>> getDistinctUsers(int userId) {
        List<Map<String, Object>> users = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "SELECT DISTINCT users.id, users.first_name, users.last_name FROM users JOIN messages ON users.id = messages.sender_id OR users.id = messages.recipient_id WHERE (messages.sender_id = ? OR messages.recipient_id = ?) AND users.id <> ?")) {
            stmt.setInt(1, userId);
            stmt.setInt(2, userId);
            stmt.setInt(3, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("first_name");
                    name += " " + rs.getString("last_name");

                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", id);
                    userMap.put("name", name);

                    users.add(userMap);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return users;
    }

    @Override
    public int updateUserVisitedListings(Integer userId, String visitedListings) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "UPDATE users SET visited_listings = ? WHERE id = ?");) {

            stmt.setString(1, visitedListings);
            stmt.setInt(2, userId);

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public List<String> getUserVisitedListings(Integer userId) {
        List<String> visitedListings = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT visited_listings FROM users WHERE id = ?");) {

            stmt.setInt(1, userId);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    String visitedListingsString = rs.getString("visited_listings");
                    if (visitedListingsString != null && !visitedListingsString.trim().isEmpty()) {
                        visitedListings = Arrays.asList(visitedListingsString.split(","));
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return visitedListings;
    }

}
