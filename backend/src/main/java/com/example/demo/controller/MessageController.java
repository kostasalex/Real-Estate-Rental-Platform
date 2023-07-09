package com.example.demo.controller;

import com.example.demo.dao.MessageDao;
import com.example.demo.model.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:8080")
public class MessageController {

    private final MessageDao messageDao;

    public MessageController(MessageDao messageDao) {
        this.messageDao = messageDao;
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
}
