package com.example.cua_hang_xe_may.service;

import com.example.cua_hang_xe_may.dto.ProductDTO;
import com.example.cua_hang_xe_may.dto.ProductVersionDTO;

import java.util.List;

public interface ProductVersionService {
    public List<ProductVersionDTO> findAll();
    public ProductVersionDTO findById(Integer id);
//    public ProductVersionDTO save(ProductDTO productDTO);
//    void deleteById(Integer id);
}
