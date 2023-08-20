package com.example.demo;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Card;
import com.example.demo.model.Review;
import com.example.demo.model.User;
import com.example.demo.service.CardService;
import com.example.demo.service.UserService;
import com.example.demo.service.ReviewService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600, allowCredentials = "true")
@RequestMapping("/")
@SpringBootApplication
public class Application {

    private final CardService cardService;
    private final UserService userService;
    private final ReviewService reviewService;

    public Application(CardService cardService, UserService userService, ReviewService reviewService) {
        this.cardService = cardService;
        this.userService = userService;
        this.reviewService = reviewService;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
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

    @GetMapping("/reviews")
    @ResponseBody
    public List<Review> fetchReviews() {
        return reviewService.getAllReviews();
    }

    @PostMapping("/cards")
    public Card createCard(@RequestBody Card card) {
        int result = cardService.insertCard(card);
        if (result == 1) {
            return card;
        } else {
            // Handle the error case, such as throwing an exception or returning an
            // appropriate response
            return null;
        }
    }
}
