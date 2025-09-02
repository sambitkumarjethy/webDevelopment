package com.sambit.week2mvn.mvnrestapi.controllers;

import com.sambit.week2mvn.mvnrestapi.dto.EmployeeDTO;
import com.sambit.week2mvn.mvnrestapi.entities.EmployeeEntity;
import com.sambit.week2mvn.mvnrestapi.repositories.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/employees")

public class EmployeeController {
    private final EmployeeRepository employeeRepository;

    public EmployeeController( EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }


    @GetMapping(path="/getMessage")
    public String getMyMessage(){
        return " Message : Hi , From Employee Controller!!";
    }
    @GetMapping(path="/{employeeId}")
    public EmployeeEntity getEmployeeById(@PathVariable(name="employeeId") Long id ){
       // return new EmployeeDTO( id , "Sambit", "sambit@gmail.com", 30, LocalDate.of(2025, 8 , 31), true);
        return employeeRepository.findById(id).orElse(null);
    }

    @GetMapping
    public List<EmployeeEntity> getAllEmployees(@RequestParam(required=false , name = "inputAge") Integer age, @RequestParam(required=false) String  sortBy){
     //   return "Hi age - "+age  + " sort By - " + sortBy;

        return employeeRepository.findAll();
    }

    @PostMapping
    public EmployeeEntity createNewEmployee(@RequestBody EmployeeEntity inputEmployee){
//       long randomId = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;
//       inputEmployee.setId(randomId);
//        return inputEmployee;

        return employeeRepository.save(inputEmployee);
    }

    @PutMapping String updateEmployeeId(){
        return "Hello from Put";
    }

}
