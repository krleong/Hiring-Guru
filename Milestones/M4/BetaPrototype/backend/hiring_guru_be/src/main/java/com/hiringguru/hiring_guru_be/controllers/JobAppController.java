package com.hiringguru.hiring_guru_be.controllers;

import com.hiringguru.hiring_guru_be.entities.EmployeeCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.ErrorResponse;
import com.hiringguru.hiring_guru_be.models.Employee;
import com.hiringguru.hiring_guru_be.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1")
public class JobAppController {
    @Autowired
    JobAppService JobAppService;

    @RequestMapping(
            value = "/roles/{roleid}/jobs",
            method = RequestMethod.POST
    )
    public ResponseEntity<?> createJobApp(
            @PathVariable int jobId,
            @RequestBody EmployeeCreateUpdateRequest emp
    ) {
        try {
            return new ResponseEntity<>(jobService.createJobApp(jobId, emp), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(
            value = "/roles/{roleid}/jobs",
            method = RequestMethod.GET
    )
    public ResponseEntity<?> getAllJobApp(@PathVariable int jobId) {
        try {
            return new ResponseEntity<>(employeeService.getAllJobAppForCompanyId(jobId), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(
            value = "/roles/{roleid}/jobs",
            method = RequestMethod.PATCH
    )
    public ResponseEntity<?> updateJobApp(
            @PathVariable Long jobId,
            @RequestBody JobAppCreateUpdateRequest emp
    ) {
        try {
            return new ResponseEntity<>(employeeService.updateJobApp(jobId, emp), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(
            value = "/roles/{roleid}/jobs",
            method = RequestMethod.DELETE
    )
    public ResponseEntity<?> deleteEmployee(
            @PathVariable Long employeeId,
            @PathVariable String companyId
    ) {
        try {
            employeeService.deleteJobApp(jobId);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
