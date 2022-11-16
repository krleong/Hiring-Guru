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
            value = "select j.* " +
                    "from (job j join role r on j.role_id=r.id) join company c on r.company_id=c.id ",
            nativeQuery = true
    )
    List<Job> queryJob();
    @Query(

            value = "select j.* " +
                    "from (job j join role r on j.role_id=r.id) join company c on r.company_id=c.id " +
                    "where (j.title LIKE CONCAT('%', :keyword, '%') or"+
                    " j.description LIKE CONCAT('%', :keyword, '%') or " +
                    "j.location LIKE CONCAT('%', :keyword, '%') or " +
                    "c.title LIKE CONCAT('%', :keyword, '%') or " +
                    "j.type LIKE CONCAT('%', :keyword, '%') )",
                  //  "where (j.description like ('%', :keyword); or j.location like ('%', :keyword); or " +
                 //  " j.title like ('%', :keyword); + '%' or c.title like ('%', :keyword);' )",
              nativeQuery = true
    )
    List<Job> searchJob( String keyword);


}