package com.sambitjethy.week1.introduction.introductionToSpringBoot;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Component;

// @Component
public class Apple {

    void eatApple(){
        System.out.println("I am eating Apple");
    }

    @PostConstruct
    void callThisBeforeAppleisCreated(){
        System.out.println("Creating the Apple before use");
    }

    @PreDestroy
    void callThisBeforeDestroy(){
        System.out.println("Destroying the Apple Bean");
    }
}
