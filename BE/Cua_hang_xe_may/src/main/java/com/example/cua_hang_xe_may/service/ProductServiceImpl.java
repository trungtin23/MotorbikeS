package com.example.cua_hang_xe_may.service;

import com.example.cua_hang_xe_may.dto.ProductDTO;
import com.example.cua_hang_xe_may.entities.Product;
import com.example.cua_hang_xe_may.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductDTO> findAll() {

        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setAvatar(product.getAvatar());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());
            dto.setPrice(product.getPrice());
            dto.setWeight(product.getWeight());
            dto.setSize(product.getSize());
            dto.setPetrolCapacity(product.getPetrolCapacity());
            dto.setSaddleHeight(product.getSaddleHeight());
            dto.setWheelSize(product.getWheelSize());
            dto.setBeforeFork(product.getBeforeFork());
            dto.setAfterFork(product.getAfterFork());
            dto.setMaxiumCapacity(product.getMaxiumCapacity());
            dto.setOilCapacity(product.getOilCapacity());
            dto.setFuelConsumption(product.getFuelConsumption());
            dto.setCylinderCapacity(product.getCylinderCapacity());
            dto.setMaxiumMoment(product.getMaxiumMoment());
            dto.setCompressionRatio(product.getCompressionRatio());
            dto.setEngieType(product.getEngieType());
            dto.setBrandName(product.getBrand().getName());
            dto.setMotolineName(product.getMotoline().getName());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Product findById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteById(Integer id) {
        productRepository.deleteById(id);
    }
}
