package com.hiringguru.hiring_guru_be.service;

import com.hiringguru.hiring_guru_be.models.Job;

import java.util.List;
import java.util.Optional;

public interface JobService {
    public List<Job> getAllJobs();
    public Optional<Job> getJobById(int jobId);
    public Job addOrUpdateJob(Job job);
    public Job deleteJob(int jobId) throws Exception;
}
