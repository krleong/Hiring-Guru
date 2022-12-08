package com.hiringguru.hiring_guru_be.repositories;
import com.hiringguru.hiring_guru_be.models.JobApplication;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface JobAppRepository extends JpaRepository<JobApplication, Integer> {
    @Query(
            value = "select * from job_applications",
            nativeQuery = true
    )
    List<JobApplication> queryJobApplication();

    public List<JobApplication> findByJob(Job job);


    @Transactional
    @Modifying()
    @Query(value = "Delete from job_applications j where j.id =:jobappid ",
            nativeQuery = true
    )
    void deleteJobApplication(int jobappid);

}