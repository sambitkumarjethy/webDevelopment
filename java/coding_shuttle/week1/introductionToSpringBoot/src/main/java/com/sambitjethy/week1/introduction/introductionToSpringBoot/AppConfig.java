package com.sambitjethy.week1.introduction.introductionToSpringBoot;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
@Scope("singleton") // Default
public class AppConfig {
    @Bean
    Orange getOrange() {
        return new Orange();
    }

    @Bean
    Apple getApple(){
        return new Apple();


    }
}
