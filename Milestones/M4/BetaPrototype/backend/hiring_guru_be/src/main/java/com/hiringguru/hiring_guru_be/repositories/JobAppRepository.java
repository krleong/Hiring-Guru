package com.hiringguru.hiring_guru_be.repositories;
import com.hiringguru.hiring_guru_be.models.JobApplication;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobAppRepository extends JpaRepository<JobApplication, Integer> {
    @Query(
            value = "select * from JobApplication",
            nativeQuery = true
    )
    List<JobApplication> queryJobApplication();

}
