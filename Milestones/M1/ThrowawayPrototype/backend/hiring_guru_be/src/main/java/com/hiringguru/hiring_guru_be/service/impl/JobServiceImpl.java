//package com.hiringguru.hiring_guru_be.service.impl;
//
//import com.hiringguru.hiring_guru_be.repository.JobRepository;
//import com.hiringguru.hiring_guru_be.service.JobService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class JobServiceImpl implements JobService {
//    @Autowired
//    private JobRepository jobRepository;
//    @Override
//    public List<Position> getAllJobs() {
//        return (List<Position>) jobRepository.findAll();
//    }
//
//    @Override
//    public Optional<Position> getJobById(int jobId) {
//        return jobRepository.findById(jobId);
//    }
//
//    @Override
//    public Position addOrUpdateJob(Position job) {
//        return jobRepository.save(job);
//    }
//
//    @Override
//    public Position deleteJob(int jobId) throws Exception {
//        Position deletedJob;
//        deletedJob = jobRepository.findById(jobId).orElse(null);
//        if(deletedJob == null){
//            throw new Exception("user not available");
//        }else{
//            jobRepository.deleteById((jobId));
//        }
//        return deletedJob;
//    }
//}
