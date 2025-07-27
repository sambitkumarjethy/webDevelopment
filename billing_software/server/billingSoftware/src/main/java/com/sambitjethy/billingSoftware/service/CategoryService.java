package com.sambitjethy.billingSoftware.service;

import com.sambitjethy.billingSoftware.io.CategoryRequest;
import com.sambitjethy.billingSoftware.io.CategoryResponse;

public interface CategoryService {
   CategoryResponse add(CategoryRequest request);
}
