package com.eydi.act.models;

//public class Car {
//    private static int idCounter = 1;
//
//    private int carId;
//    private String licensePlateNumber;
//    private String make;
//    private String model;
//    private int year;
//    private String color;
//    private String bodyType;
//    private String engineType;
//    private String transmission;
//
//    public Car() {
//        this.carId = idCounter++;
//    }
//
//    // Getters and Setters
//    public int getCarId() { return carId; }
//    public void setCarId(int carId) { this.carId = carId; }
//
//    public String getLicensePlateNumber() { return licensePlateNumber; }
//    public void setLicensePlateNumber(String licensePlateNumber) { this.licensePlateNumber = licensePlateNumber; }
//
//    public String getMake() { return make; }
//    public void setMake(String make) { this.make = make; }
//
//    public String getModel() { return model; }
//    public void setModel(String model) { this.model = model; }
//
//    public int getYear() { return year; }
//    public void setYear(int year) { this.year = year; }
//
//    public String getColor() { return color; }
//    public void setColor(String color) { this.color = color; }
//
//    public String getBodyType() { return bodyType; }
//    public void setBodyType(String bodyType) { this.bodyType = bodyType; }
//
//    public String getEngineType() { return engineType; }
//    public void setEngineType(String engineType) { this.engineType = engineType; }
//
//    public String getTransmission() { return transmission; }
//    public void setTransmission(String transmission) { this.transmission = transmission; }
//}

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Car{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String make;
    private String model;
    private int year;
    private String color;
    private String bodyType;
    private String engineType;
    private String licensePlate;
    private String transmission;

    public int getId(){return id;}

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

    public void setId(int id) {
        this.id = id;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }
}