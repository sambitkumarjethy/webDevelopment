package com.sambit.week2mvn.mvnrestapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sambit.week2mvn.mvnrestapi.annotations.EmployeeRoleValidation;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {

    private  Long id;

    @NotNull(message = "Required field in Employee: name")
    @NotBlank(message = "Name of the employee cannot be blank")
    @Size(min=3 , max=12 , message = "No of charecters in name should be in range 3 to 12 ")
    private String name;

    @NotBlank(message = "Email of the employee cannot be blank")
    @Email(message = "Email should be a valid email.")
    private String email;

    @Max(value = 70, message = "Age of employee cannot be greater than 70")
    @Min(value = 18, message = "Age  of employee connot be less than 18")
    private Integer age;

    @NotNull(message = "Required field in Employee: Role")
    @NotBlank(message = "Role of the employee cannot be blank")

  //  @Pattern(regexp = "^(ADMIN|USER)$" ,message = "Role of employee can be USER or ADMIN")
    @EmployeeRoleValidation
    private String role; // ADMIN USER

    @NotNull(message = "Salary of employee should be a valid Positive number")
    @Positive(message = "Salary of Employee Should be Positive")

    @Digits(integer = 6, fraction = 2 , message = "The Salary can be in the form xxxxxx.yy")
    @DecimalMin(value = "10000.00")
    @DecimalMax(value = "999999.99")

    private  Double salary;

    @PastOrPresent(message="Dote of Joing of Employee cannot be in future")
    private LocalDate dateOfJoining  = LocalDate.now();

    @AssertTrue(message = "Employee should be Active")
    @JsonProperty("isActive")
    private Boolean isActive = true;


}
