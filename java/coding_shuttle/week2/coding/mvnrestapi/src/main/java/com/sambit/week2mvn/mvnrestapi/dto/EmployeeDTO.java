package com.sambit.week2mvn.mvnrestapi.dto;

import java.time.LocalDate;

public class EmployeeDTO {

    private  Long id;
    private String name;
    private String email;
    private Integer age;
    private LocalDate dateOfJoining  = LocalDate.now();
    private Boolean isActive = true;

    //DEFAULT CONSTRUCTOR
    public EmployeeDTO(){

    }

    // ALL ARGUMENT CONSTRUCTOR
    public EmployeeDTO(Long id, String name, String email, Integer age, LocalDate dateOfJoining, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.dateOfJoining = dateOfJoining;
        this.isActive = isActive;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Integer getAge() {
        return age;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public Boolean getActive() {
        return isActive;
    }
}
