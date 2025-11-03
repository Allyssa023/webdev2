package com.exam.proj;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET all products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.findAll();
    }

    // POST create new product
    @PostMapping("/products")
    public Product newProduct(@Valid @RequestBody ProductDTO productDTO) {
        return productService.save(productDTO);
    }

    // PUT update product
    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable int id, @Valid @RequestBody ProductDTO productDTO) {
        Product existingProduct = productService.findById(id);
        if (existingProduct == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product with ID " + id + " not found.");
        }
        return productService.updateProduct(existingProduct, productDTO);
    }

    // DELETE product
    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable int id) {
        if (productService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product with ID " + id + " not found.");
        }
        productService.deleteProduct(id);
    }
}
