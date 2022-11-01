package com.hiringguru.hiring_guru_be;

import com.hiringguru.hiring_guru_be.models.Company;
import com.hiringguru.hiring_guru_be.models.Job;
import com.hiringguru.hiring_guru_be.models.JobType;
import com.hiringguru.hiring_guru_be.models.Role;
import com.hiringguru.hiring_guru_be.repositories.CompanyRepository;
import com.hiringguru.hiring_guru_be.repositories.JobRepository;
import com.hiringguru.hiring_guru_be.repositories.RoleRepository;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class HiringGuruBeApplication {
  @Autowired
  private JobRepository jobrepo;
  @Autowired
  private CompanyRepository comprepo;
  @Autowired
  private RoleRepository rorepo;

  public HiringGuruBeApplication() {
  }

  @RequestMapping({"/"})
  public String home() {
    return "Welcome to HiringGuru";
  }

  @PostMapping({"/CreateJob"})
  @ResponseBody
  public void createJob(@RequestParam("company") String company, @RequestParam("description") String description, @RequestParam("title") String title, @RequestParam("expectations") String expectations, @RequestParam("benefits") String benefits, @RequestParam("title2") String title2, @RequestParam("location") String location, @RequestParam("description2") String description2) {
    Company comp = new Company(company, description);
    Role role = new Role(title, expectations, benefits, comp);
    Job job = new Job(title2, location, JobType.FULL_TIME, description2, role);
    this.comprepo.save(comp);
    this.rorepo.save(role);
    this.jobrepo.save(job);
  }

  @GetMapping({"/GetAllJobs"})
  public List<Job> getJob(Model model) {
    List<Job> jobs = this.jobrepo.queryJob(JobType.FULL_TIME, "");
    return jobs;
  }

  @GetMapping({"/{id}"})
  public ResponseEntity<Job> getJobById(@RequestParam("id") int id) {
    Optional<Job> job = this.jobrepo.findById(id);
    return ResponseEntity.of(job);
  }

  @DeleteMapping({"/DeleteJob"})
  public String deleteJobById(@RequestParam("id") int id) {
    this.jobrepo.deleteById(id);
    return "Deleted Succesfully!";
  }

  public static void main(String[] args) {
    SpringApplication.run(HiringGuruBeApplication.class, args);
  }
}
