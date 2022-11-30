package com.hiringguru.hiring_guru_be.controllers;
import org.springframework.data.jpa.repository.Query;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.JobType;
import com.hiringguru.hiring_guru_be.models.JobApplication;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import com.hiringguru.hiring_guru_be.repositories.JobAppRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import org.springframework.web.bind.annotation.RequestMapping;

public class JobAppController {
    @Autowired
    private JobAppRepository jobapprepo;
    @Autowired
    private JobRepository jobrepo;


    @PostMapping({"/jobapps/{jobid}/jobapps"})//creates a job
    @ResponseBody
    public void createJobApplication(@PathVariable int jobid, @RequestParam("name") String name, @RequestParam("email") String email, @RequestParam("resume") String resume, @RequestParam("profilelink") String profilelink, @RequestParam("coverletter") String coverLetter, @RequestParam("phone") int phone, @RequestParam("submittedAt") String submittedAt, @RequestParam("job") Job job) {
        JobApplication jobapp = new JobApplication(name, email, resume, profilelink,coverLetter, submittedAt, phone, job);
        this.jobapprepo.save(jobapp);
    }


    @GetMapping({"/jobs/jobapps"})//gets all jobs
    public List<JobApplication> getJobApplication() {
        List<JobApplication> jobs =this.jobapprepo.queryJobApplication();
        return jobs;
    }

    @GetMapping({"/jobs/{jobid}/jobapp"})//gets a job that matches a certain ID
    public ResponseEntity<JobApplication> getJobAppById(@PathVariable int jobid) {
        Optional<JobApplication> jobapp = this.jobapprepo.findById(jobid-1);
        return ResponseEntity.of(jobapp);
    }
    @GetMapping({"/jobs/jobapp/search"})//searches to see if a job with a certain ID exists
    public String searchJob(int jobid){
        boolean bool= jobrepo.existsById(jobid-1);
        if(bool)
            return "Found a role with a matching id!";

        return "Unable to find a role with requested id!";

    }

    @DeleteMapping({"/job/{jobid}/jobapp"})//delete a job that matches a certain ID
    public String deleteJobAppById(@PathVariable int jobid) {
        Job job = this.jobrepo.findById(jobid-1).get();
        this.jobrepo.save(job);
        this.jobrepo.deleteById(jobid-1);
        return "Deleted Succesfully!";
    }
}
