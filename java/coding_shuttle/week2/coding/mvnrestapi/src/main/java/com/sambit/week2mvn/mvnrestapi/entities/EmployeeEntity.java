package com.sambit.week2mvn.mvnrestapi.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name ="employees")
public class EmployeeEntity {
    @Id
    private  Long id;
    private String name;
    private String email;
    private Integer age;
    private LocalDate dateOfJoining ;
    private Boolean isActive ;
}
