package main.java.com.hiringguru.hiring_guru_be.repositories;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import main.java.com.hiringguru.hiring_guru_be.entities.Job;

@Repository
public interface JobRepository extends CrudRepository<Job, Integer> {
}