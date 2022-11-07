package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.JobType;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends CrudRepository<Job, Integer> {
    @Query(
            value = "select j.*FROM Job j join role r on j.role_id=r.id join company c on r.company_id=c.id",
            nativeQuery = true
    )
    List<Job> queryJob(JobType jobType, String queryString);
}