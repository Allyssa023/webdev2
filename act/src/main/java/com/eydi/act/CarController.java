package com.eydi.act.controller;

import com.eydi.act.Car;
import com.eydi.act.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping("/")
    public String viewCars(Model model) {
        model.addAttribute("cars", carService.getAllCars());
        return "car-list";
    }

    @GetMapping("/add")
    public String showForm(Model model) {
        model.addAttribute("car", new Car());
        return "car-form";
    }

    @PostMapping("/add")
    public String addCar(@ModelAttribute Car car) {
        carService.saveCar(car);
        return "redirect:/";
    }
}
