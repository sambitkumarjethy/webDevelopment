package com.sambit.week2mvn.mvnrestapi.annotations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

public class EmployeeRoleValidator implements ConstraintValidator<EmployeeRoleValidation, String> {
    @Override
    public boolean isValid(String inputRole, ConstraintValidatorContext constraintValidatorContext) {
       List<String> roles =List.of("USER","ADMIN");
       return roles.contains(inputRole);
    }
}
