package com.sambit.week2mvn.mvnrestapi.repositories;

import com.sambit.week2mvn.mvnrestapi.entities.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity , Long> {
}
