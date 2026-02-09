//package com.thinkconstructive.rest_demo.exception;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//
//@ControllerAdvice
//public class CloudVendorExceptionHandler {
//
//    @ExceptionHandler(value = {CloudVendorNotFoundException.class})
//    public ResponseEntity<Object> handleCloudVendorNotFoundException(CloudVendorNotFoundException cloudVendorNotFoundException) {
//
//        CloudVendorNotFoundException customException = new CloudVendorNotFoundException(
//                cloudVendorNotFoundException.getMessage(),
//                cloudVendorNotFoundException.getCause(),
//                HttpStatus.NOT_FOUND
//        );
//
//        return new ResponseEntity<>(customException, HttpStatus.NOT_FOUND);
//    }
//}
//

package com.thinkconstructive.rest_demo.exception;

import org.springframework.http.HttpStatus;

public class CloudVendorExceptionHandler extends RuntimeException {

    private final HttpStatus status;

    // ✅ This constructor is required for getMessage() and getCause() to work
    public CloudVendorExceptionHandler(String message, Throwable cause, HttpStatus status) {
        super(message, cause);  // ✅ DO NOT forget this line
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}

