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
import org.springframework.web.bind.annotation.PathVariable;
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

    @PostMapping({"/roles/{roleid}/jobs"})//creates a job
    @ResponseBody
    public void createJob(@PathVariable int roleid, @RequestParam("title") String title, @RequestParam("location") String location, @RequestParam("description") String description, @RequestParam("jobtype") JobType jobtype) {
        Role role = this.rorepo.findById(roleid).get();
        Job job = new Job(title, location,jobtype, description, role);
        this.jobrepo.save(job);
    }
    @PutMapping({"/roles/{roleid}/jobs/{jobid}"})// updates an existing job
    public void updateJob(@PathVariable int jobid, @RequestParam("title") String title, @RequestParam("location") String location,@RequestParam("description")String description, @RequestParam("jobtype") JobType jobtype ){
        Job job = this.jobrepo.findById(jobid).get();
        job.title=title;
        job.location=location;
        job.type=jobtype;
        job.description=description;
        this.jobrepo.save(job);

    }


    @GetMapping({"/roles/jobs"})//gets all jobs
    public List<Job> getJob() {
        List<Job> jobs =this.jobrepo.queryJob();
        return jobs;
    }

    @GetMapping({"/roles/{roleid}/jobs/{jobid}"})//gets a job that matches a certain ID
    public ResponseEntity<Job> getJobById(@PathVariable int jobid) {
        Optional<Job> jobs = this.jobrepo.findById(jobid);
        return ResponseEntity.of(jobs);
    }

   @GetMapping({"/roles/jobs/search"})
   public List<Job> searchforJobKeyword(@RequestParam String jobtype,@RequestParam String keyword){
        keyword=keyword.toLowerCase();
      jobtype=jobtype.toLowerCase();
       List<Job> jobs =this.jobrepo.searchJob(jobtype, keyword);
       return jobs;
   }

    @DeleteMapping({"/roles/{roleid}/jobs/{jobid}"})//delete a job that matches a certain ID
    public String deleteJobById(@PathVariable int jobid) {
       jobrepo.deleteJob(jobid);
       return "Deleted Succesfully";
    }
}