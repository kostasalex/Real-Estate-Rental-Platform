package com.example.demo.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.github.cdimascio.dotenv.Dotenv;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.math.BigInteger;

@RestController
@CrossOrigin(origins = "https://localhost:8443")
public class CloudinaryController {

    private final String apiSecret;
    private final String apiKey;
    private final String cloudName;

    public CloudinaryController() {
        Dotenv dotenv = Dotenv.load();
        this.cloudName = dotenv.get("CLOUDNAME");
        this.apiKey = dotenv.get("CLOUDAPIKEY");
        this.apiSecret = dotenv.get("CLOUDINARYSECRET");
    }

    @GetMapping("/get-signature")
    public ResponseEntity<Map<String, Object>> getCloudinarySignature() {
        try {
            long timestamp = System.currentTimeMillis() / 1000L;
            String toSign = "timestamp=" + timestamp + apiSecret;

            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            byte[] hash = digest.digest(toSign.getBytes(StandardCharsets.UTF_8));
            String signature = new BigInteger(1, hash).toString(16);

            Map<String, Object> response = new HashMap<>();
            response.put("signature", signature);
            response.put("timestamp", timestamp);
            response.put("api_key", apiKey);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
