package com.eydi.act.controllers;

import com.eydi.act.DTO.CarDTO;
import com.eydi.act.exception.ResourceNotFoundException;
import com.eydi.act.models.Car;
import com.eydi.act.repositories.CarRepository;
import com.eydi.act.service.CarService;
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
public class CarRestController {

    private final CarService carService;
    private final CarRepository carRepository;

    public CarRestController(CarService carService, CarRepository carRepository) {
        this.carService = carService;
        this.carRepository = carRepository;
    }

    @GetMapping("/cars")
    public List<Car> findAll() {
        return carService.findAll();
    }

    @GetMapping("/cars/{id}")
    public Car findById(@PathVariable int id) {
        Car car = carService.findById(id);
        if (car == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car with ID " + id + " not found.");
        }
        return car;
    }

    @PostMapping("/cars")
    public Car createCar(@Valid @RequestBody CarDTO car) {
        return carService.save(car);
    }

    @PutMapping("/cars/{id}")
    public Car updateCar(@PathVariable int id, @Valid @RequestBody CarDTO car){
        Car updateCar = carService.findById(id);
        if (updateCar == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car with ID "+ id + " not found.");
        }
        return carService.updateCar(id, car);
    }

    @DeleteMapping("/cars/{id}")
    public void deleteCar(@PathVariable int id){
        if(carService.findById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car with ID "+ id + " not found.");
        }
        carService.deleteCar(id);
    }
}