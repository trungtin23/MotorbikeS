package com.example.cua_hang_xe_may.dto;

/**
 * DTO for forgot password request
 */
public class ForgotPasswordRequest {
    private String email;

    public ForgotPasswordRequest() {
    }

    public ForgotPasswordRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}