package main.java.com.hiringguru.hiring_guru_be;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

import main.java.com.hiringguru.hiring_guru_be.models.Job; //THIS IS WHAT SHOULD BE WORKING

@SpringBootApplication
@RestController
public class HiringGuruBeApplication {

  public static void main(String[] args) {
    SpringApplication.run(HiringGuruBeApplication.class, args);
  }
  @GetMapping
  public List<Job> hello(){
    return List.of(
            new Job(1L)
    );
  }
}





