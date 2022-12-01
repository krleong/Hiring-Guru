package com.hiringguru.hiring_guru_be;

import com.hiringguru.hiring_guru_be.entities.JobCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.ErrorResponse;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.models.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityNotFoundException;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import java.util.List;
import com.hiringguru.hiring_guru_be.services.JobService;
import java.util.NoSuchElementException;

@RestController
public class JobController {
    @Autowired
    JobService jobService;




    @RequestMapping(value = "/roles/{roleid}/jobs", method = RequestMethod.POST)
    public ResponseEntity<?> createJob(@PathVariable int roleid, @RequestBody JobCreateUpdateRequest job) {
        try {
            return new ResponseEntity<>(jobService.createJob(roleid, job), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(value = "/roles/{roleid}/jobs/{jobid}", method = RequestMethod.GET)
    public ResponseEntity<?> getJob(@PathVariable int jobid) {
        try {
            return new ResponseEntity<>(jobService.getJobById(jobid), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/roles/{roleid}/jobs", method = RequestMethod.GET)
    public ResponseEntity<?> getAllJobs(@PathVariable int roleid) {
        try {
            return new ResponseEntity<>(jobService.getAllJobsForRoleId(roleid), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getAllJobs() {
        try {
            return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/roles/{roleid}/jobs/{jobid}", method = RequestMethod.PATCH)
    public ResponseEntity<?> updateJob(@PathVariable int roleid, @PathVariable int jobid, @RequestBody JobCreateUpdateRequest job) {
        try {
            return new ResponseEntity<>(jobService.updateJob(jobid, job), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/roles/{roleid}/jobs/{jobid}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteJob(@PathVariable int jobid) {
        try {
            jobService.deleteJobById(jobid);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @RequestMapping(value = "/roles/jobs/search",method=RequestMethod.GET)
    public ResponseEntity<?>  searchForJobsThatMatch(@RequestParam String type, @RequestParam String keyword){
        try{

        }
        catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }


    }

}
