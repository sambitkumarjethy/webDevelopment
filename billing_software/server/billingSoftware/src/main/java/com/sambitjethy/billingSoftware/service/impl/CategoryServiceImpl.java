package com.sambitjethy.billingSoftware.service.impl;

import com.sambitjethy.billingSoftware.entity.CategoryEntity;
import com.sambitjethy.billingSoftware.io.CategoryRequest;
import com.sambitjethy.billingSoftware.io.CategoryResponse;
import com.sambitjethy.billingSoftware.repository.CategoryRepository;
import com.sambitjethy.billingSoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse add(CategoryRequest request) {
        CategoryEntity newCategory = convertToEntity(request);
        newCategory = categoryRepository.save(newCategory);

       return ConvertToResponse(newCategory );
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect  (Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
       CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(()-> new RuntimeException("Category Not Found: "+categoryId));
       categoryRepository.delete(existingCategory);
    }

    private CategoryResponse ConvertToResponse(CategoryEntity newCategory) {

       return CategoryResponse.builder()
               .categoryId(newCategory.getCategoryId())
               .name(newCategory.getName())
               .description(newCategory.getDescription())
               .bgColor(newCategory.getBgColor())
               .imgUrl(newCategory.getImgUrl())
               .createdAt(newCategory.getCreatedAt())
               .updatedAt(newCategory.getUpdatedAt())
               .build();
    }


    private CategoryResponse convertToResponse(CategoryEntity entity) {
        return CategoryResponse.builder()
                .categoryId(entity.getCategoryId())
                .name(entity.getName())
                .description(entity.getDescription())
                .bgColor(entity.getBgColor())
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
//        return CategoryEntity.builder()
//                .categoryId(UUID.randomUUID().toString())
//                .name(request.getName())
//                .description(request.getDescription())
//                .bgColor(request.getBgColor())
//                .build(); // added return and semicolon

        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }
}
