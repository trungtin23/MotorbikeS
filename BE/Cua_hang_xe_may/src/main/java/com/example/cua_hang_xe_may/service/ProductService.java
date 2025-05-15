package com.example.cua_hang_xe_may.service;

import com.example.cua_hang_xe_may.dto.ProductDTO;
import com.example.cua_hang_xe_may.entities.Product;

import java.util.List;

public interface ProductService {
    List<ProductDTO> findAll();
    Product findById(Integer id);
    Product save(Product product);
    void deleteById(Integer id);
}
