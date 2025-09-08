package com.eydi.act.controllers;

import com.eydi.act.DTO.CarDTO;
import com.eydi.act.models.Car;
import com.eydi.act.repositories.CarRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


import java.util.List;
import java.util.Optional;


@Controller
public class CarController {

    CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @GetMapping("/")
    public String index(Model model){
        List<Car> cars = carRepository.findAll();
        model.addAttribute("cars",carRepository.findAll());
        cars.forEach(car -> {
            System.out.println(car.getMake());
        });
        return "car-list";
    }

    @GetMapping("/create")
    public String create(Model model) {
        CarDTO car = new CarDTO();
        model.addAttribute("car", car);
        return "car-form";
    }

    @PostMapping("/save")
    public String save(
            @ModelAttribute("car") @Valid CarDTO car, BindingResult result, Model model){

        if(result.hasErrors()){
            model.addAttribute("car",car);
            return "car-form";
    }
        Car newCar = new Car();
        newCar.setMake(car.getMake());
        newCar.setModel(car.getModel());
        newCar.setYear(car.getYear());
        newCar.setColor(car.getColor());
        newCar.setBodyType(car.getBodyType());
        newCar.setEngineType(car.getEngineType());
        newCar.setLicensePlate(car.getLicensePlate());
        newCar.setTransmission(car.getTransmission());

        carRepository.save(newCar);

        return "redirect:/";

    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable("id") int id, Model model) {
        Optional<Car> carOpt = carRepository.findById(id);
        if(carOpt.isPresent()){
            model.addAttribute("car", carOpt.get());
            return "edit"; // Thymeleaf template for editing car
        } else {
            return "redirect:/"; // or display error page
        }
    }

    @PostMapping("/update/{id}")
    public String update(@PathVariable("id") int id, @ModelAttribute Car car) {
        car.setId(id); // make sure ID is set
        carRepository.save(car);
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String deleteCar(@PathVariable int id) {
        carRepository.deleteById(id);
        return "redirect:/";
    }
}