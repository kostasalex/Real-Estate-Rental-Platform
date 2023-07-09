package com.example.demo.dao;

import java.sql.Connection;

import com.example.demo.model.Message;
import org.springframework.stereotype.Component;
import java.sql.Statement;
import java.sql.Timestamp;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FakeMessageDao implements MessageDao {

    private final List<Message> messages;

    public FakeMessageDao() {
        this.messages = new ArrayList<>();
    }

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/airbnbdb";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "123456789";

    @Override
    public int insertMessage(Message message) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "INSERT INTO messages (message, datetime_sent, sender_id, recipient_id) VALUES (?, ?, ?, ?)",
                        Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, message.getContent());
            stmt.setTimestamp(2, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setInt(3, message.getSenderId());
            stmt.setInt(4, message.getRecipientId());

            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected > 0) {
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        int messageId = generatedKeys.getInt(1);
                        return messageId;
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return -1; // Return -1 if the message insertion fails
    }

    @Override
    public List<Message> getUserMessages(int userId) {
        List<Message> userMessages = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("SELECT * FROM messages WHERE sender_id = ? OR recipient_id = ?")) {
            stmt.setInt(1, userId);
            stmt.setInt(2, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Message message = mapResultSetToMessage(rs);
                    userMessages.add(message);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }

        return userMessages;
    }

    private Message mapResultSetToMessage(ResultSet rs) throws SQLException {
        Message message = new Message();
        message.setId(rs.getInt("id"));
        message.setSenderId(rs.getInt("sender_id")); // Update the column name to "sender_id"
        message.setRecipientId(rs.getInt("recipient_id")); // Update the column name to "recipient_id"
        message.setContent(rs.getString("message")); // Update the column name to "message"
        message.setDatetimeSent(rs.getTimestamp("datetime_sent").toLocalDateTime()); // Update the column name to
                                                                                     // "datetime_sent"
        return message;
    }

}
