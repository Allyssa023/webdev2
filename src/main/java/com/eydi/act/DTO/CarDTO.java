package com.eydi.act.DTO;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CarDTO {

    private int id;

    @NotBlank(message = "Make is required.")
    private String make;

    @NotBlank(message = "Model is required.")
    private String model;

    @Min(value = 1900, message = "Year must be no earlier than 1900.")
    @Max(value = 2025, message = "Year must not exceed 2025.")
    private int year;

    @NotBlank(message = "Color is required.")
    private String color;

    @NotBlank(message = "Body type is required.")
    private String bodyType;

    @NotBlank(message = "Engine type is required.")
    private String engineType;

    @NotBlank(message = "License plate is required.")
    private String licensePlate;

    @NotBlank(message = "Transmission is required.")
    private String transmission;

    // Getters and Setters
    public int getId() { return id;}

    public void setId(int id) { this.id = id;}

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBodyType() {
        return bodyType;
    }

    public void setBodyType(String bodyType) {
        this.bodyType = bodyType;
    }

    public String getEngineType() {
        return engineType;
    }

    public void setEngineType(String engineType) {
        this.engineType = engineType;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }
}
