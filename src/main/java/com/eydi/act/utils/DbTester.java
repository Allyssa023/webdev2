package com.eydi.act.utils;

import com.eydi.act.models.Car;
import com.eydi.act.repositories.CarRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DbTester implements CommandLineRunner {

    private final CarRepository carRepository;

    public DbTester(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create a sample car only if database is empty
        if (carRepository.count() == 0) {
            Car car = new Car();
            car.setLicensePlate("ABC-1234");
            car.setMake("Honda");
            car.setModel("Civic");
            car.setYear(2025);
            car.setColor("Red");
            car.setBodyType("Sedan");
            car.setEngineType("Gasoline");
            car.setTransmission("Automatic");


            carRepository.save(car);
            System.out.println("Sample car saved successfully!");
        }

        // Retrieve and print all cars
        System.out.println("Cars in database:");
        carRepository.findAll().forEach(carRow -> {
            System.out.println(
                    "ID: " + carRow.getId() +
                            " | Plate: " + carRow.getLicensePlate() +
                            " | Make: " + carRow.getMake() +
                            " | Model: " + carRow.getModel() +
                            " | Year: " + carRow.getYear() +
                            " | Color: " + carRow.getColor() +
                            " | Body: " + carRow.getBodyType() +
                            " | Engine: " + carRow.getEngineType() +
                            " | Transmission: " + carRow.getTransmission()
            );
        });

        System.out.println("DB Test Completed!");
    }
}
