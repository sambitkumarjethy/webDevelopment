package com.sambitjethy.billingSoftware.repository;

import com.sambitjethy.billingSoftware.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    // no need to define save(), findAll(), etc. — they are inherited

    Optional<CategoryEntity> findByCategoryId(String CategoryId);
}
