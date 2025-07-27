package com.sambitjethy.billingSoftware.io;


import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
@Builder
@Data
public class CategoryRequest {
    private String name;
    private String description;
    private String bgColor;
}
