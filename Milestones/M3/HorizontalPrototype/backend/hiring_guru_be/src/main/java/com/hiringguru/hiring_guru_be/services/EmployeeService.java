package com.hiringguru.hiring_guru_be.services;

import com.hiringguru.hiring_guru_be.entities.EmployeeCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Employee;
import com.hiringguru.hiring_guru_be.models.User;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.EmployeeRepository;
import com.hiringguru.hiring_guru_be.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    UserRepository userRepository;

    public Employee createEmployee(int companyId, EmployeeCreateUpdateRequest empReq) {
        User newUser = new User(empReq.name, empReq.email);
        userRepository.save(newUser);

        Employee newEmp = new Employee();
        newEmp.setUser(newUser);
        newEmp.setDesignation(empReq.designation);
        newEmp.setRoles(empReq.roles);
        try {
            newEmp.setCompany(companyRepository.findById(companyId).get());
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Company found with id %d", companyId));
        }

        return employeeRepository.save(newEmp);
    }

    public Employee getEmployeeById(Long id) {
        try {
            return employeeRepository.findById(id).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Employee found with id %d", id));
        }
    }

    public Employee updateEmployee(Long empId, EmployeeCreateUpdateRequest empReq) {
        Employee existingEmployee;
        try {
            existingEmployee = employeeRepository.findById(empId).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Employee found with id %d", empId));
        }

        // only name, email, designation, roles are editable
        if(empReq.designation!=null) existingEmployee.setDesignation(empReq.designation);
        if(empReq.roles!=null) existingEmployee.setRoles(empReq.roles);
        User u = existingEmployee.getUser();
        if(empReq.name !=null) u.setName(empReq.name);
        if(empReq.email!=null) u.setEmail(empReq.email);

        userRepository.save(u);
        return employeeRepository.save(existingEmployee);
    }

    public void deleteEmployeeById(Long id) {
        Employee existingEmployee;
        try {
            existingEmployee = employeeRepository.findById(id).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Employee found with id %d", id));
        }

        User existingUser = existingEmployee.getUser();

        employeeRepository.delete(existingEmployee);
        userRepository.delete(existingUser);
    }

    public List<Employee> getAllEmployeesForCompanyId(Integer companyId) {
        try {
            Company c = companyRepository.findById(companyId).get();
            return employeeRepository.findByCompany(c);
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Company found with id %d", companyId));
        }
    }
}