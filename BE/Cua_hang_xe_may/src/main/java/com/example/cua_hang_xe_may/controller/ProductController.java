package com.example.cua_hang_xe_may.controller;

import com.example.cua_hang_xe_may.dto.ProductDTO;
import com.example.cua_hang_xe_may.dto.ProductVersionDTO;
import com.example.cua_hang_xe_may.entities.Product;
import com.example.cua_hang_xe_may.service.ProductService;
import com.example.cua_hang_xe_may.service.ProductVersionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductVersionService productVersionService;

    @GetMapping
    public List<ProductDTO> getAll() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Integer id) {
        System.out.println(">>> Đang tìm sản phẩm ID = " + id);
        ProductDTO productDTO = productService.findById(id);

        if (productDTO == null) {
            return ResponseEntity.notFound().build();
        }

        List<ProductVersionDTO> versions = productVersionService.findByProductId(id);

        List<Map<String, Object>> versionColors = versions.stream().map(v -> {
            Map<String, Object> versionMap = new HashMap<>();
            versionMap.put("versionName", v.getVersionName());

            List<Map<String, Object>> colors = v.getColors().stream().map(c -> {
                Map<String, Object> colorMap = new HashMap<>();
                colorMap.put("photo", c.getPhoto());
                colorMap.put("color", c.getColor());
                colorMap.put("price", c.getPrice());
                colorMap.put("quantity", c.getQuantity());
                colorMap.put("value", c.getValue());
                colorMap.put("versionName", v.getVersionName());
                return colorMap;
            }).collect(Collectors.toList());

            versionMap.put("colors", colors);
            return versionMap;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("product", productDTO);
        response.put("versionColors", versionColors);

        return ResponseEntity.ok(response);
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
