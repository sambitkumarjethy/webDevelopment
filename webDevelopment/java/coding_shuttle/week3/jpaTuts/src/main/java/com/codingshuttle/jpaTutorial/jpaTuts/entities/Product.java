package com.codingshuttle.jpaTutorial.jpaTuts.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="products",
        uniqueConstraints = {
            @UniqueConstraint(name= "sku_unique", columnNames = {"sku"}),
                @UniqueConstraint(name= "title_price_unique", columnNames = {"product_title","price"})
        },
        indexes = {
            @Index(name="sku_index",columnList = "sku")
        }

)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String sku;

    @Column(name="product_title")
    private String title;

    private BigDecimal price;
    private Integer quantity;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


}
