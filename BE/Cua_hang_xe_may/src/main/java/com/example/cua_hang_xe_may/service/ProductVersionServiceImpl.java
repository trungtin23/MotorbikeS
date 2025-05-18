package com.example.cua_hang_xe_may.service;

import com.example.cua_hang_xe_may.dto.ProductVersionDTO;
import com.example.cua_hang_xe_may.entities.Productversion;
import com.example.cua_hang_xe_may.repositories.ProductVersionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductVersionServiceImpl implements ProductVersionService {
    @Autowired
    ProductVersionRepository productVersionRepository;

    @Autowired
    ModelMapper modelMapper;
    @Override
    public List<ProductVersionDTO> findAll() {
        return productVersionRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductVersionDTO findById(Integer id) {
        return productVersionRepository.findById(id)
                .map(this::mapToDTO)
                .orElse(null);
    }
    private ProductVersionDTO mapToDTO(Productversion entity) {
        return modelMapper.map(entity, ProductVersionDTO.class);
    }
}
