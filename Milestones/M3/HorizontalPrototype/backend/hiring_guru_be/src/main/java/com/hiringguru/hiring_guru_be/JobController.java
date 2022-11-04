//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.hiringguru.hiring_guru_be;

import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.JobType;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JobController {
    @Autowired
    private JobRepository jobrepo;
    @Autowired
    private CompanyRepository comprepo;
    @Autowired
    private RoleRepository rorepo;

    @PostMapping({"/jobs"})//creates a job
    @ResponseBody
    public void createJob(@RequestParam("company") String company, @RequestParam("description") String description, @RequestParam("title") String title, @RequestParam("expectations") String expectations, @RequestParam("benefits") String benefits, @RequestParam("title2") String title2, @RequestParam("location") String location, @RequestParam("description2") String description2) {
        Company comp = new Company(company, description);
        Role role = new Role(title, expectations, benefits, comp);
        Job job = new Job(title2, location, JobType.FULL_TIME, description2, role);
        this.comprepo.save(comp);
        this.rorepo.save(role);
        this.jobrepo.save(job);
    }
    @PatchMapping({"/jobs/:id"})//partially updates a job
    public void updateJobPartially(int id, @RequestParam("title") String title, @RequestParam("location") String location,@RequestParam("description")String description ){
        Job job = this.jobrepo.findById(id).get();
        job.title=title;
        job.location=location;
        job.description=description;
        this.jobrepo.save(job);
    }

    @PutMapping({"/jobs/"})//updates a job
    public void updateJob(@RequestParam("company") String company, @RequestParam("description") String description, @RequestParam("title") String title, @RequestParam("expectations") String expectations, @RequestParam("benefits") String benefits, @RequestParam("title2") String title2, @RequestParam("location") String location, @RequestParam("description2") String description2){
        Company comp = new Company(company, description);
        Role role = new Role(title, expectations, benefits, comp);
        Job job = new Job(title2, location, JobType.FULL_TIME, description2, role);
        this.comprepo.save(comp);
        this.rorepo.save(role);
        this.jobrepo.save(job);
    }

    @GetMapping({"/jobs"})//gets all jobs
    public List<Job> getJob() {
        List<Job> jobs =this.jobrepo.queryJob(JobType.FULL_TIME, "");
        return jobs;
    }

    @GetMapping({"/jobs/:id"})//gets a job that matches a certain ID
    public ResponseEntity<Job> getJobById(@RequestParam("id") int id) {
        Optional<Job> job = this.jobrepo.findById(id);
        return ResponseEntity.of(job);
    }
    @GetMapping({"/jobs/search"})//searches to see if a job with a certain ID exists
    public boolean searchJob(int id){
        boolean bool= jobrepo.existsById(id);
        return bool;

    }

    @DeleteMapping({"/jobs"})//deletes all job records
    public void deleteAllRecords(){
        jobrepo.deleteAll();
    }

    @DeleteMapping({"/jobs/:id"})//delete a job that matches a certain ID
    public String deleteJobById(@RequestParam("id") int id) {
        this.jobrepo.deleteById(id);
        return "Deleted Succesfully!";
    }
}