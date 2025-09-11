package com.sambit.week2mvn.mvnrestapi.controllers;

import com.sambit.week2mvn.mvnrestapi.dto.EmployeeDTO;
import com.sambit.week2mvn.mvnrestapi.entities.EmployeeEntity;
import com.sambit.week2mvn.mvnrestapi.services.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
    public ResponseEntity<EmployeeDTO>  getEmployeeById(@PathVariable(name="employeeId") Long id ){
        Optional <EmployeeDTO> employeeDTO =  employeeService.getEmployeeById(id);
//        if(employeeDTO == null) { return ResponseEntity.notFound().build(); }
//        return ResponseEntity.ok(employeeDTO);

        return  employeeDTO.map(employeeDTO1 -> ResponseEntity.ok(employeeDTO1)).
                    orElse(ResponseEntity.notFound().build());

    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees(@RequestParam(required=false , name = "inputAge") Integer age, @RequestParam(required=false) String  sortBy){

        return ResponseEntity.ok(employeeService.getAllEmployees()) ;
    }

    @PostMapping
    public EmployeeDTO createNewEmployee(@RequestBody EmployeeDTO inputEmployee){

        return employeeService.createEmployee(inputEmployee);
    }

    @PutMapping(path="/{employeeId}")
    public EmployeeDTO updateEmployeeId( @RequestBody EmployeeDTO employeeDTO, @PathVariable Long employeeId)
    {
        return employeeService.updateEmpleeById(employeeId, employeeDTO);
    }

    @DeleteMapping(path="/{employeeId}")
    public boolean deleteEmployeeId( @PathVariable Long employeeId){
       return employeeService.deleteEmployeeById(employeeId);
    }

    @PatchMapping(path="/{employeeId}")
    public EmployeeDTO updatePartialEmployeeById(@RequestBody Map<String,Object> updates, @PathVariable Long employeeId){
        return employeeService.updatePartialEmployeeByID(employeeId, updates);
    }


}
