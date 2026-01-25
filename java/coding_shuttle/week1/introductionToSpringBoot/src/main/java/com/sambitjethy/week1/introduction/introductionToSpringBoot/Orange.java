package com.sambitjethy.week1.introduction.introductionToSpringBoot;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

// @Service
//@Repository
@Component
@Scope("prototype")
public class Orange {

    void eatOrange(){
        System.out.println("I am eating Orange");
    }

    @PostConstruct
    void callThisBeforeOrangeIsCreated(){
        System.out.println("Creating the Orange before use each time object is initiated as it has scope prototype");
    }

    @PreDestroy
    void callThisBeforeOrangeDestroy(){
        System.out.println("Destroying the Orange Bean");
    }
}
