package com.exam.proj;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;

public record ProductDTO(
        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Description is required")
        String description,

        @Min(value = 1, message = "Stock must be at least 1")
        int stock,

        @NotBlank(message = "Unit is required")
        String unit,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "1.0", message = "Price must be at least 1")
        BigDecimal price
) {
}
