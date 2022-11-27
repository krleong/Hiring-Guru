package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobAppRepository extends CRUDRepository<JobApp, Integer> {
    @Query(
            value = "select * from JobApp",
            nativeQuery = true
    )
    List<JobApp> queryJobApp();

}
