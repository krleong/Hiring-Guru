package com.hiringguru.hiring_guru_be.services;

import com.hiringguru.hiring_guru_be.entities.JobAppCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.models.JobApplication;
import com.hiringguru.hiring_guru_be.repositories.JobAppRepository;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class JobAppService {
    @Autowired
    JobRepository jobrepo;

    @Autowired
    JobAppRepository jobapprepo;

    public JobApplication createJobApplication(int jobid, JobAppCreateUpdateRequest jobapp) {
        Job job = jobrepo.findById(jobid).get();

        JobApplication newjobapp = new JobApplication();
        newjobapp.setJob(job);
        newjobapp.setApplicantName(jobapp.name);
        newjobapp.setApplicantEmail(jobapp.email);
        newjobapp.setApplicantResume(jobapp.resume);
        newjobapp.setApplicantProfileLink(jobapp.profileLink);
        newjobapp.setSubmittedAt(jobapp.submittedAt);
        newjobapp.setCoverLetter(jobapp.coverLetter);
        newjobapp.setPhone(jobapp.phone);

        try {
            jobapprepo.save(newjobapp);
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No job found with id %d", jobid));
        }

        return newjobapp;
    }
    public JobApplication getJobApplicationById(int jobappid) {
        try {
            return jobapprepo.findById(jobappid).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No job application found with id %d", jobappid));
        }
    }

    public JobApplication updateJobApplication(int jobappid, JobAppCreateUpdateRequest jobapp) {
        JobApplication existingJobApp;
        try {
            existingJobApp = jobapprepo.findById(jobappid).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No job application found with id %d", jobappid));
        }

       if(jobapp.name !=null ) existingJobApp.setApplicantName(jobapp.name);
       if(jobapp.email !=null ) existingJobApp.setApplicantEmail(jobapp.email);
       if(jobapp.resume !=null ) existingJobApp.setApplicantResume(jobapp.resume);
       if(jobapp.profileLink !=null ) existingJobApp.setApplicantProfileLink(jobapp.profileLink);
       if(jobapp.submittedAt !=null ) existingJobApp.setSubmittedAt(jobapp.submittedAt);
       if(jobapp.coverLetter !=null ) existingJobApp.setCoverLetter(jobapp.coverLetter);
       if(jobapp.phone !=null ) existingJobApp.setPhone(jobapp.phone);


        return jobapprepo.save(existingJobApp);
    }

    public void deleteJobApplicationById(int id) {
        JobApplication existingJobApplication;
        try {
            existingJobApplication = jobapprepo.findById(id).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No job application found with id %d", id));
        }

        jobapprepo.delete(existingJobApplication);


    }

    public List<JobApplication> getAllJobApplicationsForJobId(int jobid) {
        try {
            Job j =jobrepo.findById(jobid).get();
           return jobapprepo.findByJob(j);

        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No job found with id %d", jobid));
        }
    }


    public List<JobApplication> getAllJobApplications() {
        try {
            return jobapprepo.queryJobApplication();
        } catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("Unable to get job application information"));

        }
    }
}