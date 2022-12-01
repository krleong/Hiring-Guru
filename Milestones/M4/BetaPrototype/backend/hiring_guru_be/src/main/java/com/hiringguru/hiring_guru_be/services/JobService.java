package com.hiringguru.hiring_guru_be.services;

import com.hiringguru.hiring_guru_be.entities.JobCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.JobType;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class JobService {
    @Autowired
    CompanyRepository comprepo;

    @Autowired
    RoleRepository rorepo;

    @Autowired
    JobRepository jobrepo;


    public Job createJob(int roleid, JobCreateUpdateRequest job) {
        Role role = rorepo.findById(roleid).get();

        Job newjob = new Job();
        newjob.setRole(role);
        newjob.setTitle(job.title);
        newjob.setDescription(job.description);
        newjob.setLocation(job.location);
        newjob.setType(job.type);

        try {
            jobrepo.save(newjob);
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No role found with id %d", roleid));
        }

        return newjob;
    }

    public Job getJobById(int jobid) {
        try {
            return jobrepo.findById(jobid).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No job found with id %d", jobid));
        }
    }


    public Job updateJob(int jobid, JobCreateUpdateRequest job) {
        Job existingJob;
        try {
            existingJob = jobrepo.findById(jobid).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No job found with id %d", jobid));
        }
        if (job.title != null) existingJob.setTitle(job.title);
        if(job.description!=null) existingJob.setDescription(job.description);
        if(job.location!=null) existingJob.setLocation(job.location);


        return jobrepo.save(existingJob);

    }
    public void deleteJobById(int id) {
        Job existingJob;
        try {
            existingJob = jobrepo.findById(id).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No job found with id %d", id));
        }

        jobrepo.deleteJob(id);

    }
    public List<Job> getAllJobsForRoleId(int roleid) {
        try {
            Role r = rorepo.findById(roleid).get();
            return jobrepo.findByRole(r);
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No role found with id %d", roleid));
        }
    }
    
      public List<Job> getAllJobs() {
        try {
            return jobrepo.queryJob();
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("Unable to get job information"));

        }
    }

    public List<Job> getAllJobs() {
        try {
            return jobrepo.queryJob();
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("Unable to get job information"));

        }
    }


    public List<Job> getAllJobsThatMatch(String jobtype, String keyword){
       jobtype=jobtype.toLowerCase();
        keyword=keyword.toLowerCase();
        List<Job> jobs =this.jobrepo.searchJob(jobtype,keyword);
        return jobs;


    }




}
