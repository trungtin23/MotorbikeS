package com.example.cua_hang_xe_may.dto;

public class CreateCommentRequest {
    private Integer productId;
    private String content;
    private Integer rating;

    public CreateCommentRequest() {
    }

    public CreateCommentRequest(Integer productId, String content, Integer rating) {
        this.productId = productId;
        this.content = content;
        this.rating = rating;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
} 