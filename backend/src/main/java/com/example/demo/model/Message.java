package com.example.demo.model;

import java.time.LocalDateTime;

public class Message {
    private int id;
    private Integer senderId;
    private Integer recipientId;
    private String content;
    private LocalDateTime datetimeSent;

    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public Integer getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(Integer recipientId) {
        this.recipientId = recipientId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDatetimeSent() {
        return datetimeSent;
    }

    public void setDatetimeSent(LocalDateTime datetimeSent) {
        this.datetimeSent = datetimeSent;
    }
}
