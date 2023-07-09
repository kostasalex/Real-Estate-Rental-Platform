package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dao.MessageDao;
import com.example.demo.model.Message;

import java.util.List;

@Service
public class MessageService {

    private final MessageDao messageDao;

    public MessageService(MessageDao messageDao) {
        this.messageDao = messageDao;
    }

    public int postMessage(Message message) {
        return messageDao.insertMessage(message);
    }

    public List<Message> getUserMessages(int userId) {
        return messageDao.getUserMessages(userId);
    }
}
