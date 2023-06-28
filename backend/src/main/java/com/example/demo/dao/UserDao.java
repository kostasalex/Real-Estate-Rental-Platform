package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.User;

public interface UserDao {
    
    List<User> selectAllUsers();
    Optional<User> selectUserByUserId(String userId);
    int updateUser(User user);
    int deleteUserByUserId(String userId);
    int insertUser(String userId,User user); 
    
}
