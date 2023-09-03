package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dao.UserInterface;
import com.example.demo.model.User;

@Service
public class UserService {

    private UserInterface userDao;

    public UserService(UserInterface userDao) {
        this.userDao = userDao;
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public Optional<User> getUser(String userId) {
        return userDao.selectUserByUserId(userId);
    }

    public int updateUser(String userId, User user) {
        return userDao.updateUser(userId, user);
    }

    public int removeUser(String userId) {
        Optional<User> optionalUser = getUser(userId);
        if (optionalUser.isPresent()) {
            userDao.deleteUserByUserId(userId);
            return 1;
        }
        return -1;
    }

    public int insertUser(User user) {
        return userDao.insertUser(user);
    }
}
