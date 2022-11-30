package com.hiringguru.hiring_guru_be.controllers;

import com.hiringguru.hiring_guru_be.entities.EmployeeCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.ErrorResponse;
import com.hiringguru.hiring_guru_be.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/v1/roles/{roleId}/hiring-process")
public class HiringProcessStageController {
    @Autowired
    EmployeeService employeeService;

    @RequestMapping(
            value = "/companies/{companyId}/employees",
            method = RequestMethod.POST
    )
    public ResponseEntity<?> createHiringProcessStage(
            @PathVariable int companyId,
            @RequestBody EmployeeCreateUpdateRequest emp
    ) {
        try {
            return new ResponseEntity<>(employeeService.createEmployee(companyId, emp), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(
            value = "/stages",
            method = RequestMethod.GET
    )
    public ResponseEntity<?> getAllHiringProcessStages(@PathVariable int roleId) {
        try {
            return new ResponseEntity<>(employeeService.getAllEmployeesForCompanyId(companyId), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(
            value = "/companies/{companyId}/employees/{employeeId}",
            method = RequestMethod.GET
    )
    public ResponseEntity<?> getEmployee(@PathVariable Long employeeId) {
        try {
            return new ResponseEntity<>(employeeService.getEmployeeById(employeeId), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(
            value = "/companies/{companyId}/employees/{employeeId}",
            method = RequestMethod.PATCH
    )
    public ResponseEntity<?> updateEmployee(
            @PathVariable Long companyId,
            @PathVariable Long employeeId,
            @RequestBody EmployeeCreateUpdateRequest emp
    ) {
        try {
            return new ResponseEntity<>(employeeService.updateEmployee(employeeId, emp), HttpStatus.OK);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(
            value = "/companies/{companyId}/employees/{employeeId}",
            method = RequestMethod.DELETE
    )
    public ResponseEntity<?> deleteEmployee(
            @PathVariable Long employeeId,
            @PathVariable String companyId
    ) {
        try {
            employeeService.deleteEmployeeById(employeeId);
        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
