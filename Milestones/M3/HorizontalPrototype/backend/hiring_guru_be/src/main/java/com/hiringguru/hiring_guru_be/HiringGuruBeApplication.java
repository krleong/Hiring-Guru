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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
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


  public static void main(String[] args) {
    SpringApplication.run(HiringGuruBeApplication.class, args);
  }
}
