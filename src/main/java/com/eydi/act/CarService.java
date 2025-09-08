//package com.eydi.act.service;
//
//import com.eydi.act.model.Car;
//import org.springframework.stereotype.Service;
//
//import java.io.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class CarService {
//    private static final String CSV_FILE = "cars.csv";
//
//    public List<Car> getAllCars() {
//        List<Car> cars = new ArrayList<>();
//        File file = new File(CSV_FILE);
//
//        if (!file.exists()) return cars;
//
//        try (BufferedReader br = new BufferedReader(new FileReader(CSV_FILE))) {
//            String line;
//            while ((line = br.readLine()) != null) {
//                String[] values = line.split(",");
//                Car car = new Car();
//                car.setCarId(Integer.parseInt(values[0]));
//                car.setLicensePlateNumber(values[1]);
//                car.setMake(values[2]);
//                car.setModel(values[3]);
//                car.setYear(Integer.parseInt(values[4]));
//                car.setColor(values[5]);
//                car.setBodyType(values[6]);
//                car.setEngineType(values[7]);
//                car.setTransmission(values[8]);
//                cars.add(car);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        return cars;
//    }
//
//    public void saveCar(Car car) {
//        List<Car> cars = getAllCars();
//
//        // Find the max existing ID
//        int maxId = cars.stream()
//                .mapToInt(Car::getCarId)
//                .max()
//                .orElse(0);
//
//        // Assign next ID
//        car.setCarId(maxId + 1);
//
//        try (PrintWriter out = new PrintWriter(new FileWriter(CSV_FILE, true))) {
//            out.printf("%d,%s,%s,%s,%d,%s,%s,%s,%s%n",
//                    car.getCarId(),
//                    car.getLicensePlateNumber(),
//                    car.getMake(),
//                    car.getModel(),
//                    car.getYear(),
//                    car.getColor(),
//                    car.getBodyType(),
//                    car.getEngineType(),
//                    car.getTransmission()
//            );
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//}
//
