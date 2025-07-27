package com.sambitjethy.billingSoftware.controller;

import com.sambitjethy.billingSoftware.io.CategoryRequest;
import com.sambitjethy.billingSoftware.io.CategoryResponse;
import com.sambitjethy.billingSoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")

@RequiredArgsConstructor
public class CategoryController {

private final CategoryService categoryService;
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public CategoryResponse addCategory(@RequestBody CategoryRequest request){
    return categoryService.add(request);
}

}
