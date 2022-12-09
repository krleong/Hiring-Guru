package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
public interface HiringProcessStageRepository extends JpaRepository<HiringProcessStage, Long> {
    public List<HiringProcessStage> findByHiringProcess(HiringProcess hiringProcess);
    @Query(
            value = " select * from HiringProcessStage  ",
            nativeQuery = true
    )
    List<HiringProcessStage> queryHiringProcessStages();
    @Transactional
    @Modifying()
    @Query(value = "Delete from hiringProcess h where h.hiring_process_id=:hpId ; " +
            " Delete from hiringProcessStage hs  where hs.id=:hpsId ",
            nativeQuery = true
    )
    void deleteHiringProcessStage(Long hpsId);
}
