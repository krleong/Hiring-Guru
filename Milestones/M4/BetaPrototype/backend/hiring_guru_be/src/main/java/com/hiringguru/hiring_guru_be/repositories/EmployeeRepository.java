package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    public List<Employee> findByCompany(Company company);
}
