package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HiringProcessStageRepository extends JpaRepository<HiringProcessStage, Long> {
    public List<HiringProcessStage> findByHiringProcessRoleIdOrderByIndex(int roleId);
    public Integer countByHiringProcessRoleId(int roleId);
}