package com.hiringguru.hiring_guru_be.repositories;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.JobType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@Repository
public interface JobRepository extends CrudRepository<Job, Integer> {
    @Query(value = "select j " +
            "from (job j join role r on j.role_id=r.id) join company c on r.company_id=c.id " +
            "where j.type=?1 or (j.description like %?2% or j.location like %?2% or " +
            "j.title like %?2% or c.title like %?2%)",
            nativeQuery = true
    )
    List<Job> queryJob(JobType jobType, String queryString);
}