package com.example.demo.controller;

import com.example.demo.dao.MessageInterface;
import com.example.demo.dao.UserInterface;
import com.example.demo.model.Message;
import com.example.demo.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://localhost:8443", maxAge = 3600)
public class MessageController {

    private final MessageInterface messageDao;
    private final UserInterface userDao;

    public MessageController(MessageInterface messageDao, UserInterface userDao) {
        this.messageDao = messageDao;
        this.userDao = userDao;
    }

    @PostMapping("/messages")
    public ResponseEntity<String> postMessage(@RequestBody Message message) {
        int rowsAffected = messageDao.insertMessage(message);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("Message posted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to post message");
        }
    }

    @GetMapping("/messages/user/{userId}")
    public ResponseEntity<List<Message>> getUserMessages(@PathVariable("userId") int userId) {
        List<Message> userMessages = messageDao.getUserMessages(userId);
        return ResponseEntity.ok(userMessages);
    }

    @GetMapping("/messages/users/{loggedInUserId}")
    public ResponseEntity<List<Map<String, Object>>> getUsers(@PathVariable("loggedInUserId") int loggedInUserId) {
        List<Map<String, Object>> distinctUsers = userDao.getDistinctUsers(loggedInUserId);
        return ResponseEntity.ok(distinctUsers);
    }

    @DeleteMapping("/messages/{messageId}")
    public ResponseEntity<String> deleteMessage(@PathVariable("messageId") int messageId) {
        int rowsAffected = messageDao.deleteMessage(messageId);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("Message deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete message");
        }
    }

}
