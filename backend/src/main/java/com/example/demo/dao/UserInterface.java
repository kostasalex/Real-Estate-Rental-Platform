package com.example.demo.dao;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.demo.model.User;

public interface UserInterface {

    List<User> selectAllUsers();

    Optional<User> selectUserByUserId(Integer userId);

    Optional<User> selectUserByEmail(String userEmail);

    // Returns all users having send-receive message from UserId
    List<Map<String, Object>> getDistinctUsers(int UserId);

    int updateUser(Integer userId, User user);

    int deleteUserByUserId(Integer userId);

    int insertUser(User user);

    public Map<String, Object> authenticateUser(String email, String password);

    int updateHostApplication(String userId, int hostApplication);

    int updateUserVisitedListings(Integer userId, String visitedListings);

    List<String> getUserVisitedListings(Integer userId);
}
