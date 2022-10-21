package com.hiringguru.hiring_guru_be.service.impl;

import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import com.hiringguru.hiring_guru_be.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;
    @Override
    public List<Job> getAllJobs() {
        return (List<Job>) jobRepository.findAll();
    }

    @Override
    public Optional<Job> getJobById(int jobId) {
        return jobRepository.findById(jobId);
    }

    @Override
    public Job addOrUpdateJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public Job deleteJob(int jobId) throws Exception {
        Job deletedJob;
        deletedJob = jobRepository.findById(jobId).orElse(null);
        if(deletedJob == null){
            throw new Exception("user not available");
        }else{
            jobRepository.deleteById((jobId));
        }
        return deletedJob;
    }
}
