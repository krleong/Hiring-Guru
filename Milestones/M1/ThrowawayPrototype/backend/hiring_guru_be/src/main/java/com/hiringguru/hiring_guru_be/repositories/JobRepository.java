package com.hiringguru.hiring_guru_be.repositories;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import com.hiringguru.hiring_guru_be.models.Job;

@Repository
public interface JobRepository extends CrudRepository<Job, Integer> {
}