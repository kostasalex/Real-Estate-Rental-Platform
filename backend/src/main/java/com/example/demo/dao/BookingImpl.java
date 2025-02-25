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
        }

        return Optional.empty();
    }

    @Override
    public Optional<Booking> getBookingByListingId(Integer id) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM bookings WHERE listings_id = ?");) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Booking booking = mapResultSetToBooking(rs);
                    return Optional.of(booking);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
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
    public int deleteBookingById(Integer id) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM bookings WHERE id = ?");) {
            stmt.setInt(1, id);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
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

    @Override
    public int deleteBookingByListingId(Integer id) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM bookings WHERE listings_id = ? ");) {
            stmt.setInt(1, id);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public List<Booking> checkAvailability(Integer listingsId, java.util.Date arrivalDate,
            java.util.Date departureDate) {
        List<Booking> overlappingBookings = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "SELECT * FROM bookings WHERE listings_id = ? " +
                                "AND ((arrival_date <= ? AND departure_date >= ?) " +
                                "OR (arrival_date <= ? AND departure_date >= ?))")) {
            stmt.setInt(1, listingsId);

            // Convert java.util.Date to java.sql.Date here
            stmt.setDate(2, new java.sql.Date(departureDate.getTime()));
            stmt.setDate(3, new java.sql.Date(arrivalDate.getTime()));
            stmt.setDate(4, new java.sql.Date(arrivalDate.getTime()));
            stmt.setDate(5, new java.sql.Date(departureDate.getTime()));

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Booking booking = mapResultSetToBooking(rs);
                    overlappingBookings.add(booking);
                }
            }

            // Check if there are overlapping bookings
            if (!overlappingBookings.isEmpty()) {
                // There are overlapping bookings
                throw new ReservationBlockedException("Reservation is blocked due to overlapping bookings.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return overlappingBookings;
    }

    public class ReservationBlockedException extends RuntimeException {
        public ReservationBlockedException(String message) {
            super(message);
        }
    }

    @Override
    public List<Booking> getBookingsByRenterId(Integer renters_id) {
        List<Booking> bookings = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("SELECT * FROM bookings WHERE renters_id = ? AND renters_id != hosts_id");) {

            stmt.setInt(1, renters_id);
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

    public List<Integer> getMostBookedListingIds(int n) {
        List<Integer> mostBookedListingIds = new ArrayList<>();

        String sql = "SELECT listings_id, COUNT(*) as booking_count " +
                "FROM bookings " +
                "GROUP BY listings_id " +
                "ORDER BY booking_count DESC " +
                "LIMIT ?";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(sql);) {

            stmt.setInt(1, n);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    mostBookedListingIds.add(rs.getInt("listings_id"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println(mostBookedListingIds);
        return mostBookedListingIds;
    }

}
