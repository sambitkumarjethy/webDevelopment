package com.sambit.week2mvn.mvnrestapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {

    private  Long id;
    private String name;
    private String email;
    private Integer age;
    private LocalDate dateOfJoining  = LocalDate.now();
    @JsonProperty("isActive")
    private Boolean isActive = true;


}
