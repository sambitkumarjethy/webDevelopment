package com.thinkconstructive.rest_demo.controller;

import com.thinkconstructive.rest_demo.model.CloudVendor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cloudvender")
public class CloudVendorAPIService {
    CloudVendor cloudvender;
    @GetMapping("{vendorId}")
    public CloudVendor getCloudVendorDetails(String vendorId ){
       //  return new CloudVendor( "C1","Vendor 1", "Address One","9856321470");
        return cloudvender;
    }

    @PostMapping
    public String createCloudVendorDetails(@RequestBody CloudVendor cloudvender){
        this.cloudvender = cloudvender;
        return "Cloud Vendor created ..";
    }

    @PutMapping
    public String updateCloudVendorDetails(@RequestBody CloudVendor cloudvender){
        this.cloudvender = cloudvender;
        return "Cloud Vendor Updated ..";
    }

    @DeleteMapping("{vendorId}")
    public String deleteCloudVendorDetails(String vendorId){
        this.cloudvender = null;
        return "Cloud Vendor Deleted ..";
    }



}
