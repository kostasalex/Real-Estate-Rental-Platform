package com.example.demo.dao;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.demo.model.User;

public interface UserInterface {

    List<User> selectAllUsers();

    Optional<User> selectUserByUserId(String userId);

    Optional<User> selectUserByEmail(String userEmail);

    int updateUser(User user);

    int deleteUserByUserId(String userId);

    int insertUser(String userId, User user);

    public Map<String, Object> authenticateUser(String email, String password);
}
