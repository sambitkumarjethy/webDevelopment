package com.sambit.week2mvn.mvnrestapi.controllers;

import com.sambit.week2mvn.mvnrestapi.dto.EmployeeDTO;
import com.sambit.week2mvn.mvnrestapi.entities.EmployeeEntity;
import com.sambit.week2mvn.mvnrestapi.services.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/employees")

public class EmployeeController {


    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }



    @GetMapping(path="/getMessage")
    public String getMyMessage(){
        return " Message : Hi , From Employee Controller!!";
    }
    @GetMapping(path="/{employeeId}")
    public EmployeeDTO getEmployeeById(@PathVariable(name="employeeId") Long id ){
        return employeeService.getEmployeeById(id);
    }

    @GetMapping
    public List<EmployeeDTO> getAllEmployees(@RequestParam(required=false , name = "inputAge") Integer age, @RequestParam(required=false) String  sortBy){

        return employeeService.getAllEmployees();
    }

    @PostMapping
    public EmployeeDTO createNewEmployee(@RequestBody EmployeeDTO inputEmployee){

        return employeeService.createEmployee(inputEmployee);
    }

    @PutMapping String updateEmployeeId(){
        return "Hello from Put";
    }

}
