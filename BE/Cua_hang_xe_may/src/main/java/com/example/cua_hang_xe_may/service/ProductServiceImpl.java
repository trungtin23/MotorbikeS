package com.example.cua_hang_xe_may.service;

import com.example.cua_hang_xe_may.dto.AccountDTO;
import com.example.cua_hang_xe_may.dto.ProductColorDTO;
import com.example.cua_hang_xe_may.dto.ProductDTO;
import com.example.cua_hang_xe_may.dto.ProductVersionDTO;
import com.example.cua_hang_xe_may.entities.*;
import com.example.cua_hang_xe_may.repositories.CartRepository;
import com.example.cua_hang_xe_may.repositories.ProductColorRepository;
import com.example.cua_hang_xe_may.repositories.ProductRepository;
import com.example.cua_hang_xe_may.repositories.ProductVersionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProductVersionRepository productVersionRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductColorRepository productColorRepository;


    @Override
    public List<ProductDTO> findAll() {
        return productRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO findById(Integer id) {
        ProductDTO productDTO = productRepository.findById(id)
                .map(this::mapToDTO)
                .orElse(null);
        if(productDTO != null) {
            List<Productversion> versions = productVersionRepository.findAllByProductId(id);
            List<ProductVersionDTO> versionDTOS = versions.stream().map(v -> {
                ProductVersionDTO productVersionDTO = new ProductVersionDTO();
                productVersionDTO.setId(v.getId());
                productVersionDTO.setVersionName(v.getVersionname());
                productVersionDTO.setPrice(v.getPrice());
                productVersionDTO.setProductID(v.getProduct().getId());

                productVersionDTO.setColors(
                        v.getColors().stream().map(c -> {
                            ProductColorDTO productColorDTO = new ProductColorDTO();
                            productColorDTO.setId(c.getId());
                            productColorDTO.setVersionID(v.getId());
                            productColorDTO.setColor(c.getColor());
                            productColorDTO.setPrice(c.getPrice());
                            productColorDTO.setPhoto(c.getPhoto());
                            productColorDTO.setQuantity(c.getQuantity());
                            productColorDTO.setValue(c.getValue());
                            return productColorDTO;
                        }).collect(Collectors.toList())
                );
                return productVersionDTO;
            }).collect(Collectors.toList());
            productDTO.setVersionColors(versionDTOS);
        }
        return productDTO;
    }

    @Override
    public void deleteById(Integer id) {
        productRepository.deleteById(id);
    }

    private ProductDTO mapToDTO(Product product) {
        ProductDTO dto = modelMapper.map(product, ProductDTO.class);
        if (product.getBrand() != null) {
            dto.setBrandName(product.getBrand().getName());
        }
        if (product.getMotoline() != null) {
            dto.setMotolineName(product.getMotoline().getName());
        }
        return dto;
    }

    @Override
    public ProductDTO save(ProductDTO dto) {
        Product product = mapToEntity(dto);
        Product saved = productRepository.save(product);
        return mapToDTO(saved);
    }
    private Product mapToEntity(ProductDTO dto) {
        return modelMapper.map(dto, Product.class);
    }

}
