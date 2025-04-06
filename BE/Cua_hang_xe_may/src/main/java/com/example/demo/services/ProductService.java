package com.example.demo.services;

import com.example.demo.entities.Product;

public interface ProductService {
    public Iterable<Product> findAll();
}
