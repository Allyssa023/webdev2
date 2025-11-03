package com.exam.proj;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Product save(ProductDTO productDTO) {
        Product newProduct = new Product();
        newProduct.setName(productDTO.name());
        newProduct.setDescription(productDTO.description());
        newProduct.setStock(productDTO.stock());
        newProduct.setUnit(productDTO.unit());
        newProduct.setPrice(productDTO.price());
        return repository.save(newProduct);
    }

    public Product updateProduct(Product existingProduct, ProductDTO productDTO) {
        existingProduct.setName(productDTO.name());
        existingProduct.setDescription(productDTO.description());
        existingProduct.setStock(productDTO.stock());
        existingProduct.setUnit(productDTO.unit());
        existingProduct.setPrice(productDTO.price());
        return repository.save(existingProduct);
    }

    public void deleteProduct(int id) {
        repository.deleteById(id);
    }
}
