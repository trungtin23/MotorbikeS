package com.example.cua_hang_xe_may.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String phone;
    private String name;
    private Instant dob;
    private String address;
}