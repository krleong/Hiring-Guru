package com.hiringguru.hiring_guru_be.repositories;

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
public interface CompanyRepository extends CrudRepository<Company, Integer> {

    @Query(
            value = " select * from Company  ",
            nativeQuery = true
    )
    List<Company> queryCompany();

    @Transactional
    @Modifying()
    @Query(value = "delete from job j" +
            " where j.role_id in ( " +
            " select r.id from role r " +
            " where r.company_id=companyid ); " +
            " delete from role r " +
            " where r.company_id =companyid; " +
            "delete from company c " +
            "where id=:companyid",
            nativeQuery = true
    )
    void deleteCompany(int companyid);

}
