package com.example.demo.resource;

import com.example.demo.model.Message;
import com.example.demo.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/messages/resource")
@CrossOrigin(origins = "http://localhost:8080")
public class MessageResource {

    private final MessageService messageService;

    public MessageResource(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<String> postMessage(@RequestBody Message message) {
        int rowsAffected = messageService.postMessage(message);

        if (rowsAffected > 0) {
            return ResponseEntity.ok("Message posted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to post message");
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getUserMessages(@PathVariable("userId") int userId) {
        List<Message> userMessages = messageService.getUserMessages(userId);
        return ResponseEntity.ok(userMessages);
    }
}
