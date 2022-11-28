package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.HiringProcessStage;
import com.hiringguru.hiring_guru_be.models.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.hiringguru.hiring_guru_be.models.JobType;
import com.hiringguru.hiring_guru_be.models.Job;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HiringProcessStageRepository extends CrudRepository<HiringProcessStage, Integer> {
    @Query(
            value = " select * from HiringProcessStage  ",
            nativeQuery = true
    )


    List<HiringProcessStage> queryHiringProcessStage();
}