package com.hiringguru.hiring_guru_be.controllers;
import com.hiringguru.hiring_guru_be.entities.JobAppCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.entities.ErrorResponse;
import com.hiringguru.hiring_guru_be.models.JobApplication;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import com.hiringguru.hiring_guru_be.repositories.JobAppRepository;
import com.hiringguru.hiring_guru_be.services.JobAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
public class JobAppController {
    @Autowired
    JobAppService jobAppService;


    @RequestMapping(value = "/jobs/{jobid}/jobapps", method = RequestMethod.POST)
    public ResponseEntity<?> createJobApplication(@PathVariable int jobid, @RequestBody JobAppCreateUpdateRequest jobapp) {
        try {
            return new ResponseEntity<>(jobAppService.createJobApplication(jobid, jobapp), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }



    @RequestMapping(value = "/jobs/{jobid}/jobapps/{jobappid}", method = RequestMethod.GET)
    public ResponseEntity<?> getJobApplication(@PathVariable int jobappid) {
        try {
            return new ResponseEntity<>(jobAppService.getJobApplicationById(jobappid), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(value = "/jobs/{jobid}/jobapps", method = RequestMethod.GET)
    public ResponseEntity<?> getAlljobApplicationsForJobId(@PathVariable int jobid) {
        try {
            return new ResponseEntity<>(jobAppService.getAllJobApplicationsForJobId(jobid), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/jobs/jobapps", method = RequestMethod.GET)
    public ResponseEntity<?> getAllJobApplications() {
        try {
            return new ResponseEntity<>(jobAppService.getAllJobApplications(), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/jobs/{jobid}/jobapps/{jobappid}", method = RequestMethod.PATCH)
    public ResponseEntity<?> updateJobApp(@PathVariable int jobid, @PathVariable int jobappid, @RequestBody JobAppCreateUpdateRequest jobapp) {
        try {
            return new ResponseEntity<>(jobAppService.updateJobApplication(jobappid, jobapp), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/jobs/{jobid}/jobapps/{jobappid}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteJobApplication(@PathVariable int jobappid) {
        try {
            jobAppService.deleteJobApplicationById(jobappid);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }















}