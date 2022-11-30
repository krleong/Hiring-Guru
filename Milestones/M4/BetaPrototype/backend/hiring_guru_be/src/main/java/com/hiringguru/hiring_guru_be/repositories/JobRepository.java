package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.models.JobType;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface JobRepository extends CrudRepository<Job, Integer> {
    @Query(
            value = "select j.* " +
                    "from (job j join role r on j.role_id=r.id) join company c on r.company_id=c.id ",
            nativeQuery = true
    )
    List<Job> queryJob();


    @Transactional
    @Modifying()
    @Query(
            value = " Delete from job j where j.id =:jobid " ,
            nativeQuery=true
    ) void deleteJob(int jobid);

    public List<Job> findByRole(Role role);



    @Query(
            value = "select j.* " +
                    "from (job j join role r on j.role_id=r.id) join company c on r.company_id=c.id " +
                    "where (  LOWER(j.title) LIKE CONCAT('%', :keyword, '%') and LOWER(j.type) LIKE CONCAT('%', :jobtype, '%') OR "+
                    " LOWER(j.description) LIKE CONCAT('%', :keyword, '%') AND LOWER(j.type) LIKE CONCAT('%', :jobtype, '%') OR " +
                    "LOWER(j.location) LIKE CONCAT('%', :keyword, '%') AND LOWER(j.type) LIKE CONCAT('%', :jobtype, '%') OR " +
                    "LOWER(c.title) LIKE CONCAT('%', :keyword, '%') AND LOWER(j.type) LIKE CONCAT('%', :jobtype, '%')) ",
            nativeQuery = true
    )
    List<Job> searchJob(String jobtype,  String keyword);
}