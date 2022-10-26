package com.hiringguru.hiring_guru_be.repositories;
import com.hiringguru.hiring_guru_be.models.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Integer> {
}