package com.example.demo.dao;

import org.springframework.stereotype.Component;
import com.example.demo.model.Booking;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class BookingImpl implements BookingInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/airbnbdb";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "123456789";

    @Override
    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM bookings");) {
            while (rs.next()) {
                Booking booking = mapResultSetToBooking(rs);
                bookings.add(booking);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return bookings;
    }

    @Override
    public Optional<Booking> getBookingById(Integer id) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM bookings WHERE id = ?");) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Booking booking = mapResultSetToBooking(rs);
                    return Optional.of(booking);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return Optional.empty();
    }

    @Override
    public int updateBooking(Booking booking) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "UPDATE bookings SET hosts_id = ?, renters_id = ?, listings_id = ?, departure_date = ?, arrival_date = ?, trueBooking = ? WHERE id = ?");) {
            stmt.setInt(1, booking.gethosts_id());
            stmt.setInt(2, booking.getrenters_id());
            stmt.setInt(3, booking.getlistings_id());
            stmt.setDate(4, booking.getdeparture_date());
            stmt.setDate(5, booking.getarrival_date());
            stmt.setInt(6, booking.getTrueBooking());

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return rowsAffected;
    }

    @Override
    public int deleteBookingById(Integer id) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM bookings WHERE id = ?");) {
            stmt.setInt(1, id);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return rowsAffected;
    }

    @Override
    public int insertBooking(Booking booking) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "INSERT INTO bookings ( hosts_id, renters_id, listings_id, departure_date, arrival_date, trueBooking) VALUES (?, ?, ?, ?, ?, ?)");) {
            stmt.setInt(1, booking.gethosts_id());
            stmt.setInt(2, booking.getrenters_id());
            stmt.setInt(3, booking.getlistings_id());
            stmt.setDate(4, booking.getdeparture_date());
            stmt.setDate(5, booking.getarrival_date());
            stmt.setInt(6, booking.getTrueBooking());

            return stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0;
    }

    private Booking mapResultSetToBooking(ResultSet rs) throws SQLException {
        Integer id = rs.getInt("id");
        Integer hostsId = rs.getInt("hosts_id");
        Integer rentersId = rs.getInt("renters_id");
        Integer listingsId = rs.getInt("listings_id");
        Date departureDate = rs.getDate("departure_date");
        Date arrivalDate = rs.getDate("arrival_date");
        Integer trueBooking = rs.getInt("trueBooking");

        return new Booking(id, hostsId, rentersId, listingsId, departureDate, arrivalDate, trueBooking);
    }

    @Override
    public List<Booking> getBookings(Integer listingsId, Integer trueBooking) {
        List<Booking> bookings = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("SELECT * FROM bookings WHERE listings_id = ? AND trueBooking = ?");) {
            stmt.setInt(1, listingsId);
            stmt.setInt(2, trueBooking);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Booking booking = mapResultSetToBooking(rs);
                    bookings.add(booking);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return bookings;
    }

    @Override
    public int deleteBookingsByHostId(Integer hostsId, Integer trueBooking) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("DELETE FROM bookings WHERE hosts_id = ? AND trueBooking = ?");) {
            stmt.setInt(1, hostsId);
            stmt.setInt(2, trueBooking);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

}
