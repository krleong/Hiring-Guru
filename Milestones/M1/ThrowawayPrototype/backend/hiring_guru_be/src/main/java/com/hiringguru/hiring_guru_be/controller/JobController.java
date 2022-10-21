package com.hiringguru.hiring_guru_be.controller;

import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.service.JobService;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SuppressWarnings({"ResultOfMethodCallIgnored", "CatchMayIgnoreException"})
@RestController
@RequestMapping("/jobs")
public class JobController{
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/allJobs")
    public ResponseEntity<List<Job>> getAllJobs(){
        List<Job> jobs = null;
        try{
            jobs = jobService.getAllJobs();
        }catch(Exception ex){
            ex.getMessage();
        }
        return new ResponseEntity<>(jobs, HttpStatus.OK);

    }
    @GetMapping("/getById/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable("id") int jobId){
        Job jobs = null;
        try{
            jobs = (Job) jobService.getAllJobs();
        }catch(Exception ex){
            ex.getMessage();
        }
        return new ResponseEntity<Job>(jobs, HttpStatus.OK);

    }
    @PostMapping("/addOrUpdate")
    public ResponseEntity<Job> addOrUpdate(@RequestBody Job job){
        Job jobs = null;
        try{
            jobs = (Job) jobService.addOrUpdateJob(job);
        }catch(Exception ex){
            ex.getMessage();
        }
        return new ResponseEntity<>(jobs, HttpStatus.OK);

    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Job> addOrUpdate(@PathVariable("id") int jobId){
        Job jobs = null;
        try{
            jobs = (Job) jobService.deleteJob(jobId);
        }catch(Exception ex){
            ex.getMessage();
        }
        return new ResponseEntity<>(jobs, HttpStatus.OK);

    }
}
