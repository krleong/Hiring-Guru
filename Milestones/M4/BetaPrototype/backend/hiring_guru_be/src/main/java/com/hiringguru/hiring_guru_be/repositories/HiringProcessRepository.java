package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Employee;
import com.hiringguru.hiring_guru_be.models.HiringProcess;
import com.hiringguru.hiring_guru_be.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface HiringProcessRepository extends CrudRepository<HiringProcess, Long> {
}
