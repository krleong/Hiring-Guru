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

}
