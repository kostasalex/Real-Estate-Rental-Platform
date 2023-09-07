package com.example.demo.dao;

import com.example.demo.model.Message;

import java.util.List;

public interface MessageInterface {
    int insertMessage(Message message);

    List<Message> getUserMessages(int userId);

    public int deleteMessage(int messageId);

}
