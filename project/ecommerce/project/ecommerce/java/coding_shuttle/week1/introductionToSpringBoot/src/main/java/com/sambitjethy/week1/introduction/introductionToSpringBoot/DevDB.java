package com.sambitjethy.week1.introduction.introductionToSpringBoot;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name ="deploy.env", havingValue = "development")
public class DevDB implements  DB {

    public String getData(){
        return "Dev Data";
    }
}
