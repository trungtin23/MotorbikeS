package com.example.cua_hang_xe_may.dto;

import java.time.Instant;

public class UpdateProfileRequest {
    private String name;
    private String phone;
    private String address;
    private Instant dob;

    public UpdateProfileRequest() {
    }

    public UpdateProfileRequest(String name, String phone, String address, Instant dob) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Instant getDob() {
        return dob;
    }

    public void setDob(Instant dob) {
        this.dob = dob;
    }
} 