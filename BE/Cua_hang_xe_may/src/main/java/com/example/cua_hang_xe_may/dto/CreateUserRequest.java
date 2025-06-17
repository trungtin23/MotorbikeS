package com.example.cua_hang_xe_may.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String username;
    private String password;
    private String email;
    private String phone;
    private String name;
    private String address;
    private String role;
    private String status;
} 