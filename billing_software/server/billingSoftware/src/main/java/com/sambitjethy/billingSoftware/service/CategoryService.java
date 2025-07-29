package com.sambitjethy.billingSoftware.service;

import com.sambitjethy.billingSoftware.io.CategoryRequest;
import com.sambitjethy.billingSoftware.io.CategoryResponse;

import java.util.List;

public interface CategoryService {
   CategoryResponse add(CategoryRequest request);
    List<CategoryResponse>read();
    void delete (String CategoryId );
}
