package com.sambit.week2mvn.mvnrestapi.controllers;

import com.sambit.week2mvn.mvnrestapi.dto.EmployeeDTO;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/employees")
public class EmployeeController {
    @GetMapping(path="/getMessage")
    public String getMyMessage(){
        return " Message : Hi , From Employee Controller!!";
    }
    @GetMapping(path="/{employeeId}")
    public EmployeeDTO getEmployeeById( @PathVariable(name="employeeId") Long id ){
        return new EmployeeDTO( id , "Sambit", "sambit@gmail.com", 30, LocalDate.of(2025, 8 , 31), true);

    }

    @GetMapping
    public String getAllEmployees(@RequestParam(required=false , name = "inputAge") Integer age, @RequestParam(required=false) String  sortBy){
        return "Hi age - "+age  + " sort By - " + sortBy;
    }

    @PostMapping
    public EmployeeDTO createNewEmployee(@RequestBody EmployeeDTO inputEmployee){
       long randomId = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;
       inputEmployee.setId(randomId);
        return inputEmployee;
    }

    @PutMapping String updateEmployeeId(){
        return "Hello from Put";
    }

}
