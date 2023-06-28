package com.example.demo;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Card;
import com.example.demo.model.User;
import com.example.demo.service.CardService;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RequestMapping("/")
@SpringBootApplication
public class DemoApplication {

    private final CardService cardService;
    private final UserService userService;

    public DemoApplication(CardService cardService, UserService userService) {
        this.cardService = cardService;
        this.userService = userService;
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/cards")
    @ResponseBody
    public List<Card> fetchCards() {
        return cardService.getAllCards();
    }

    @GetMapping("/users")
    @ResponseBody
    public List<User> fetchUsers() {
        return userService.getAllUsers();
    }
}
