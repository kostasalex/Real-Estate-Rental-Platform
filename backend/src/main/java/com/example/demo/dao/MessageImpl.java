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

@Component
public class MessageImpl implements MessageInterface {

    private final List<Message> messages;

    public MessageImpl() {
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

        }

        return userMessages;
    }

    private Message mapResultSetToMessage(ResultSet rs) throws SQLException {
        Message message = new Message();
        message.setId(rs.getInt("id"));
        message.setSenderId(rs.getInt("sender_id"));
        message.setRecipientId(rs.getInt("recipient_id"));
        message.setContent(rs.getString("message"));
        message.setDatetimeSent(rs.getTimestamp("datetime_sent").toLocalDateTime());
        return message;
    }

    @Override
    public int deleteMessage(int messageId) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM messages WHERE id = ?")) {
            stmt.setInt(1, messageId);

            int rowsAffected = stmt.executeUpdate();
            return rowsAffected;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return 0; // Return 0 if the deletion fails
    }

    @Override
    public List<Message> getUserMessagesBySenderAndRecipient(int senderId, int recipientId) {
    List<Message> userMessages = new ArrayList<>();

    try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
            PreparedStatement stmt = conn
                    .prepareStatement("SELECT * FROM messages WHERE (sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)")) {
        stmt.setInt(1, senderId);
        stmt.setInt(2, recipientId);
        stmt.setInt(3, recipientId);
        stmt.setInt(4, senderId);

        try (ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Message message = mapResultSetToMessage(rs);
                userMessages.add(message);
            }
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }

    return userMessages;
}


}
