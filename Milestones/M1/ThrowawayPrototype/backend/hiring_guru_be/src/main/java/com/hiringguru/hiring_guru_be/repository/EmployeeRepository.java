package com.hiringguru.hiring_guru_be.repository;

import com.hiringguru.hiring_guru_be.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
