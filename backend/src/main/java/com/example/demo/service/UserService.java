package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


import org.springframework.stereotype.Service;

import com.example.demo.dao.UserDao;
import com.example.demo.model.User;

@Service
public class UserService {

    private UserDao userDao;

    
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public Optional<User> getUser(UUID userUid) {
        return userDao.selectUserByUserUid(userUid);

    }

    public int updateUser(User user) {
        Optional<User> optinalUser = getUser(user.getUserUid());
        if (optinalUser.isPresent()) {
            userDao.updateUser(user);
            return 1;
        }
        return -1;
    }

    public int removeUser(UUID userUid) {
        Optional<User> optinalUser = getUser(userUid);
        if (optinalUser.isPresent()) {
            userDao.deleteUserByUserUid(userUid);
            return 1;
        }
        return -1;
    }

    public int insertUser(User user) {
        UUID uuid = UUID.randomUUID();
        return userDao.insertUser(uuid, user);
    }
}
