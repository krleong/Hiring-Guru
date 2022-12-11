package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.HiringProcess;
import com.hiringguru.hiring_guru_be.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HiringProcessRepository extends JpaRepository<HiringProcess, Long> {
    public List<HiringProcess> findByRole(Role role);
    public HiringProcess getByRoleId(int roleId);
}