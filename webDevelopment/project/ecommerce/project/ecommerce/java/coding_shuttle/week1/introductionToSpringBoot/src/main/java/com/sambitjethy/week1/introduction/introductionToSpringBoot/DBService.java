package com.sambitjethy.week1.introduction.introductionToSpringBoot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DBService {

   // @Autowired
   final private DB db;

    public  DBService(DB db){
        // Constructor Injection
        this.db = db;
    }
    String getData(){
        return db.getData();
    }
}
