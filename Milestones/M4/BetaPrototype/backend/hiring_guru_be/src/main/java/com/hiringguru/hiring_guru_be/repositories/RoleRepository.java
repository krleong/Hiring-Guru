package com.hiringguru.hiring_guru_be.repositories;

import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.models.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.hiringguru.hiring_guru_be.models.JobType;
import com.hiringguru.hiring_guru_be.models.Job;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
    @Query(
            value = " select * from Role  ",
            nativeQuery = true
    )
    List<Role> queryRoles();

    public List<Role> findByCompany(Company company);

    @Transactional
    @Modifying()
    @Query(value = "Delete from job j where j.role_id=:roleid ; " +
            " Delete from role r  where r.id=:roleid ",
            nativeQuery = true
    )
    void deleteRole(int roleid);
}
