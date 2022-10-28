package com.hiringguru.hiring_guru_be.controller;

import com.hiringguru.hiring_guru_be.exception.ResourceNotFoundException;
import com.hiringguru.hiring_guru_be.model.Employee;
import com.hiringguru.hiring_guru_be.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;
    //Get all employees
    @GetMapping("employees")
    public List<Employee> getAllEmployees(){
        return this.employeeRepository.findAll();
    }
    //Get employee by id
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable(value="id") Integer employeeId)
        throws ResourceNotFoundException {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()->new ResourceNotFoundException("Employee not found for this id :: " + employeeId));
        return ResponseEntity.ok().body(employee);


    }
    //Save employee
    @PostMapping("employees")
    public Employee createEmployee(@RequestBody Employee employee){
        return this.employeeRepository.save(employee);
    }
    //Update employee
    @PutMapping("employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable(value = "id") Long employeeId,
                                                   @Validated @RequestBody Employee employeeDetails) throws ResourceNotFoundException {
        Employee employee = employeeRepository.findById(Math.toIntExact(employeeId))
                .orElseThrow(()->new ResourceNotFoundException("Employee not found for this id :: " + employeeId));
        employee.setName(employeeDetails.getName());
        employee.setRole(employeeDetails.getRole());
        employee.setPosition(employeeDetails.getPosition());
        return ResponseEntity.ok(this.employeeRepository.save(employee));
    }
    //Delete employee
    @DeleteMapping("employees/{id}")
    public Map<String, Boolean> deleteEmployee(@PathVariable(value = "id") Long employeeId) throws ResourceNotFoundException {
        Employee employee = employeeRepository.findById(Math.toIntExact(employeeId))
                .orElseThrow(()->new ResourceNotFoundException("Employee not found for this id :: " + employeeId));
        this.employeeRepository.delete(employee);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
