package com.example.cua_hang_xe_may.controller;

import com.example.cua_hang_xe_may.dto.ProductDTO;
import com.example.cua_hang_xe_may.entities.Product;
import com.example.cua_hang_xe_may.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductDTO> getAll() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getById(@PathVariable Integer id) {
        System.out.println(">>> Đang tìm sản phẩm ID = " + id);
        ProductDTO productDTO = productService.findById(id);
        return productDTO != null ? ResponseEntity.ok(productDTO) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ProductDTO create(@RequestBody ProductDTO productDTO) {
        return productService.save(productDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(@PathVariable Integer id, @RequestBody ProductDTO productDTO) {
        if (productService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        productDTO.setId(id);
        return ResponseEntity.ok(productService.save(productDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (productService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
