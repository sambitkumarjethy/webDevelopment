package com.thinkconstructive.rest_demo.exception;

import org.springframework.http.HttpStatus;

public class cloudVendorExpection {
    private final String message;
    private final Throwable throwble;
    private final HttpStatus httpStatus;


    public cloudVendorExpection(String message, Throwable throwble, HttpStatus httpStatus) {
        this.message = message;
        this.throwble = throwble;
        this.httpStatus = httpStatus;
    }


    public Throwable getThrowble() {
        return throwble;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getMessage() {
        return message;
    }



}
