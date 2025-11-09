package com.sambit.week2mvn.mvnrestapi.controllers;

import com.sambit.week2mvn.mvnrestapi.dto.EmployeeDTO;
import com.sambit.week2mvn.mvnrestapi.entities.EmployeeEntity;
import com.sambit.week2mvn.mvnrestapi.exceptions.ResourceNotFoundException;
import com.sambit.week2mvn.mvnrestapi.services.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

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
        //  if(employeeDTO == null) { return ResponseEntity.notFound().build(); }
        //  return ResponseEntity.ok(employeeDTO);

//        return  employeeDTO.map(employeeDTO1 -> ResponseEntity.ok(employeeDTO1)).
//                    orElse(ResponseEntity.notFound().build());

        return  employeeDTO.map(employeeDTO1 -> ResponseEntity.ok(employeeDTO1)).
                orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees(@RequestParam(required=false , name = "inputAge") Integer age, @RequestParam(required=false) String  sortBy){

        return ResponseEntity.ok(employeeService.getAllEmployees()) ;
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> createNewEmployee(@RequestBody @Valid EmployeeDTO inputEmployee){

        EmployeeDTO savedEmployee = employeeService.createEmployee(inputEmployee);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @PutMapping(path="/{employeeId}")
    public ResponseEntity<EmployeeDTO> updateEmployeeId( @RequestBody @Valid EmployeeDTO employeeDTO, @PathVariable Long employeeId)
    {
        return ResponseEntity.ok(employeeService.updateEmpleeById(employeeId, employeeDTO));
    }

    @DeleteMapping(path="/{employeeId}")
    public ResponseEntity<Boolean> deleteEmployeeId( @PathVariable Long employeeId){
       boolean goDeleted = employeeService.deleteEmployeeById(employeeId);
       if(goDeleted){
           return ResponseEntity.ok(true);
       }else{
           return ResponseEntity.notFound().build();
       }
    }

    @PatchMapping(path="/{employeeId}")
    public ResponseEntity<EmployeeDTO> updatePartialEmployeeById(@RequestBody Map<String,Object> updates, @PathVariable Long employeeId){
        EmployeeDTO employeeDTO =  employeeService.updatePartialEmployeeByID(employeeId, updates);
        if(employeeDTO == null){
            return ResponseEntity.notFound().build();
        }
        return   ResponseEntity.ok(employeeDTO);
    }


}
