package com.example.demo;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Card;
import com.example.demo.service.CardService;

@RestController
@RequestMapping("/api/v1/cards")
@CrossOrigin(origins = "http://localhost:5173")
@SpringBootApplication
@ComponentScan("com.example.demo")
public class DemoApplication {

    private final CardService cardService;

    public DemoApplication(CardService cardService) {
        this.cardService = cardService;
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/")
    @ResponseBody
    public List<Card> fetchCards() {
        return cardService.getAllCards();
    }
}
