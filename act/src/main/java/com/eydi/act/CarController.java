package com.eydi.act;

import com.eydi.act.Car;
import com.eydi.act.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
        Car car = new Car();
        model.addAttribute("car", car);
        return "car-form";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute Car car){
        carRepository.save(car);
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