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
import com.example.demo.resource.CardResource;

import com.example.demo.service.CardService;

@RestController
@RequestMapping("/api/v1/cards")
@CrossOrigin(origins = "http://localhost:5173")
@SpringBootApplication
public class DemoApplication {

    private CardService cardService;

    
    public DemoApplication(CardService cardService) {
        this.cardService = cardService;
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    
    public CardResource cardResource(CardService cardService) {
        return new CardResource(cardService);
    }

    // @GetMapping("/")
    // @ResponseBody
    // public String fetchUsers() {
    // List<User> users = userService.getAllUsers();

    // StringBuilder sb = new StringBuilder();
    // for (User user : users) {
    // sb.append(user.toString()).append("\n");
    // }

    // return sb.toString();
    // }
    @GetMapping("/")
    @ResponseBody
    public List<Card> fetchCards() {
        return cardService.getAllCards();
    }

    
}
