package com.hiringguru.hiring_guru_be.services;

import com.hiringguru.hiring_guru_be.entities.EmployeeCreateUpdateRequest;
import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Employee;
import com.hiringguru.hiring_guru_be.models.User;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.EmployeeRepository;
import com.hiringguru.hiring_guru_be.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class JobAppService {
    @Autowired
    EmployeeRepository jobRepository;

    public JobApp createJobApp(int jobId, JobAppCreateUpdateRequest empReq) {
        JobApp newApp = new JobApp(empReq.name, empReq.email, empReq.resume, empReq.phone);
        jobAppRepository.save(newApp);

        JobApp newEmp = new JobApp();
        newEmp.setName(empReq.name);
        newEmp.setEmail(empReq.email);
        newEmp.setResume(empReq.resume);
        newEmp.setPhone(empReq.phone);
        try {
            newEmp.setJobApp(JobAppRepository.findById(jobId).get());
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Job Application found with id %d", jobId));
        }

        return JobAppRepository.save(newEmp);
    }

    public JobApp updateEmployee(JobAppCreateUpdateRequest empReq) {
        JobApp existingEmployee;
        try {
            existingJobApp = JobAppRepository.findById(jobId).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Job Application found with id %d", jobId));
        }

        // only name, email, designation, roles are editable
        if(empReq.resume!=null) existingJobApp.setResume(empReq.resume);
        if(empReq.phone!=null) existingJobApp.setPhone(empReq.phone);
        if(empReq.name !=null) u.setName(empReq.name);
        if(empReq.email!=null) u.setEmail(empReq.email);

        JobAppRepository.save(u);
        return JobAppRepository.save(existingJobApp);
    }

    public void deleteJobAppById(Integer id) {
        JobApp existingJobApp;
         try {
            existingJobApp = JobAppRepository.findById(jobId).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Job Application found with id %d", jobId));
        }

        JobApp existingJobApp = existingJobApp.getJobApp();
        JobAppRepository.delete(existingJobApp);
    }

    public List<JobApp> getAllJobAppForJobId(Integer jobId) {
         JobApp existingJobApp;
         try {
            existingJobApp = JobAppRepository.findById(jobId).get();
        }
        catch (NoSuchElementException e) {
            throw new EntityNotFoundException(String.format("No Job Application found with id %d", jobId));
        }
    }
}
